import { MyReview } from "@/types/reviews";
import CardContainer from "../Common/Card/CardContainer";
import Image from "next/image";
import { ic_profile_default_md, ic_star_active_md, ic_star_inactive_md } from "@/imageExports";
import ChipLessonType from "../Chip/ChipLessonType";
import { LessonType} from "@/types/types";
import QuotePrice from "../Common/Card/QuotePrice";
import formatPrice from "@/lib/utils/formatPrice";

interface MyReviewCardProps {
  review: MyReview;
}

export default function MyReviewCard({ review }: MyReviewCardProps) {
  return (
    <CardContainer width="100%" gap="1.6rem" >
      <div className="flex justify-between">
        <ChipLessonType lessonType={review.lessonQuote.lessonRequest.lessonType as LessonType} />
        <p className="text-sm text-gray-500">작성일: {new Date(review.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="flex items-center gap-4 border border-gray-100 rounded-lg p-4">
        {review.lessonQuote.trainer.profile.profileImage ? (
          <Image
            src={review.lessonQuote.trainer.profile.profileImage}
            alt="트레이너 프로필"
            width={80}
            height={80}
            className="rounded-full"
            layout="fixed"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-300 rounded-full" />
        )}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">{review.lessonQuote.trainer.nickname}</h2>
          <div className="text-md font-medium pc:text-2lg flex justify-between gap-6 items-center">
            <span>견적 만료일 {new Date(review.lessonQuote.lessonRequest.quoteEndDate).toLocaleDateString()}</span>
            <QuotePrice price={formatPrice(review.lessonQuote.price)} />
          </div>
          <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Image
                  key={index}
                  src={index < review.rating ? ic_star_active_md : ic_star_inactive_md}
                  width={20}
                  height={20}
                  alt={`별점 ${index + 1}`}
                />
              ))}
            </div>
        </div>
      </div>
      <p className="text-sm text-gray-600">{review.content}</p>
    </CardContainer>
  );
}