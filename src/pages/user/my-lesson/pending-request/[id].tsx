import FindTrainerCard from "@/components/Cards/FindTrainerCard";
import { HorizontalLine } from "@/components/Common/Card/Line";
import QuoteInfo from "@/components/Common/QuoteInfo";
import ShareSNS from "@/components/Common/ShareSNS";
import Title from "@/components/Common/Title";

const area_wrap = "flex flex-col gap-16";
const content_wrap = "flex flex-col gap-[3.2rem]";

export default function DetailPendingRequest() {
  return (
    <div className="flex flex-col gap-[2.4rem]">
      <Title title="견적 상세" />
      <div className="flex justify-between max-w-[140rem] w-full m-auto">
        <div className={area_wrap}>
          <FindTrainerCard item="" />
          <HorizontalLine width="100%" />
          <div className={content_wrap}>
            <p className="text-2xl font-semibold">견적가</p>
            <p className="text-3xl font-bold">180,000원</p>
          </div>
          <HorizontalLine width="100%" />
          <div className={area_wrap}>
            <QuoteInfo />
          </div>
        </div>
        <div className={area_wrap}>
          <div className={content_wrap}>
            <button className="flex justify-center items-center w-[35.3rem] h-[5.4rem] p-[1.6rem] rounded-[1.6rem] text-gray-50 text-xl font-semibold bg-blue-300">
              견적 확정하기
            </button>
          </div>
          <HorizontalLine width="32.7rem" />
          <ShareSNS label="견적서 공유하기" />
        </div>
      </div>
    </div>
  );
}
