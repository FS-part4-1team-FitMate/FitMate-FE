import formatDate from "@/lib/utils/formatDate";
import { Profile } from "@/types/types";
import RatingAvgCard from "../Cards/RatingAvgCard";
import RatingStatCard from "../Cards/RatingStatCard";
import ReviewCard from "../Cards/ReviewCard";

export default function TrainerReview({ reviewList }: { reviewList: Profile }) {
  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-[3.2rem]">
        <h1 className="text-black-400 text-lg font-bold pc:text-2xl">리뷰 (150)</h1>
        <div className="flex items-center gap-4 py-16 px-[6.4rem] rounded-[3.2rem] bg-bg-200">
          <RatingAvgCard ratingAvg={3} />
          <RatingStatCard ratingStat={[0, 0, 1, 2, 3]} />
        </div>
      </div>
      <ReviewCard
        rating={3}
        createdAt={formatDate(reviewList?.createdAt)}
        nickname="홍길동"
        content="2점은 너무 적고 5점은 너무 많은 것 같아서 3점 드릴게요."
      />
    </div>
  );
}
