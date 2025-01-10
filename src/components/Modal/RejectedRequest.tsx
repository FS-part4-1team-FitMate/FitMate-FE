import clsx from "clsx";
import { VerticalLine } from "../Common/Line";

const user_card = clsx(
  "flex flex-col border border-line-100 rounded-[0.8rem]",
  "pc:gap-[1.6rem] tablet:gap-[0.6rem] mobile:gap-[0.6rem]",
  "pc:py-[2.4rem] pc:px-[1.8rem] tablet:py-4 tablet:px-[1.6rem] mobile:py-4 mobile:py-[1.6rem]",
);

export default function RejectedRequest() {
  return (
    <div className="flex flex-col pc:gap-[3.2rem] tablet:gap-8 mobile:gap-8">
      <div className="flex flex-col pc:gap-[2.4rem] tablet:gap-[1.4rem] mobile:gap-[1.4rem]">
        <div className="text-lg font-semibold">칩 넣을 자리</div>
        <div className={user_card}>
          <p className="font-semibold pc:text-2xl tablet:text-md mobile:text-md">김고객 고객님</p>
          <div className="flex flex-col pc:gap-[1.4rem] tablet:gap-[0.8rem] mobile:gap-[0.8rem]">
            <p className="font-medium pc:text-2xl tablet:text-md mobile:text-md">
              레슨 장소: 온라인
            </p>
            <div className="flex items-center pc:gap-[1.6rem] tablet:gap-[1.4rem] mobile:gap-[1.4rem]">
              <p className="font-medium pc:text-2xl tablet:text-md mobile:text-md">
                레슨 시작일: 2025.02.01
              </p>
              <VerticalLine height="1.5rem" />
              <p className="font-medium pc:text-2xl tablet:text-md mobile:text-md">
                레슨 종료일: 2025.02.10
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 추후 공통 컴포넌트로 교체 (input, textarea) */}
      <div className="flex flex-col gap-[1.6rem]">
        <label className="font-semibold pc:text-xl tablet:text-lg mobile:text-lg">
          반려 사유를 입력해 주세요
        </label>
        <textarea className="pc:max-w-[56rem] tablet:max-w-[37.5rem] mobile:max-w-[37.5rem] h-[16rem] p-[1.4rem] rounded-[1.6rem] bg-bg-200" />
      </div>
    </div>
  );
}
