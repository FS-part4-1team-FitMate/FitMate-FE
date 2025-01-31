export interface ReviewParams {
  id: number;
  rating: number;
  content: string;
}

export interface Review {
  id: number;
  rating: number;
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
