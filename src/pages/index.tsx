import FindTrainerCard from "@/components/Cards/FindTrainerCard";
import PendingLessonCard from "@/components/Cards/PendingLessonCard";
import QuoteCard from "@/components/Cards/QuoteCard";
import RequestLessonCard from "@/components/Cards/RequestLessonCard";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 bg-pink-200 m-10 p-10">
      <FindTrainerCard />
      <RequestLessonCard />
      <PendingLessonCard />
      <QuoteCard />
    </div>
  );
}
