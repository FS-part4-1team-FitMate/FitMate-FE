import SentRequestCard from "@/components/Cards/SentRequestCard";
import QuoteInfo from "@/components/Common/QuoteInfo";
import { HorizontalLine } from "@/components/Common/Line";
import ShareSNS from "@/components/Common/ShareSNS";

export default function Detailrequest() {
  return (
    <div className="flex justify-between max-w-[144rem] m-auto mt-[5.6rem]">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-[3.2rem]">
          <h1 className="text-2xl font-bold">견적 상세</h1>
          <SentRequestCard 
            item={item}
          />
        </div>
        <div className="flex flex-col gap-[3.2rem]">
          <h1 className="text-2xl font-bold">견적가</h1>
          <p className="text-2lg font-normal">180,000원</p>
        </div>
        <HorizontalLine width="100%" />
        <div>
            <QuoteInfo />
        </div>
      </div>
      <div className="flex flex-col gap-16">
        <ShareSNS label="견적서 공유하기" />
      </div>
    </div>
  );
}
