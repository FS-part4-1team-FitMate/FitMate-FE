import QuoteCard from "@/components/Cards/QuoteCard";
import QuoteInfo from "@/components/Common/QuoteInfo";

export default function PastLesson() {
  const items = new Array(10).fill("");

  return (
    <div className="max-w-[192rem] m-auto pt-[6.4rem] bg-bg-100">
      <div className="flex flex-col gap-[4.8rem] max-w-[140rem] mx-auto py-[4.8rem] px-16 border border-line-100 rounded-[4rem] shadow-card bg-gray-50">
        <QuoteInfo />
        <div className="flex flex-col gap-16">
          <p className="text-2xl font-semibold">견적서 목록</p>
          <div className="flex flex-col gap-[3.2rem]">
            {items.map((item, index) => (
              <QuoteCard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
