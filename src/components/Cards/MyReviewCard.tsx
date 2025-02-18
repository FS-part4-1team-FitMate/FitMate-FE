import { ic_profile_default_md, ic_star_active_md, ic_star_inactive_md } from "@/imageExports";
import Image from "next/image";
import formatDate from "@/lib/utils/formatDate";
import formatPrice from "@/lib/utils/formatPrice";
import { MyReview } from "@/types/reviews";
import { LessonType } from "@/types/types";
import ChipLessonType from "../Chip/ChipLessonType";
import CardContainer from "../Common/Card/CardContainer";
import { VerticalLine } from "../Common/Line";

interface MyReviewCardProps {
  review: MyReview;
}

export default function MyReviewCard({ review }: MyReviewCardProps) {
  return (
    <CardContainer width="100%" gap="1.6rem">
      <div className="flex justify-between">
        <ChipLessonType lessonType={review.lessonQuote.lessonRequest.lessonType as LessonType} />
        <p className="text-sm text-gray-500">작성일: {formatDate(review.createdAt)}</p>
      </div>
      <div className="flex items-center gap-4 border border-gray-100 rounded-[0.6rem] p-4 shadow-card">
        <Image
          src={
            review.lessonQuote.trainer.profile.profileImage
              ? review.lessonQuote.trainer.profile.profileImage
              : ic_profile_default_md
          }
          alt="트레이너 프로필"
          width={80}
          height={80}
          className="rounded-full"
          priority
        />
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold pc:text-xl">
            {review.lessonQuote.trainer.nickname}
          </h2>
          <div className="flex flex-col items-start gap-2 pc:flex-row pc:items-center pc:gap-4">
            <div className="text-md font-medium pc:text-2lg flex justify-between gap-4 items-center">
              <p className="text-gray-500 font-regular">견적 만료일</p>
              <p className="text-black-400">
                {formatDate(review.lessonQuote.lessonRequest.quoteEndDate)}
              </p>
            </div>
            <div className="hidden pc:block">
              <VerticalLine height="1.6rem" />
            </div>
            <div className="text-md font-medium pc:text-2lg flex justify-between gap-4 items-center">
              <p className="text-gray-500 font-regular">견적 금액</p>
              <p className="text-black-400">{formatPrice(review.lessonQuote.price)}원</p>
            </div>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Image
                key={index}
                src={index < review.rating ? ic_star_active_md : ic_star_inactive_md}
                width={20}
                height={20}
                alt={`별점 ${index + 1}`}
                priority
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-md text-gray-600 pc:text-xl">{review.content}</p>
    </CardContainer>
  );
}
