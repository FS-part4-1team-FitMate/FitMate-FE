import formatPrice from "@/lib/utils/formatPrice";
import { LessonType } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
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
    <CardContainer width="100%" gap="1.6rem">
      <div className="flex justify-between">
        <ChipLessonType lessonType={item.lessonType as LessonType} size="lg" />
        <p className="text-gray-500 text-xs font-normal">1시간 전</p>
      </div>
      <div className="flex flex-col gap-[1.8rem] py-[1.6rem] px-[1.8rem]">
        <p className="text-xl font-semibold">{item.name} 고객님</p>
        <HorizontalLine width="100%" />
        <LessonInfo startDate="" endDate="" locationType="" />
      </div>
      <QuotePrice price={formatPrice(180000)} />
    </CardContainer>
  );
}
