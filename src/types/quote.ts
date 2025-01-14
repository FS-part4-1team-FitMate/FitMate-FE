export interface QuoteData {
  id: string;
  price: number;
  comment: string;
}

export interface QuoteParams {
  page?: number;
  limit?: number;
  status?: string;
}
