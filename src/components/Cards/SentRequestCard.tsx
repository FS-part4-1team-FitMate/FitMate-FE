import clsx from "clsx";
import CardContainer from "../Common/Card/CardContainer";
import LessonInfo from "../Common/Card/LessonInfo";
import QuotePrice from "../Common/Card/QuotePrice";
import { HorizontalLine } from "../Common/Line";

/**
 *
 * @TODO replace any
 */

export default function SentRequestCard({ item }: { item: any }) {
  return (
    <CardContainer width="95.5rem" gap="1.6rem">
      <div className="flex justify-between">
        <p className="text-xl font-semibold">칩 넣을 자리</p>
        <p className="text-gray-500 text-xs font-normal">1시간 전</p>
      </div>
      <div className="flex flex-col gap-[1.8rem] py-[1.6rem] px-[1.8rem]">
        <p className="text-xl font-semibold">{item.name} 고객님</p>
        <HorizontalLine width="100%" />
        <LessonInfo startDate="" endDate="" locationType="" />
      </div>
      <QuotePrice price={180000} />
    </CardContainer>
  );
}