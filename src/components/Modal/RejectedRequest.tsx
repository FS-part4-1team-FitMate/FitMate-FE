import clsx from "clsx";
import { LessonType, RequestType } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
import ChipRequest from "../Chip/ChipRequest";
import { VerticalLine } from "../Common/Line";

const user_card = clsx(
  "flex flex-col gap-[0.6rem] py-4 px-[1.6rem] border border-line-100 shadow-card rounded-[0.8rem]",
  "pc:gap-[1.6rem] pc:py-[2.4rem] pc:px-[1.8rem]",
);

export default function RejectedRequest() {
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
      {/* 추후 공통 컴포넌트로 교체 (input, textarea) */}
      <div className="flex flex-col gap-[1.6rem]">
        <label className="font-semibold text-lg pc:text-xl">반려 사유를 입력해 주세요</label>
        <textarea
          className="pc:w-[56rem] w-full h-[16rem] p-[1.4rem] rounded-[1.6rem] text-lg font-normal bg-bg-200 pc:text-xl focus:outline-none"
          placeholder="최소 10자 이상 입력해주세요"
        />
      </div>
    </div>
  );
}
