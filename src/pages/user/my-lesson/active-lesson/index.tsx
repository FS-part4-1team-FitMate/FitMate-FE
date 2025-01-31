import { useQuery } from "@tanstack/react-query";
import { getMyLessonRequest } from "@/lib/api/lessonService";
import { MyLessonResult } from "@/types/lesson";
import ActiveLessonSection from "@/components/ActiveLesson/ActiveLessonSection";
import Loading from "@/components/Common/Loading";

export default function ActiveLesson() {
  const { data, isLoading, isError } = useQuery<MyLessonResult>(["active-lesson"], () =>
    getMyLessonRequest({
      page: 1,
      limit: 3,
      status: "QUOTE_CONFIRMED",
    }),
  );

  const activeLesson = data?.list ?? [];

  if (isError) return <div>error!</div>;

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
      {isLoading && <Loading />}
    </div>
  );
}
