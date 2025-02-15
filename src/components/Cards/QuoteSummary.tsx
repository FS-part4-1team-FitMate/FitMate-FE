import formatDate from "@/lib/utils/formatDate";
import { LessonType, LocationType, locationType_trans } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
import CardContainer from "../Common/Card/CardContainer";
import LessonInfo from "../Common/Card/LessonInfo";
import { HorizontalLine } from "../Common/Line";
import { QuoteSummary } from "@/types/quote";



/**
 *
 * @TODO replace any
 */

export default function QuoteSummaryCard({ item }: { item: QuoteSummary }) {

  return (
    <CardContainer width="100%" gap="1.6rem">
      <div className="flex justify-between">
          <ChipLessonType lessonType={item?.lessonType as LessonType} />
      </div>
      <div className="flex flex-col gap-[1.8rem] py-[1.6rem] px-[1.8rem]">
        <p className="text-xl font-semibold">{item?.userId} 고객님</p>
        <HorizontalLine width="100%" />
          <LessonInfo
            startDate={item?.startDate ? formatDate(item.startDate) : "날짜 없음"}
            endDate={item?.endDate ? formatDate(item.endDate) : "날짜 없음"}
            locationType={locationType_trans[item?.locationType as LocationType]}
            address={item?.roadAddress || "주소 없음"}
          />
      </div>
    </CardContainer>
  );
}