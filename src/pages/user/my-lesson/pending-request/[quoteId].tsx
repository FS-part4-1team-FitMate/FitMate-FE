import { ParsedUrlQuery } from "querystring";
import { GetServerSideProps } from "next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getLessonInfo } from "@/lib/api/lessonService";
import { acceptQuote, getQuote } from "@/lib/api/quoteService";
import { getTrainerInfo } from "@/lib/api/trainerService";
import formatPrice from "@/lib/utils/formatPrice";
import { Lesson } from "@/types/lesson";
import { Quote } from "@/types/quote";
import FindTrainerCard from "@/components/Cards/FindTrainerCard";
import Button from "@/components/Common/Button";
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

  const {
    data: lesson,
    isLoading: isLessonLoading,
    isError: isLessonError,
  } = useQuery<Lesson>(["lesson-info", quoteInfo?.lessonRequestId], () =>
    getLessonInfo(quoteInfo?.lessonRequestId as string),
  );

  const quoteAccept = useMutation({
    mutationFn: (quoteId: string) => acceptQuote(quoteId),
    onSuccess: () => {
      alert("견적이 확정되었습니다.");
    },
    onError: (err) => {
      console.error("견적 확정 실패", err);
      alert("견적 확정에 실패하였습니다.");
    },
  });

  const handleAccept = () => {
    if (quoteInfo && quoteInfo.id) {
      quoteAccept.mutate(quoteInfo.id);
    }
  };

  if (isQuoteLoading || isTrainerLoading || isLessonLoading) {
    return <Loading />;
  }

  if (isQuoteError || !quoteInfo) {
    return <div>견적 정보를 불러오는 데 실패했습니다.</div>;
  }

  if (isTrainerError || !trainer) {
    return <div>트레이너 정보를 불러오는 데 실패했습니다.</div>;
  }

  if (isLessonError || !lesson) {
    return <div>레슨 정보를 불러오는 데 실패했습니다.</div>;
  }

  const trainerInfo = trainer?.profile ?? {};

  return (
    <div className="flex flex-col gap-[1.6rem] pc:gap-[2.4rem]">
      <Title title="견적 상세" />
      <div className="flex flex-col w-full m-auto px-8 pc:flex-row pc:max-w-[140rem]">
        <div className="flex flex-col gap-[2.4rem] w-full pc:max-w-[95.5rem] pc:pr-[10rem] pc:gap-16">
          <FindTrainerCard profile={trainerInfo} request={lesson?.isDirectQuote} />
          <div className="flex flex-col gap-4 pc:hidden">
            <HorizontalLine width="100%" />
            <ShareSNS label="견적서 공유하기" trainerInfo={trainerInfo} />
          </div>
          <HorizontalLine width="100%" />
          <div className="flex flex-col gap-[1.6rem] pc:gap-[3.2rem]">
            <p className="text-lg font-semibold pc:text-2xl">견적가</p>
            <p className="text-xl font-bold pc:text-3xl">{formatPrice(quoteInfo?.price)}원</p>
          </div>
          <HorizontalLine width="100%" />
          <div className="flex flex-col gap-16">
            <QuoteInfo lessonRequestId={quoteInfo?.lessonRequestId} />
          </div>
        </div>
        <div className="flex flex-col gap-16">
          <div className="flex flex-row gap-[0.8rem] p-4">
            <Button
              onClick={handleAccept}
              className={
                "h-[6.4rem] p-4 rounded-[1.6rem] font-semibold w-full text-gray-50 bg-blue-300 pc:text-xl pc:w-[32.8rem]"
              }
            >
              견적 확정하기
            </Button>
          </div>
          <div className="hidden pc:flex pc:flex-col pc:gap-16">
            <HorizontalLine width="100%" />
            <ShareSNS label="견적서 공유하기" trainerInfo={trainerInfo} />
          </div>
        </div>
      </div>
    </div>
  );
}
