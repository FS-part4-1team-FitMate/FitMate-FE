import clsx from "clsx";
import { LessonType, Region } from "@/types/types";
import FindTrainerCard from "@/components/Cards/FindTrainerCard";
import ChipLessonType from "@/components/Chip/ChipLessonType";
import ChipRegion from "@/components/Chip/ChipRegion";
import Button from "@/components/Common/Button";
import Favorite from "@/components/Common/Card/TrainerInfo/Favorite";
import { HorizontalLine } from "@/components/Common/Line";
import ShareSNS from "@/components/Common/ShareSNS";

const container = clsx(
  "relative flex flex-col justify-between gap-16 m-auto mt-[2.4rem] px-8",
  "pc:flex-row pc:gap-0 pc:mt-[5.6rem] pc:max-w-[144rem]",
  "tablet:max-w-[74.4rem] mobile:max-w-[37.5rem]",
);
const buttons = "flex flex-row gap-[0.8rem] w-full p-4 pc:flex-col pc:gap-[3.2rem] pc:px-0";
const button = "h-[5.4rem] p-4 rounded-[1.6rem] font-semibold pc:w-[35.3rem] pc:text-xl";

export default function DetailTrainer() {
  return (
    <div className={container}>
      <div className={"flex flex-col gap-[2.4rem] w-full pc:gap-16 pc:pr-[10rem]"}>
        <FindTrainerCard item="" />
        <div className="flex flex-col gap-4 pc:hidden">
          <HorizontalLine width="100%" />
          <ShareSNS label="나만 알기엔 아쉬운 강사님인가요?" />
        </div>
        <HorizontalLine width="100%" />
        <div className="flex flex-col gap-4 pc:gap-[3.2rem]">
          <h1 className="text-black-400 text-lg font-bold pc:text-2xl">상세설명</h1>
          <p className="text-black-400 text-md font-normal pc:text-2lg">description</p>
        </div>
        <HorizontalLine width="100%" />
        <div className="flex flex-col gap-4 pc:gap-[3.2rem]">
          <h1 className="text-black-400 text-lg font-bold pc:text-2xl">제공 서비스</h1>
          <p className="text-black-400 text-md font-normal pc:text-2lg">
            <ChipLessonType lessonType={LessonType.SPORTS} size="lg" />
          </p>
        </div>
        <HorizontalLine width="100%" />
        <div className="flex flex-col gap-4 pc:gap-[3.2rem]">
          <h1 className="text-black-400 text-lg font-bold pc:text-2xl">서비스 가능 지역</h1>
          <p className="text-black-400 text-md font-normal pc:text-2lg">
            <ChipRegion region={Region.DAEGU} size="lg" />
          </p>
        </div>
        <HorizontalLine width="100%" />
        <div className="text-black-400 text-lg font-bold pc:text-2xl">평점 및 리뷰 들어갈 부분</div>
      </div>
      <div className="flex flex-col gap-[2.4rem] pc:gap-16">
        <div className="flex flex-col gap-4 pc:gap-[3.2rem]">
          <h1 className="hidden text-xl font-semibold pc:block">
            김코드 강사님에게 지정 견적을 요청해보세요
          </h1>
          <div className={buttons}>
            <Button className={`${button} hidden gap-4 border border-line-200 bg-gray-50 pc:flex`}>
              <Favorite /> 강사님 찜하기
            </Button>
            <div className="flex justify-center items-center w-[5.4rem] h-[5.4rem] p-4 border border-line-200 rounded-[1.6rem] pc:hidden">
              <Favorite />
            </div>
            <Button className={`${button} w-full text-gray-50 bg-blue-300`}>
              지정 견적 요청하기
            </Button>
          </div>
        </div>
        <div className="hidden flex-col gap-16 pc:flex">
          <HorizontalLine width="100%" />
          <ShareSNS label="나만 알기엔 아쉬운 강사님인가요?" />
        </div>
      </div>
    </div>
  );
}
