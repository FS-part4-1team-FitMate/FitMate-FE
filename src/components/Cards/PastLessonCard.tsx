import QuoteInfo from "../Common/QuoteInfo";
import QuoteCard from "./QuoteCard";

export default function PastLessonCard({ trainerInfos }: { trainerInfos: any[] }) {
  return (
    <div className="flex flex-col gap-[4.8rem] max-w-[140rem] w-full mx-auto py-[4.8rem] px-16 border border-line-100 rounded-[4rem] shadow-card bg-gray-50">
      <QuoteInfo />
      <div className="flex flex-col gap-16">
        <p className="text-2xl font-semibold">견적서 목록</p>
        <div className="flex flex-col gap-[3.2rem]">
          {trainerInfos.map((item, index) => (
            <QuoteCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
