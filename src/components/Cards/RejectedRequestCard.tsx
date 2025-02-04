import clsx from "clsx";
import CardContainer from "../Common/Card/CardContainer";
import LessonInfo from "../Common/Card/LessonInfo";
import { HorizontalLine } from "../Common/Line";
import ChipLessonType from "../Chip/ChipLessonType";
import formatDate from "@/lib/utils/formatDate";
import Link from "next/link";
import { LessonType, LocationType, locationType_trans } from "@/types/types";
import { Quote } from "@/types/quote";


/**
 *
 * @TODO replace any
 */

export default function RejectedRequestCard({ item }: { item: any }) {
  return (
    <CardContainer width="100%" gap="1.6rem">
      <div className="flex justify-between"> 
        <ChipLessonType key={index} lessonType={lessonType as LessonType} size="lg" />
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