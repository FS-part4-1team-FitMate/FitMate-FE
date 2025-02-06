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
    reviewStat?.reduce((sum, review) => {
      return sum + review.rating * review.count;
    }, 0) ?? 0;

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-[3.2rem]">
        <div className="flex items-center gap-4 rounded-[3.2rem] pc:bg-bg-200 pc:flex-row pc:py-16 pc:px-[6.4rem] tablet:flex-row mobile:flex-col">
          <RatingAvgCard ratingAvg={sum / totalCount} />
          <RatingStatCard ratingStat={reviewStat} />
        </div>
      </div>
      {reviewList?.map((review: Review) => (
        <ReviewCard
          key={review.id}
          rating={review?.rating}
          createdAt={formatDate(review?.createdAt)}
          nickname={review?.user?.nickname}
          content={review?.content}
        />
      ))}
    </div>
  );
}
