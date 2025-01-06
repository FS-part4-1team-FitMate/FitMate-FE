import clsx from "clsx";
import CardContainer from "../Common/Card/CardContainer";
import { HorizontalLine, VerticalLine } from "../Common/Card/Line";

const chip_time = "flex justify-between";
const time = "text-gray-500 text-xs font-normal";
const lesson_info = "flex flex-col gap-[1.8rem] py-[1.6rem] px-[1.8rem]";
const lesson_user = "text-xl font-semibold";
const lesson_detail = "flex items-center gap-[1.6rem]";
const info_text = "text-2lg font-medium";
const quote = "flex justify-end items-center gap-[1.6rem]";
const quote_price = "text-2xl font-bold";
const buttons = "flex gap-[1.1rem]";
const button = clsx("flex-1", "h-[6.4rem]", "p-[1.6rem] rounded-[1.6rem]", "text-xl font-semibold");

export default function RequestLessonCard() {
  return (
    <CardContainer width="95.5rem" gap="1.6rem">
      <div className={chip_time}>
        <p className={lesson_user}>칩 넣을 자리</p>
        <p className={time}>1시간 전</p>
      </div>
      <div className={lesson_info}>
        <p className={lesson_user}>김고객 고객님</p>
        <HorizontalLine />
        <div className={lesson_detail}>
          <p className={info_text}>레슨 시작일: 2025.02.02</p>
          <VerticalLine height="1.6rem" />
          <p className={info_text}>레슨 종료일: 2025.02.15</p>
          <VerticalLine height="1.6rem" />
          <p className={info_text}>레슨 장소: 온라인</p>
        </div>
      </div>
      <div className={quote}>
        <p className={info_text}>견적 금액</p>
        <p className={quote_price}>180,000원</p>
      </div>
      <div className={buttons}>
        <button className={`${button} text-gray-50 bg-blue-300`}>견적 보내기</button>
        <button className={`${button} border border-blue-300 text-blue-300 bg-gray-50`}>
          반려
        </button>
      </div>
    </CardContainer>
  );
}
