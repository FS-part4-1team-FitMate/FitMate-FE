import { Trainer } from "@/types/trainer";
import { LessonType } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
import CardContainer from "../Common/Card/CardContainer";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";

interface FindTrainerCardProps {
  item: Trainer;
}

export default function FindTrainerCard({ item }: FindTrainerCardProps) {
  // 다른 데이터에도 맞춰서 변형해야함
  const lessonTypesEnum: LessonType[] = item.profile.lessonType.map((type) => type as LessonType);
  /**
   * @TODO favorite 정보 추가 및 추가 데이터 입력
   */
  return (
    <CardContainer width="100%" gap="1.6rem">
      <div className="flex gap-[0.8rem] pc:gap-[1.2rem]">
        {lessonTypesEnum.map((lessonType, index) => (
          <ChipLessonType key={index} lessonType={lessonType} size="lg" />
        ))}
      </div>
      <p className="text-md font-semibold pc:text-2xl">{item.profile.intro}</p>
      <TrainerInfo
        name={item.nickname}
        rating={item.profile.rating}
        reviewCount={item.profile.reviewCount}
        experience={item.profile.experience}
        lessonCount={item.profile.lessonCount}
        isFavorited={item.isFavorite}
        favoriteCount={23}
      />
    </CardContainer>
  );
}
