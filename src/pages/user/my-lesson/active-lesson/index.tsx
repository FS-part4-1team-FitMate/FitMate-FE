import toast from "react-hot-toast";
import { useGetMyLessonList } from "@/lib/api/query/lesson";
import ActiveLessonSection from "@/components/ActiveLesson/ActiveLessonSection";
import Loading from "@/components/Common/Loading";

export default function ActiveLesson() {
  const { data, isLoading, isError } = useGetMyLessonList({ limit: 1, status: "QUOTE_CONFIRMED" });

  if (isLoading) return <Loading />;
  if (isError) return toast.error("받았던 레슨 정보를 불러오는 중 에러가 발생했어요! 😢");

  const activeLesson = data?.pages?.flatMap((page) => page.list) ?? [];

  const rehabLessons = activeLesson.filter((lesson) => lesson.lessonType === "REHAB");
  const sportsLessons = activeLesson.filter((lesson) => lesson.lessonType === "SPORTS");
  const fitnessLessons = activeLesson.filter((lesson) => lesson.lessonType === "FITNESS");

  return (
    <div className="flex max-w-[192rem] m-auto py-16 px-8 bg-bg-100 pc:py-[6.4rem]">
      <div className="flex flex-col gap-8 max-w-[140rem] w-full m-auto">
        <ActiveLessonSection title="재활운동" items={rehabLessons} />
        <ActiveLessonSection title="스포츠" items={sportsLessons} />
        <ActiveLessonSection title="피트니스" items={fitnessLessons} />
      </div>
    </div>
  );
}
