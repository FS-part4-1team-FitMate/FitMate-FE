export default function QuotePrice({ price }: { price: string }) {
  return (
    <div className="flex justify-end items-center gap-[0.8rem] pc:gap-[1.6rem]">
      <p className="text-md font-medium pc:text-2lg">견적 금액</p>
      <p className="text-2lg font-bold pc:text-2xl">{price}원</p>
    </div>
  );
}
