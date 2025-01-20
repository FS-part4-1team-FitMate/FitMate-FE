export interface QuoteData {
  lessonRequestId: string;
  price: number;
  message: string;
}

export interface QuoteParams {
  page?: number;
  limit?: number;
  status?: string;
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
