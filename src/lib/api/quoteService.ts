import { QuoteData } from "@/types/quote";
import { QuoteParams } from "@/types/quote";
import { get, patch, post } from "./method";

// 요청한 레슨의 견적 목록 확인
export async function getQuoteList({
  page,
  limit,
  order,
  sort,
  status,
  trainer_id,
  min_price,
  max_price,
  lesson_request_id,
}: QuoteParams) {
  const res = await get("/quotes", {
    page,
    limit,
    order,
    sort,
    status,
    trainer_id,
    min_price,
    max_price,
    lesson_request_id,
  });
  return res.data;
}

// 견적 상세 조회
export async function getQuote(quoteId: string) {
  const res = await get(`/quotes/${quoteId}`);
  console.log(res.data)
  return res.data;
}

// 견적 보내기
export async function sendQuote(quoteData: QuoteData) {
  const res = await post("/quotes", quoteData);
  return res.data;
}

// 견적 확정
export async function acceptQuote(quoteId: string) {
  const res = await patch(`/quotes/${quoteId}/accept`);
  return res.data;
}

// 견적 반려
export async function rejectQuote(quoteId: string) {
  const res = await patch(`/quotes/${quoteId}/reject`);
  return res.data;
}

export async function getRejectedQuote({ page, limit, status }: QuoteParams) {
  const res = await get("/quotes", { page, limit, status });
  return res.data;
}


