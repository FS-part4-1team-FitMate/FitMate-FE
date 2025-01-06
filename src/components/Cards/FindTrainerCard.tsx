import CardContainer from "../Common/Card/CardContainer";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";

const description = "text-2xl font-semibold";

/**
 * TODO 공통되는 type 정리해야됨
 */
interface FindTrainerCardProps {
  rating: number;
  reviewCount: number;
  experience: number;
  lessonCount: number;
  isFavorited: boolean;
  favoriteCount: number;
}

export default function FindTrainerCard({
  rating,
  reviewCount,
  experience,
  lessonCount,
  isFavorited,
  favoriteCount,
}: FindTrainerCardProps) {
  return (
    <CardContainer width="95.5rem" gap="1.6rem">
      <div className="text-xl font-semibold">칩 넣을 자리</div>
      <p className={description}>고객님에게 맞춤형 레슨을 해드립니다.</p>
      <TrainerInfo
        rating={rating}
        reviewCount={reviewCount}
        experience={experience}
        lessonCount={lessonCount}
        isFavorited={isFavorited}
        favoriteCount={favoriteCount}
      />
    </CardContainer>
  );
}
