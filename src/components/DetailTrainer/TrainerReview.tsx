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
      <div className="flex justify-center items-center gap-[5.6rem] rounded-[3.2rem] bg-bg-200 pc:flex-row pc:gap-[8.3rem] pc:py-16 pc:px-[6.4rem] tablet:flex-row tablet:py-0 mobile:flex-col mobile:py-8">
        <RatingAvgCard ratingAvg={sum / totalCount} />
        <RatingStatCard ratingStat={reviewStat} />
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
