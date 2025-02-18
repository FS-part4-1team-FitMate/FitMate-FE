import { LocationType } from "./types";

export interface ReviewParams {
  id: string;
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
    roadAddress: string;
    locationType: LocationType;
  };
  trainer: {
    profile: {
      name: string;
      profileImage?: string;
    }
  }
  Review: any[];
}

export interface MyReview {
  rating: number;
  content: string;
  createdAt: string;
  lessonQuote: {
    price: number;
    trainer: {
      nickname: string;
      profile: {
        name: string;
        profileImage?: string;
      };
    };
    lessonRequest: {
      quoteEndDate: string;
      lessonType: string;
    };
  };
}