import clsx from "clsx";
import CardContainer from "../Common/Card/CardContainer";
import LessonInfo from "../Common/Card/LessonInfo";
import QuotePrice from "../Common/Card/QuotePrice";
import { HorizontalLine } from "../Common/Line";

const chip_time = "flex justify-between";
const time = "text-gray-500 text-xs font-normal";
const lesson_info = clsx("flex flex-col gap-[1.8rem]", "py-[1.6rem] px-[1.8rem]");
const lesson_user = "text-xl font-semibold";
const buttons = "flex gap-[1.1rem]";
const button = clsx("flex-1", "h-[6.4rem]", "p-[1.6rem] rounded-[1.6rem]", "text-xl font-semibold");

/**
 *
 * @TODO replace any
 */

export default function RequestLessonCard({ item }: { item: any }) {
  return (
    <CardContainer width="95.5rem" gap="1.6rem">
      <div className={chip_time}>
        <p className={lesson_user}>칩 넣을 자리</p>
        <p className={time}>1시간 전</p>
      </div>
      <div className={lesson_info}>
        <p className={lesson_user}>김고객 고객님</p>
        <HorizontalLine width="100%" />
        <LessonInfo startDate="" endDate="" locationType="" />
      </div>
      <QuotePrice price={180000} />
      <div className={buttons}>
        <button className={`${button} text-gray-50 bg-blue-300`}>견적 보내기</button>
        <button className={`${button} border border-blue-300 text-blue-300 bg-gray-50`}>
          반려
        </button>
      </div>
    </CardContainer>
  );
}
