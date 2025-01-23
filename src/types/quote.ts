export interface QuoteData {
  lessonRequestId: string;
  price: number;
  message: string;
}

export interface QuoteParams {
  page?: number;
  limit?: number;
  order?: string;
  sort?: string;
  status?: string;
  trainer_id?: string;
  min_price?: number;
  max_price?: number;
  lesson_request_id?: string;
}

export interface Quote {
  id: string;
  trainerId: string;
  lessonRequestId: string;
  price: number;
  message: string;
  status: string;
  rejectionReason?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface QuoteResult {
  list: Quote[];
  hasMore: boolean;
  totalCount: number;
}
