import CardContainer from "../Common/Card/CardContainer";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";

interface FindTrainerCardProps {
  rating: number;
  reviewCount: number;
  experience: number;
  lessonCount: number;
  isFavorited: boolean;
  favoriteCount: number;
}

export default function FavoiriteTrainerCard({
  rating,
  reviewCount,
  experience,
  lessonCount,
  isFavorited,
  favoriteCount,
}: FindTrainerCardProps) {
  return (
    <CardContainer width="47.5rem" gap="1.6rem">
      <div className="text-xl font-semibold">칩 넣을 자리</div>
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
