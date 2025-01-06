import CardContainer from "../Common/Card/CardContainer";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";

const quote_price = "flex justify-end items-center gap-[1.6rem]";

export default function QuoteCard() {
  return (
    <CardContainer width="68.8rem" gap="1.6rem">
      <div className="text-xl font-semibold">칩 넣을 자리</div>
      <p className="text-2xl font-semibold">고객님에게 맞춤형 레슨을 해드립니다.</p>
      <TrainerInfo />
      <div className={quote_price}>
        <p className="text-2lg font-medium">견적 금액</p>
        <p className="text-2xl font-bold">180,000원</p>
      </div>
    </CardContainer>
  );
}
