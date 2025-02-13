import StarPoints from "../Common/StarPoints";

interface Props {
  rating: 1 | 2 | 3 | 4 | 5;
  createdAt: string;
  nickname: string;
  content: string;
  price: number;
}

function MyReviewCard({ rating, createdAt, content, nickname, price }: Props) {
  return (
    <div className="flex flex-col gap-[12px] border border-gray-200 p-[16px] rounded-lg shadow-sm bg-white">
      <div className="flex flex-col gap-[4px]">
        <div className="text-md text-slate-500">작성일: {createdAt}</div>
        <div className="text-md font-bold">{nickname}</div>
        <div className="text-md text-gray-600">견적가: {price.toLocaleString()}원</div>
      </div>
      <div className="flex justify-between items-center mt-[8px]"></div>
      <StarPoints rating={rating / 5.0} />
      <pre className="text-md text-wrap font-pretendard text-gray-800 mt-[8px]">{content}</pre>
    </div>
  );
}

export default MyReviewCard;