import { ReviewableList } from "@/types/reviews";
import Button from "../Common/Button";
import CardContainer from "../Common/Card/CardContainer";
import TrainerInfo from "../Common/Card/TrainerInfo/TrainerInfo";
import LessonInfo from "../Common/Card/LessonInfo";
import formatDate from "@/lib/utils/formatDate";


interface Props {
  item: ReviewableList;
  onClick: () => void;
}

export default function WriteReviewCard({ item, onClick }: Props) {
  const { lessonRequest } = item;

  return (
    <CardContainer width="100%" gap="2.4rem">
      <TrainerInfo name={`트레이너 ID: ${item.trainerId}`} />  
      <LessonInfo
        startDate={formatDate(lessonRequest?.startDate)}
        endDate={formatDate(lessonRequest?.endDate)}
      />
      <Button onClick={onClick} className="bg-blue-500 text-white hover:bg-blue-600 transition">
        리뷰 작성하기
      </Button>
    </CardContainer>
  );
}