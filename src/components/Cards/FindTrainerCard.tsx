import CardContainer from "../Common/Card/CardContainer";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";

/**
 * 임시로 any 타입 지정
 */
export default function FindTrainerCard({ item }: { item: any }) {
  return (
    <CardContainer width="100%" gap="1.6rem">
      <div className="text-xl font-semibold">칩 넣을 자리</div>
      <p className="text-2xl font-semibold">고객님에게 맞춤형 레슨을 해드립니다.</p>
      <TrainerInfo
        name={item.name}
        rating={item.rating}
        reviewCount={item.reviewCount}
        experience={item.experience}
        lessonCount={item.lessonCount}
        isFavorited={item.isFavorited}
        favoriteCount={item.favoriteCount}
      />
    </CardContainer>
  );
}
