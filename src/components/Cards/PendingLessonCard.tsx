import clsx from "clsx";
import CardContainer from "../Common/Card/CardContainer";
import LessonInfo from "../Common/Card/LessonInfo";
import QuotePrice from "../Common/Card/QuotePrice";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";

const buttons = "flex gap-[1.1rem]";
const button = clsx("flex-1", "h-[6.4rem]", "p-[1.6rem] rounded-[1.6rem]", "text-xl font-semibold");

/**
 *
 * @TODO replace any
 */

export default function PendingLessonCard({ item }: { item: any }) {
  return (
    <CardContainer width="68.8rem" gap="2.4rem">
      <div className="text-2lg font-medium">칩 넣을 자리</div>
      <TrainerInfo
        rating={item.rating}
        reviewCount={item.reviewCount}
        experience={item.experience}
        lessonCount={item.lessonCount}
        isFavorited={item.isFavorited}
        favoriteCount={item.favoriteCount}
      />
      <LessonInfo
        startDate={item.startDate}
        endDate={item.endDate}
        locationType={item.locationType}
      />
      <QuotePrice price={item.price} />
      <div className={buttons}>
        <button className={`${button} text-gray-50 bg-blue-300`}>견적 확정하기</button>
        <button className={`${button} border border-blue-300 text-blue-300 bg-gray-50`}>
          상세보기
        </button>
      </div>
    </CardContainer>
  );
}
