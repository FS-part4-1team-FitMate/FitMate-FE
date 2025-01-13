import FindTrainerCard from "@/components/Cards/FindTrainerCard";
import Button from "@/components/Common/Button";
import Favorite from "@/components/Common/Card/TrainerInfo/Favorite";
import { HorizontalLine } from "@/components/Common/Line";
import QuoteInfo from "@/components/Common/QuoteInfo";
import ShareSNS from "@/components/Common/ShareSNS";
import Title from "@/components/Common/Title";

const button = "h-[6.4rem] p-4 rounded-[1.6rem] font-semibold pc:text-xl";

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
        <div className="flex flex-col gap-16">
          <div className="flex flex-row gap-[0.8rem] p-4">
            <Button className={`${button} w-[6.4rem] border border-line-200 bg-gray-50 pc:hidden`}>
              <Favorite />
            </Button>
            <Button className={`${button} w-full text-gray-50 bg-blue-300 pc:w-[32.8rem]`}>
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
