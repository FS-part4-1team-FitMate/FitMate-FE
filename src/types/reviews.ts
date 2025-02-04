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

export interface ReviewItem {
  id: number;
  name: string;
  date: string;
  price: string;
}

export interface FetchReviewsParams {
  page: number;
  limit: number;
}
