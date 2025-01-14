export interface QuoteData {
  lessonRequestId: string;
  quote: number;
  message: string;
}

export interface QuoteParams {
  page?: number;
  limit?: number;
  status?: string;
}
