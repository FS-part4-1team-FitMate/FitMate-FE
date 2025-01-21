import { GetServerSideProps } from "next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/api/authService";
import { acceptQuote, getQuote } from "@/lib/api/quoteService";
import formatPrice from "@/lib/utils/formatPrice";
import { Quote } from "@/types/quote";
import { Profile } from "@/types/types";
import FindTrainerCard from "@/components/Cards/FindTrainerCard";
import Button from "@/components/Common/Button";
import Favorite from "@/components/Common/Card/TrainerInfo/Favorite";
import { HorizontalLine } from "@/components/Common/Line";
import Loading from "@/components/Common/Loading";
import QuoteInfo from "@/components/Common/QuoteInfo";
import ShareSNS from "@/components/Common/ShareSNS";
import Title from "@/components/Common/Title";

const data = {
  id: "87691494-80e4-475c-8bda-a87d6a7bf001",
  trainerId: "699fc386-d1a7-4430-a37d-9d1c5bdafd3f",
  lessonRequestId: "6c3e95d6-0786-4cfb-9501-354ab8d527f1",
  price: 200000,
  message: "견적 요청드립니다. 긍정적인 검토 부탁드립니다.",
  status: "PENDING",
  rejectionReason: null,
  createdAt: "2025-01-14T02:20:19.471Z",
  updatedAt: "2025-01-14T02:20:19.471Z",
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const quoteId = context.params;

    if (!quoteId) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        quoteId,
      },
    };
  } catch (err) {
    console.error("Error fetching quote:", err);
    return {
      props: {
        quoteId: null,
      },
    };
  }
};

export default function DetailPendingRequest({ quoteId }: { quoteId: string }) {
  const { data: quoteInfo } = useQuery(["quote-detail", quoteId], () => getQuote(quoteId));

  const trainerId = quoteInfo?.trainerId;

  const { data: trainer } = useQuery<Profile>(["trainer-detail", trainerId], () =>
    getProfile(trainerId),
  );

  const {
    mutate: accept,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: acceptQuote,
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
      accept(quoteInfo.id);
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>견정 확정에 실패하였습니다.</div>;

  return (
    <div className="flex flex-col gap-[1.6rem] pc:gap-[2.4rem]">
      <Title title="견적 상세" />
      <div className="flex flex-col w-full m-auto px-8 pc:flex-row pc:max-w-[140rem]">
        <div className="flex flex-col gap-[2.4rem] w-full pc:max-w-[95.5rem] pc:pr-[10rem] pc:gap-16">
          <FindTrainerCard profile={trainer} />
          <div className="flex flex-col gap-4 pc:hidden">
            <HorizontalLine width="100%" />
            <ShareSNS label="견적서 공유하기" />
          </div>
          <HorizontalLine width="100%" />
          <div className="flex flex-col gap-[1.6rem] pc:gap-[3.2rem]">
            <p className="text-lg font-semibold pc:text-2xl">견적가</p>
            <p className="text-xl font-bold pc:text-3xl">{formatPrice(data.price)}원</p>
          </div>
          <HorizontalLine width="100%" />
          <div className="flex flex-col gap-16">
            <QuoteInfo lessonRequestId={data.lessonRequestId} />
          </div>
        </div>
        <div className="flex flex-col gap-16">
          <div className="flex flex-row gap-[0.8rem] p-4">
            <Button
              className={
                "h-[6.4rem] p-4 rounded-[1.6rem] font-semibold w-[6.4rem] border border-line-200 bg-gray-50 pc:text-xl pc:hidden"
              }
            >
              <Favorite />
            </Button>
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
            <ShareSNS label="견적서 공유하기" />
          </div>
        </div>
      </div>
    </div>
  );
}
