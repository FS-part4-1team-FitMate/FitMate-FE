import { get, patch, post } from "./method";
import { ReviewParams, FetchReviewsParams } from "@/types/reviews";

//리뷰 작성
export const postReview = async ({ id, rating, content }: ReviewParams) => {
    const response = await post(`/reviews/${id}`, {id, rating, content})
    return response.data;
}

//리뷰 가져오기기
export const getReview = async ({ page, limit }: FetchReviewsParams) => {
    const response = await get("/api/reviews", {
      params: { page, limit }
    });
    return response.data;
}