export interface ReviewParams {
    id: number; 
    rating: number; 
    content: string;
}

export interface FetchReviewsParams {
    page: number;
    limit: number;
  }