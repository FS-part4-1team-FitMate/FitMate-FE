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
  size?: "sm" | "lg";
}

export default function FavoriteTrainerCard({
  name,
  rating,
  reviewCount,
  experience,
  lessonCount,
  isFavorited,
  favoriteCount,
  lessonType,
  size = "lg",
}: FindTrainerCardProps) {
  if (size === "lg") {
    return (
      <CardContainer width="100%" gap="1.6rem">
        <div className="w-fit">
          {lessonType.map((type: LessonType, index: number) => (
            <ChipLessonType key={index} lessonType={type} />
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

  if (size === "sm") {
    return (
      <CardContainer width="32.7rem" gap="1.6rem" size="sm">
        <div className="w-fit">
          {lessonType.map((type: LessonType, index: number) => (
            <ChipLessonType key={index} lessonType={type} />
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
          size="sm"
        />
      </CardContainer>
    );
  }
}
