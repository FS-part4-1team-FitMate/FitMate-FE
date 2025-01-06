const quote = "flex justify-end items-center gap-[1.6rem]";
const quote_label = "text-2lg font-medium";
const quote_price = "text-2xl font-bold";

export default function QuotePrice() {
  return (
    <div className={quote}>
      <p className={quote_label}>견적 금액</p>
      <p className={quote_price}>180,000원</p>
    </div>
  );
}
