import { VerticalLine } from "../Common/Line";
import StarPoints from "../Common/StarPoints";

interface Props {
  rating: 1 | 2 | 3 | 4 | 5;
  createdAt: string;
  nickname: string;
  content: string;
}

function ReviewCard({ rating, createdAt, nickname, content }: Props) {
  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex justify-start items-center">
        <div className="text-md font-medium">{nickname.substring(0, 3)}****</div>
        <VerticalLine height="14px" />
        <div className="text-md text-slate-500">{createdAt}</div>
      </div>
      <StarPoints rating={rating / 5.0} />
      <pre className="text-md text-wrap font-pretendard">{content}</pre>
    </div>
  );
}

export default ReviewCard;
