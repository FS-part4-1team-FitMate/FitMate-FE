const quote =
  "flex justify-end items-center pc:gap-[1.6rem] tablet:gap-[0.8rem] mobile:gap-[0.8rem]";
const quote_label = "font-medium pc:text-2lg tablet:text-md mobile:text-md";
const quote_price = "font-bold pc:text-2xl tablet:text-2lg mobile:text-2lg";

export default function QuotePrice({ price }: { price: number }) {
  /**
   * TODO 가격 포맷 함수 만들기
   */
  return (
    <div className={quote}>
      <p className={quote_label}>견적 금액</p>
      <p className={quote_price}>{price}원</p>
    </div>
  );
}
