import SentRequestCard from "@/components/Cards/SentRequestCard";
import QuoteInfo from "@/components/Common/QuoteInfo";
import { HorizontalLine } from "@/components/Common/Line";
import ShareSNS from "@/components/Common/ShareSNS";

const area_wrap = "flex flex-col gap-16";
const content_wrap = "flex flex-col gap-[3.2rem]";
const label = "text-2xl font-bold";
const content = "text-2lg font-normal";

export default function DetailTrainer() {
  return (
    <div className="flex justify-between max-w-[144rem] m-auto mt-[5.6rem]">
      <div className={area_wrap}>
        <div className={content_wrap}>
          <h1 className={label}>견적 상세</h1>
          <SentRequestCard 
            item={item}
          />
        </div>
        <div className={content_wrap}>
          <h1 className={label}>견적가</h1>
          <p className={content}>180,000원</p>
        </div>
        <HorizontalLine width="100%" />
        <div>
            <QuoteInfo />
        </div>
      </div>
      <div className={area_wrap}>
        <ShareSNS label="견적서 공유하기" />
      </div>
    </div>
  );
}
