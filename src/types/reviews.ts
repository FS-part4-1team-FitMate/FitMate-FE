import { Lesson } from "./lesson";

export interface ReviewParams {
  id: number;
  rating: number;
  content: string;
}

export interface Review {
  id: number;
  rating: 1 | 2 | 3 | 4 | 5;
  content: string;
  createdAt: string;
  user: {
    nickname: string;
  };
}

export interface FetchReviewsParams {
  page: number;
  limit: number;
}

export interface ReviewResult {
  reviews: Review[];
  totalCount: number;
}

export interface ReviewStat {
  rating: number;
  count: number;
}

export interface ReviewableList {
  id: string;
  trainerId: string;
  lessonRequestId: string;
  price: number;
  message?: string;
  status?: string;
  createdAt: string;
  lessonRequest: {
    id: string;
    startDate: string;
    endDate: string;
  };
  Review: any[];
}

export interface MyReview {
  content: string;
  createdAt: string;
  lessonQuote: {
    price: number;
    trainer: {
      nickname: string;
      profile: {
        profileImage?: string;
      };
    };
    lessonRequest: {
      quoteEndDate: string;
      lessonType: string;
    };
  };
}