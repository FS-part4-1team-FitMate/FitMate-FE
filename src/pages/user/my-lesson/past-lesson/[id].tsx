import { GetServerSideProps } from "next";
import { getQuote } from "@/lib/api/quoteService";
import formatPrice from "@/lib/utils/formatPrice";
import { Quote } from "@/types/quote";
import FindTrainerCard from "@/components/Cards/FindTrainerCard";
import { HorizontalLine } from "@/components/Common/Line";
import QuoteInfo from "@/components/Common/QuoteInfo";
import ShareSNS from "@/components/Common/ShareSNS";
import Title from "@/components/Common/Title";

const data = {
  id: "87691494-80e4-475c-8bda-a87d6a7bf001",
  trainerId: "699fc386-d1a7-4430-a37d-9d1c5bdafd3f",
  lessonRequestId: "6c3e95d6-0786-4cfb-9501-354ab8d527f1",
  price: 200000,
  message: "견적 요청드립니다. 긍정적인 검토 부탁드립니다.",
  status: "COMPLETE",
  rejectionReason: null,
  createdAt: "2025-01-14T02:20:19.471Z",
  updatedAt: "2025-01-14T02:20:19.471Z",
};

interface Props {
  quoteInfo: Quote;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    /**
     * @TODO 임시 id 지정
     */
    const quoteId = "1";
    const quoteInfo = await getQuote(quoteId);

    if (!quoteInfo) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        quoteInfo,
      },
    };
  } catch (err) {
    console.error("Error fetching quote:", err);
    return {
      props: {
        quoteInfo: null,
      },
    };
  }
};

export default function DetailPastLesson({ quoteInfo }: Props) {
  return (
    <div className="flex flex-col gap-[1.6rem] pc:gap-[2.4rem]">
      <Title title="견적 상세" />
      <div className="flex flex-col w-full m-auto px-8 pc:flex-row pc:max-w-[140rem]">
        <div className="flex flex-col gap-[2.4rem] w-full pc:max-w-[95.5rem] pc:pr-[10rem] pc:gap-16">
          <FindTrainerCard quoteData={data} trainerId={data.trainerId} />
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
        <div className="hidden pc:flex">
          <ShareSNS label="견적서 공유하기" />
        </div>
      </div>
    </div>
  );
}
