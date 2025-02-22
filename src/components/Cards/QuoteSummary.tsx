import { useGetUser } from "@/lib/api/queries/user";
import formatDate from "@/lib/utils/formatDate";
import { QuoteSummary } from "@/types/quote";
import { LessonType, LocationType, locationType_trans } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
import CardContainer from "../Common/Card/CardContainer";
import LessonInfo from "../Common/Card/LessonInfo";
import { HorizontalLine } from "../Common/Line";

export default function QuoteSummaryCard({ item }: { item: QuoteSummary }) {
  const { data: userData } = useGetUser(item?.user?.id as string);

  return (
    <CardContainer width="100%" gap="1.6rem">
      <div className="flex justify-between">
        <ChipLessonType lessonType={item?.lessonType as LessonType} />
      </div>
      <div className="flex flex-col gap-[1.8rem] py-[1.6rem] px-[1.8rem]">
        <p className="text-xl font-semibold">{userData?.profile?.name} 고객님</p>
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
