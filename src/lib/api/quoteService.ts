import { QuoteData } from "@/types/quote";
import { post } from "./method";

export async function SendQuote(quote: QuoteData) {
  const res = await post("/quotes", quote);
  return res.data;
}
