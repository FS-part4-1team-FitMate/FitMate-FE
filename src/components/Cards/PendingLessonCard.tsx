import clsx from "clsx";
import CardContainer from "../Common/Card/CardContainer";
import { VerticalLine } from "../Common/Card/Line";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";

const lesson_info = "flex items-center gap-[1.6rem]";
const info_text = "text-2lg font-medium";
const quote_price = "text-2xl font-bold";
const buttons = "flex gap-[1.1rem]";
const button = clsx("flex-1", "h-[6.4rem]", "p-[1.6rem] rounded-[1.6rem]", "text-xl font-semibold");

export default function PendingLessonCard() {
  return (
    <CardContainer width="68.8rem" gap="2.4rem">
      <div className="text-2lg font-medium">칩 넣을 자리</div>
      <TrainerInfo />
      <div className={lesson_info}>
        <p className={info_text}>레슨 시작일: 2025.02.02</p>
        <VerticalLine height="1.6rem" />
        <p className={info_text}>레슨 종료일: 2025.02.15</p>
        <VerticalLine height="1.6rem" />
        <p className={info_text}>레슨 장소: 온라인</p>
      </div>
      <div className="flex justify-end items-center gap-[1.6rem]">
        <p className={info_text}>견적 금액</p>
        <p className={quote_price}>180,000원</p>
      </div>
      <div className={buttons}>
        <button className={`${button} text-gray-50 bg-blue-300`}>견적 확정하기</button>
        <button className={`${button} border border-blue-300 text-blue-300 bg-gray-50`}>
          상세보기
        </button>
      </div>
    </CardContainer>
  );
}
