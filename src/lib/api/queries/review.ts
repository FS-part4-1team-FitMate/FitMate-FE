import { useQuery } from "@tanstack/react-query";
import { ReviewResult, ReviewStat } from "@/types/reviews";
import { getReviewStat, getReviews } from "../ReviewService";

// 리뷰 스탯 가져오기
export const useGetRatingStat = (trainerId: string) => {
  return useQuery<ReviewStat[]>(["review-stat", trainerId], () => getReviewStat(trainerId), {
    enabled: !!trainerId,
    cacheTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });
};

// 리뷰 목록 조회
export const useGetReviewList = (trainerId: string, currentPage: number, pageSize: number) => {
  return useQuery<ReviewResult>(
    ["reviews", trainerId, { page: currentPage, limit: pageSize }],
    () => getReviews(trainerId, { page: currentPage, limit: pageSize }),
    {
      enabled: !!trainerId,
      keepPreviousData: true,
      cacheTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    },
  );
};
