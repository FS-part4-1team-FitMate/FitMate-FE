import PastLessonCard from "@/components/Cards/PastLessonCard";

/**
 *
 * @TODO 데이터 반환 형식보고 수정 필요
 */

export default function PastLesson() {
  const quotes = new Array(5).fill("");
  const trainerInfos = new Array(3).fill("");

  return (
    <div className="flex flex-col gap-16 max-w-[192rem] m-auto py-[6.4rem] bg-bg-100">
      {quotes.map(() => (
        <PastLessonCard trainerInfos={trainerInfos} />
      ))}
    </div>
  );
}
