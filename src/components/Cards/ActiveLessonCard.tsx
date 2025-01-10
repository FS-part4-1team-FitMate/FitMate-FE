import CardContainer from "../Common/Card/CardContainer";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";

/**
 * 임시로 any 타입 지정
 */
export default function ActiveLessonCard({ item }: { item: any }) {
  return (
    <CardContainer width="100%" gap="1.6rem">
      <div className="text-xl font-semibold">칩 넣을 자리</div>
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
