import { LessonType } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
import CardContainer from "../Common/Card/CardContainer";
import QuotePrice from "../Common/Card/QuotePrice";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";

/**
 *
 * @TODO replace any
 */
export default function QuoteCard({ item }: { item: any }) {
  return (
    <CardContainer width="100%" gap="1.6rem">
      <div className="flex gap-[0.8rem] pc:gap-[1.2rem]">
        <ChipLessonType lessonType={LessonType.FITNESS} size="lg" />
      </div>
      <p className="text-black-300 text-md font-semibold pc:text-2xl">
        고객님에게 맞춤형 레슨을 해드립니다.
      </p>
      <TrainerInfo
        rating={item.rating}
        reviewCount={item.reviewCount}
        experience={item.experience}
        lessonCount={item.lessonCount}
        isFavorited={item.isFavorited}
        favoriteCount={item.favoriteCount}
      />
      <QuotePrice price={item.price} />
    </CardContainer>
  );
}
