import formatDate from "@/lib/utils/formatDate";
import { LessonType, LocationType, locationType_trans } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
import CardContainer from "../Common/Card/CardContainer";
import LessonInfo from "../Common/Card/LessonInfo";
import { HorizontalLine } from "../Common/Line";

/**
 *
 * @TODO replace any
 */

export default function RejectedRequestCard({ item }: { item: any }) {
  return (
    <CardContainer width="100%" gap="1.6rem">
      <div className="flex justify-between">
        <ChipLessonType lessonType={item.lessonType as LessonType} size="lg" />
        <p className="text-gray-500 text-xs font-normal">1시간 전</p>
      </div>
      <div className="flex flex-col gap-[1.8rem] py-[1.6rem] px-[1.8rem]">
        <p className="text-xl font-semibold">{item.name} 고객님</p>
        <HorizontalLine width="100%" />
        <LessonInfo
          startDate={formatDate(item?.startDate)}
          endDate={formatDate(item?.endDate)}
          locationType={locationType_trans[item?.locationType as LocationType]}
          address={item?.roadAddress}
        />
      </div>
    </CardContainer>
  );
}
