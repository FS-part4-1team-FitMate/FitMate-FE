import FindTrainerCard from "@/components/Cards/FindTrainerCard";
import PendingLessonCard from "@/components/Cards/PendingLessonCard";

export default function Home() {
  return (
    <div className=" bg-pink-200 m-10 p-10">
      <FindTrainerCard />
      <PendingLessonCard />
    </div>
  );
}
