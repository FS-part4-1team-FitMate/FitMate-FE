import { LessonType } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
import CardContainer from "../Common/Card/CardContainer";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";

/**
 * 임시로 any 타입 지정
 */
export default function ActiveLessonCard({ item }: { item: any }) {
  return (
    <CardContainer width="100%" gap="1.6rem">
      <div className="flex gap-[0.8rem] pc:gap-[1.2rem]">
        <ChipLessonType lessonType={LessonType.SPORTS} size="lg" />
      </div>
      <TrainerInfo
        name="김강사"
        rating={5}
        reviewCount={23}
        experience={4}
        lessonCount={54}
        isFavorited={true}
        favoriteCount={34}
      />
    </CardContainer>
  );
}
