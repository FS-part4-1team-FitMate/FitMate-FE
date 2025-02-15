import Link from "next/link";
import formatDate from "@/lib/utils/formatDate";
import formatPrice from "@/lib/utils/formatPrice";
import formatTime from "@/lib/utils/formatTime";
import { LessonType, LocationType, locationType_trans } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
import CardContainer from "../Common/Card/CardContainer";
import LessonInfo from "../Common/Card/LessonInfo";
import QuotePrice from "../Common/Card/QuotePrice";
import { HorizontalLine } from "../Common/Line";
import { Quote } from "@/types/quote";

/**
 *
 * @TODO replace any
 */

export default function QuoteDetailCard({ item }: { item: Quote }) {
  const lessonRequest = item.lessonRequest;
  return (
    <CardContainer width="100%" gap="1.6rem">
      <Link href={`/trainer/managing-request/sent-request/${item.lessonRequestId}`}>
      <div className="flex justify-between">
          <ChipLessonType lessonType={lessonRequest?.lessonType as LessonType} />
      </div>
      <div className="flex flex-col gap-[1.8rem] py-[1.6rem] px-[1.8rem]">
        <p className="text-xl font-semibold">{lessonRequest?.userId} 고객님</p>
        <HorizontalLine width="100%" />
          <LessonInfo
            startDate={lessonRequest?.startDate ? formatDate(lessonRequest.startDate) : "날짜 없음"}
            endDate={lessonRequest?.endDate ? formatDate(lessonRequest.endDate) : "날짜 없음"}
            locationType={locationType_trans[lessonRequest?.locationType as LocationType]}
            address={lessonRequest?.roadAddress || "주소 없음"}
          />
      </div>
      <QuotePrice price={formatPrice(item.price)} />
      </Link>
    </CardContainer>
  );
}