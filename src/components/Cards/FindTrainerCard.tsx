import CardContainer from "../Common/Card/CardContainer";
import TrainerInfo from "../Common/Card/TrainerInfo";

export default function FindTrainerCard() {
  return (
    <CardContainer width="95.5rem" gap="1.6rem">
      <div className="text-xl font-semibold">칩 넣을 자리</div>
      <p className="text-2xl font-semibold">고객님에게 맞춤형 레슨을 해드립니다.</p>
      <TrainerInfo />
    </CardContainer>
  );
}
