import { LessonType } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
import CardContainer from "../Common/Card/CardContainer";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";

interface FindTrainerCardProps {
  name: string;
  rating: number;
  reviewCount: number;
  experience: number;
  lessonCount: number;
  isFavorited: boolean;
  favoriteCount: number;
  lessonType: LessonType[];
}

export default function FavoiriteTrainerCard({
  name,
  rating,
  reviewCount,
  experience,
  lessonCount,
  isFavorited,
  favoriteCount,
  lessonType,
}: FindTrainerCardProps) {
  return (
    <CardContainer width="100%" gap="1.6rem">
      <div className="w-fit">
        {lessonType.map((type, index) => (
          <ChipLessonType key={index} lessonType={type as LessonType} size="lg" />
        ))}
      </div>
      <TrainerInfo
        name={name}
        rating={rating || 0}
        reviewCount={reviewCount || 0}
        experience={experience || 0}
        lessonCount={lessonCount || 0}
        isFavorited={isFavorited}
        favoriteCount={favoriteCount || 0}
      />
    </CardContainer>
  );
}
