import clsx from "clsx";
import { LessonType, RequestType } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
import ChipRequest from "../Chip/ChipRequest";
import { HorizontalLine, VerticalLine } from "../Common/Line";

const user_card = clsx(
  "flex flex-col gap-[0.6rem] py-4 rounded-[0.8rem]",
  "pc:gap-[1.6rem] pc:py-[2.4rem] pc:px-[1.8rem] pc:border pc:border-line-100 pc:shadow-card",
);
const input = clsx(
  "w-full p-[1.4rem] rounded-[1.6rem] text-lg font-normal bg-bg-200",
  "pc:w-[56rem] pc:text-xl focus:outline-none",
);

export default function SendQuote() {
  return (
    <div className="flex flex-col gap-8 pc:gap-[3.2rem]">
      <div className="flex flex-col gap-[1.4rem] pc:gap-[2.4rem]">
        <div className="flex gap-[1.2rem]">
          <ChipLessonType lessonType={LessonType.FITNESS} size="lg" />
          <ChipRequest requestType={RequestType.SPECIFIC} size="lg" />
        </div>
        <div className={user_card}>
          <p className="text-md font-semibold pc:text-2lg">김고객 고객님</p>
          <div className="flex flex-col gap-[0.8rem] pc:gap-[1.4rem]">
            <div className="flex items-center gap-[0.8rem] pc:gap-[1.6rem]">
              <div className="w-fit py-[0.2rem] px-[0.6rem] rounded-[0.4rem] bg-bg-400 pc:py-[0.4rem]">
                <p className="text-gray-500 text-md font-medium pc:text-2lg">레슨 장소</p>
              </div>
              <p className="text-black-300 text-md font-medium pc:text-2lg">온라인</p>
            </div>
            <div className="flex items-center gap-[1.4rem] pc:gap-[1.6rem]">
              <div className="flex items-center gap-[0.8rem] pc:gap-[1.6rem]">
                <div className="w-fit py-[0.4rem] px-[0.6rem] rounded-[0.4rem] bg-bg-400 pc:py-[0.4rem]">
                  <p className="text-gray-500 text-md font-medium pc:text-2lg">레슨 시작일</p>
                </div>
                <p className="text-black-300 text-md font-medium pc:text-2lg">2025.02.02</p>
              </div>
              <VerticalLine height="1.5rem" />
              <div className="flex items-center gap-[0.8rem] pc:gap-[1.6rem]">
                <div className="w-fit py-[0.4rem] px-[0.6rem] rounded-[0.4rem] bg-bg-400 pc:py-[0.4rem]">
                  <p className="text-gray-500 text-md font-medium pc:text-2lg">레슨 종료일</p>
                </div>
                <p className="text-black-300 text-md font-medium pc:text-2lg">2025.02.12</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HorizontalLine width="100%" />
      {/* 추후 공통 컴포넌트로 교체 (input, textarea) */}
      <div className="flex flex-col gap-[1.6rem]">
        <label className="text-lg font-semibold pc:text-xl">견적가를 입력해주세요</label>
        <input className={`${input} h-[6.4rem]`} placeholder="견적가 입력" />
      </div>
      <HorizontalLine width="100%" />
      <div className="flex flex-col gap-[1.6rem]">
        <label className="text-lg font-semibold pc:text-xl">코멘트를 입력해 주세요</label>
        <textarea className={`${input} h-[16rem]`} placeholder="최소 10자 이상 입력해주세요" />
      </div>
    </div>
  );
}
