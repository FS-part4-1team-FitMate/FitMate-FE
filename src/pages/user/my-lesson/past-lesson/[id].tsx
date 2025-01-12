import FindTrainerCard from "@/components/Cards/FindTrainerCard";
import { HorizontalLine } from "@/components/Common/Line";
import QuoteInfo from "@/components/Common/QuoteInfo";
import ShareSNS from "@/components/Common/ShareSNS";
import Title from "@/components/Common/Title";

export default function DetailPendingRequest() {
  return (
    <div className="flex flex-col gap-[1.6rem] pc:gap-[2.4rem]">
      <Title title="견적 상세" />
      <div className="flex flex-col w-full m-auto px-8 pc:flex-row pc:max-w-[140rem]">
        <div className="flex flex-col gap-[2.4rem] w-full pc:max-w-[95.5rem] pc:pr-[10rem] pc:gap-16">
          <FindTrainerCard item="" />
          <div className="flex flex-col gap-4 pc:hidden">
            <HorizontalLine width="100%" />
            <ShareSNS label="견적서 공유하기" />
          </div>
          <HorizontalLine width="100%" />
          <div className="flex flex-col gap-[1.6rem] pc:gap-[3.2rem]">
            <p className="text-lg font-semibold pc:text-2xl">견적가</p>
            <p className="text-xl font-bold pc:text-3xl">180,000원</p>
          </div>
          <HorizontalLine width="100%" />
          <div className="flex flex-col gap-16">
            <QuoteInfo />
          </div>
        </div>
        <div className="hidden pc:flex">
          <ShareSNS label="견적서 공유하기" />
        </div>
      </div>
    </div>
  );
}
