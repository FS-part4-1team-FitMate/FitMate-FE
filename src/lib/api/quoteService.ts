import { QuoteData } from "@/types/quote";
import { post } from "./method";

// 견적 보내기
export async function sendQuote(quote: QuoteData) {
  const res = await post("/quotes", quote);
  return res.data;
}
