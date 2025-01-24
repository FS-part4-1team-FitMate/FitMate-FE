import { ic_info_md } from "@/imageExports";
import { ParsedUrlQuery } from "querystring";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getQuote } from "@/lib/api/quoteService";
import { getTrainerInfo } from "@/lib/api/trainerService";
import formatPrice from "@/lib/utils/formatPrice";
import { Quote } from "@/types/quote";
import FindTrainerCard from "@/components/Cards/FindTrainerCard";
import { HorizontalLine } from "@/components/Common/Line";
import Loading from "@/components/Common/Loading";
import QuoteInfo from "@/components/Common/QuoteInfo";
import ShareSNS from "@/components/Common/ShareSNS";
import Title from "@/components/Common/Title";

interface Params extends ParsedUrlQuery {
  quoteId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { quoteId } = context.params as Params;

  if (!quoteId) {
    return {
      props: {
        quoteId: null,
      },
    };
  }

  return {
    props: {
      quoteId,
    },
  };
};

export default function DetailPendingRequest({ quoteId }: { quoteId: string | null }) {
  const {
    data: quoteInfo,
    isLoading: isQuoteLoading,
    isError: isQuoteError,
  } = useQuery<Quote>(["quote-detail", quoteId], () => getQuote(quoteId as string), {
    enabled: !!quoteId,
  });

  const {
    data: trainer,
    isLoading: isTrainerLoading,
    isError: isTrainerError,
  } = useQuery(
    ["trainer-detail", quoteInfo?.trainerId],
    () => getTrainerInfo(quoteInfo?.trainerId as string),
    {
      enabled: !!quoteInfo?.trainerId,
    },
  );

  if (isQuoteLoading || isTrainerLoading) {
    return <Loading />;
  }

  if (isQuoteError || !quoteInfo) {
    return <div>견적 정보를 불러오는 데 실패했습니다.</div>;
  }

  if (isTrainerError || !trainer) {
    return <div>트레이너 정보를 불러오는 데 실패했습니다.</div>;
  }

  const trainerInfo = trainer?.profile ?? {};

  return (
    <div className="flex flex-col gap-[1.6rem] pc:gap-[2.4rem]">
      <Title title="견적 상세" />
      <div className="flex flex-col w-full m-auto px-8 pc:flex-row pc:max-w-[140rem]">
        <div className="flex flex-col gap-[2.4rem] w-full pc:max-w-[95.5rem] pc:pr-[10rem] pc:gap-16">
          <FindTrainerCard profile={trainerInfo} status={quoteInfo.status} />
          <div className="flex flex-col gap-4 pc:hidden">
            <HorizontalLine width="100%" />
            <ShareSNS label="견적서 공유하기" />
          </div>
          <HorizontalLine width="100%" />
          <div className="flex flex-col gap-[1.6rem] pc:gap-[3.2rem]">
            <p className="text-lg font-semibold pc:text-2xl">견적가</p>
            <p className="text-xl font-bold pc:text-3xl">{formatPrice(quoteInfo?.price)}원</p>
          </div>
          <HorizontalLine width="100%" />
          <div className="flex flex-col gap-16">
            <QuoteInfo lessonRequestId={quoteInfo?.lessonRequestId} />
            {quoteInfo.status !== "ACCEPTED" && (
              <div className="flex items-center gap-[1.6rem] py-[2.4rem] px-[3.2rem] border border-blue-200 rounded-[1.2rem] bg-blue-100">
                <Image src={ic_info_md} width={24} height={24} alt="느낌표" />
                <p className="text-blue-300 text-lg font-regular">확정하지 않은 견적이에요!</p>
              </div>
            )}
          </div>
        </div>
        <div className="hidden pc:flex flex-col gap-16">
          <ShareSNS label="견적서 공유하기" />
        </div>
      </div>
    </div>
  );
}
