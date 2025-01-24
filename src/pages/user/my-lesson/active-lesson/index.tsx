import { useQuery } from "@tanstack/react-query";
import { getMyLessonRequest } from "@/lib/api/lessonService";
import { LessonResult } from "@/types/lesson";
import ActiveLessonSection from "@/components/ActiveLesson/ActiveLessonSection";
import Loading from "@/components/Common/Loading";

export default function ActiveLesson() {
  const { data, isLoading, isError } = useQuery<LessonResult>(["lesson-list"], () =>
    getMyLessonRequest(),
  );

  if (isError) return <div>error!</div>;

  const lessonList = data?.list || [];

  const rehabLessons = lessonList.filter(
    (lesson) => lesson.lessonType === "REHAB" && lesson.status === "QUOTE_CONFIRMED",
  );
  const sportsLessons = lessonList.filter(
    (lesson) => lesson.lessonType === "SPORTS" && lesson.status === "QUOTE_CONFIRMED",
  );
  const fitnessLessons = lessonList.filter(
    (lesson) => lesson.lessonType === "FITNESS" && lesson.status === "QUOTE_CONFIRMED",
  );

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
