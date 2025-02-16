import { FetchReviewsParams, Review, ReviewableList, ReviewParams, MyReview } from "@/types/reviews";
import { get, patch, post } from "./method";

//리뷰 작성
export const postReview = async ({ id, rating, content }: ReviewParams) => {
  try {
    const response = await post(`/reviews`, { 
      lessonQuoteId: id, 
      rating, 
      content 
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
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

export const getReviewableQuotes = async ({
  page,
  limit,
}: FetchReviewsParams): Promise<{
  list: ReviewableList[];
  totalCount: number;
}> => {
  const response = await get("/quotes/reviewable", {
    params: { page, limit },
  });
  return {
    list: response.data.list,
    totalCount: response.data.totalCount,
  };
};



export const getMyReviews = async (): Promise<{
  reviews: MyReview[];
  totalCount: number;
}> => {
  try {
    const response = await get("/reviews/me");
    return response.data;
  } catch (error) {
    console.error("내 리뷰를 불러오는 중 오류 발생:", error);
    throw new Error("내 리뷰를 불러오는 중 문제가 발생했습니다.");
  }
};