import clsx from "clsx";
import CardContainer from "../Common/Card/CardContainer";
import LessonInfo from "../Common/Card/LessonInfo";
import QuotePrice from "../Common/Card/QuotePrice";
import { HorizontalLine } from "../Common/Line";
import ChipLessonType from "../Chip/ChipLessonType";
import formatPrice from "@/lib/utils/formatPrice";
import formatDate from "@/lib/utils/formatDate";
import Link from "next/link";
import { LessonType, LocationType, locationType_trans } from "@/types/types";
import { Quote } from "@/types/quote";

/**
 *
 * @TODO replace any
 */

export default function SentRequestCard({ item }: { item: any }) {
  return (
    <CardContainer width="100%" gap="1.6rem">
      <div className="flex justify-between"> 
          <ChipLessonType key={index} lessonType={lessonType as LessonType} size="lg" />
        <p className="text-gray-500 text-xs font-normal">1시간 전</p>
      </div>
      <div className="flex flex-col gap-[1.8rem] py-[1.6rem] px-[1.8rem]">
        <p className="text-xl font-semibold">{item.name} 고객님</p>
        <HorizontalLine width="100%" />
        <Link href={`/trainer/managing-request/sent-request/${item.id}`}>
        <LessonInfo
          startDate={formatDate(item?.startDate)}
          endDate={formatDate(item?.endDate)}
          locationType={locationType_trans[item?.locationType as LocationType]}
          address={item?.roadAddress}
        />
      </Link>
      </div>
      <QuotePrice price={formatPrice(item.price)} />
    </CardContainer>
  );
}