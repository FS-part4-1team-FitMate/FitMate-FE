import { ReviewItem } from "@/types/reviews";
import Button from "../Common/Button";
import CardContainer from "../Common/Card/CardContainer";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";

interface Props {
  item: ReviewItem;
  onClick: () => void;
}

export default function WriteReviewCard({ item, onClick }: Props) {
  return (
    <CardContainer width="100%" gap="2.4rem">
      <TrainerInfo name={item.name} />
      <p className="text-sm text-gray-500">이사일 {item.date}</p>
      <p className="text-sm text-gray-500">견적가 {item.price}</p>
      <Button onClick={onClick} className="bg-blue-500 text-white hover:bg-blue-600 transition">
        리뷰 작성하기
      </Button>
    </CardContainer>
  );
}
