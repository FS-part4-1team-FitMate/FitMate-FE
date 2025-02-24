import Link from "next/link";
import { useGetUser } from "@/lib/api/queries/user";
import formatDate from "@/lib/utils/formatDate";
import formatPrice from "@/lib/utils/formatPrice";
import { Quote } from "@/types/quote";
import { LessonType, LocationType, locationType_trans } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
import CardContainer from "../Common/Card/CardContainer";
import LessonInfo from "../Common/Card/LessonInfo";
import QuotePrice from "../Common/Card/QuotePrice";
import { HorizontalLine } from "../Common/Line";
import ChipRequestStatus from "../Chip/ChipRequestStatus";

export default function SentRequestCard({ item }: { item: Quote }) {
  const lessonRequest = item.lessonRequest;
  const { data: userData } = useGetUser(lessonRequest?.userId as string);
  const isCompleted = item.status === "COMPLETED";

  return (
    <div  className="relative" >
      <CardContainer width="100%" gap="1.6rem" >
        <Link href={`/trainer/managing-request/sent-request/${item.lessonRequestId}`}>
          <div className="flex gap-4">
            <ChipRequestStatus requestStatus={item?.status} />
            <ChipLessonType lessonType={lessonRequest?.lessonType as LessonType} />
          </div>
          <div className="flex flex-col gap-[1.8rem] py-[1.6rem] px-[1.8rem]">
            <p className="text-xl font-semibold">{userData?.profile.name} 고객님</p>
            <HorizontalLine width="100%" />
            <LessonInfo
              startDate={lessonRequest?.startDate ? formatDate(lessonRequest.startDate) : "날짜 없음"}
              endDate={lessonRequest?.endDate ? formatDate(lessonRequest.endDate) : "날짜 없음"}
              locationType={locationType_trans[lessonRequest?.locationType as LocationType]}
              address={lessonRequest?.roadAddress || "주소 없음"}
            />
          </div>
          <QuotePrice price={formatPrice(item.price)} />
          {isCompleted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-500 bg-opacity-75 rounded-[1.6rem]">
            <p className="text-white text-lg font-semibold mb-4">이미 완료된 견적이에요</p>
          </div>
        )}
        </Link>
      </CardContainer>
      </div>
  );
}
