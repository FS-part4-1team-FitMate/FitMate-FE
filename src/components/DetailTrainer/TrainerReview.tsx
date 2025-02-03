import formatDate from "@/lib/utils/formatDate";
import { Review, ReviewStat } from "@/types/reviews";
import RatingAvgCard from "../Cards/RatingAvgCard";
import RatingStatCard from "../Cards/RatingStatCard";
import ReviewCard from "../Cards/ReviewCard";

interface TrainerReviewProps {
  reviewList?: Review[];
  reviewStat: ReviewStat[];
  totalCount: number;
}

export default function TrainerReview({ reviewList, reviewStat, totalCount }: TrainerReviewProps) {
  const sum =
    reviewList?.reduce((sum, review) => {
      return sum + review.rating;
    }, 0) ?? 0;

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-[3.2rem]">
        <h1 className="text-black-400 text-lg font-bold pc:text-2xl">리뷰 ({totalCount})</h1>
        <div className="flex items-center gap-4 py-16 px-[6.4rem] rounded-[3.2rem] bg-bg-200">
          <RatingAvgCard ratingAvg={sum / totalCount} />
          <RatingStatCard ratingStat={reviewStat} />
        </div>
      </div>
      {reviewList?.map((review: Review) => (
        <ReviewCard
          rating={review?.rating}
          createdAt={formatDate(review?.createdAt)}
          nickname={review?.user?.nickname}
          content={review?.content}
        />
      ))}
    </div>
  );
}
