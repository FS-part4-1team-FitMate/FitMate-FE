import { get, post } from "./method";
import { ReviewParams, FetchReviewsParams } from "@/types/reviews";

export const awaitingReview = async ({ id }) => {
  const response = await get(`{}`)
}

//리뷰 작성
export const postReview = async ({ id, rating, content }: ReviewParams) => {
    const response = await post(`/reviews/${id}`, {id, rating, content})
    return response.data;
}

//리뷰 가져오기
export const getReview = async ({ page, limit }: FetchReviewsParams) => {
    const response = await get('/reviews', {
      params: { page, limit }
    });
    return response.data;
}