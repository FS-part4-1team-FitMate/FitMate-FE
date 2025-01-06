import clsx from "clsx";
import CardContainer from "../Common/Card/CardContainer";
import LessonInfo from "../Common/Card/LessonInfo";
import QuotePrice from "../Common/Card/QuotePrice";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";

const buttons = "flex gap-[1.1rem]";
const button = clsx("flex-1", "h-[6.4rem]", "p-[1.6rem] rounded-[1.6rem]", "text-xl font-semibold");

interface PendingLessonCardProps {
  rating: number;
  reviewCount: number;
  experience: number;
  lessonCount: number;
  isFavorited: boolean;
  favoriteCount: number;
  startDate: string;
  endDate: string;
  locationType: string;
  price: number;
}

export default function PendingLessonCard({
  rating,
  reviewCount,
  experience,
  lessonCount,
  isFavorited,
  favoriteCount,
  startDate,
  endDate,
  locationType,
  price,
}: PendingLessonCardProps) {
  return (
    <CardContainer width="68.8rem" gap="2.4rem">
      <div className="text-2lg font-medium">칩 넣을 자리</div>
      <TrainerInfo
        rating={rating}
        reviewCount={reviewCount}
        experience={experience}
        lessonCount={lessonCount}
        isFavorited={isFavorited}
        favoriteCount={favoriteCount}
      />
      <LessonInfo startDate={startDate} endDate={endDate} locationType={locationType} />
      <QuotePrice price={price} />
      <div className={buttons}>
        <button className={`${button} text-gray-50 bg-blue-300`}>견적 확정하기</button>
        <button className={`${button} border border-blue-300 text-blue-300 bg-gray-50`}>
          상세보기
        </button>
      </div>
    </CardContainer>
  );
}
