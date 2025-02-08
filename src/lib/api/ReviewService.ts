import { FetchReviewsParams, Review, ReviewParams } from "@/types/reviews";
import { get, patch, post } from "./method";

//리뷰 작성
export const postReview = async ({ id, rating, content }: ReviewParams) => {
  const response = await post(`/reviews`, { lessonQuoteId: id, rating, content });
  return response.data;
};

//리뷰 수정
export const patchReview = async ({ id, rating, content }: ReviewParams) => {
  const response = await patch(`/reviews`, { id, rating, content });
  return response.data;
};

//리뷰 가져오기
export const getReview = async ({
  page,
  limit,
}: FetchReviewsParams): Promise<{
  reviews: Review[];
  totalCount: number;
}> => {
  const response = await get("/reviews", {
    params: { page, limit },
  });
  return response.data;
};

//특정 트레이너 리뷰들 가져오기기
export const getReviews = async (
  trainerId: string,
  { page, limit }: FetchReviewsParams,
): Promise<{
  reviews: Review[];
  totalCount: number;
}> => {
  const response = await get(`/reviews`, { trainer_id: trainerId, page, limit });
  return response.data;
};

export const getReviewStat = async (trainerId: string) => {
  const response = await get(`/reviews/rating-stats/${trainerId}`);
  return response.data;
};
