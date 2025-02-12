import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGetMyLessonList } from "@/lib/api/queries/lesson";
import { LessonType, lessonType_trans } from "@/types/types";
import ActiveLessonSection from "@/components/ActiveLesson/ActiveLessonSection";
import EmptyLesson from "@/components/Common/EmptyLesson";
import Loading from "@/components/Common/Loading";

export default function ActiveLesson() {
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUserId(parsedData?.user?.id);
    }
  }, []);

  const { data, isLoading, isError } = useGetMyLessonList(userId, {
    limit: 1,
    status: "QUOTE_CONFIRMED",
  });

  if (isLoading) return <Loading />;
  if (isError) return toast.error("받았던 레슨 정보를 불러오는 중 에러가 발생했어요! 😢");

  const activeLesson = data?.pages?.flatMap((page) => page.list) ?? [];

  const filteredService = (lessonType: LessonType) => {
    if (lessonType === "REHAB") {
      return activeLesson.filter((lesson) => lesson.lessonType === "REHAB");
    } else if (lessonType === "SPORTS") {
      return activeLesson.filter((lesson) => lesson.lessonType === "SPORTS");
    } else if (lessonType === "FITNESS") {
      return activeLesson.filter((lesson) => lesson.lessonType === "FITNESS");
    }
  };

  return (
    <>
      {activeLesson.length > 0 ? (
        <div className="flex max-w-[192rem] m-auto py-16 px-4 bg-bg-100 pc:py-[6.4rem] pc:px-8">
          {activeLesson.map((lesson) => (
            <ActiveLessonSection
              title={lessonType_trans[lesson.lessonType].ko}
              items={filteredService(lesson.lessonType) || []}
            />
          ))}
        </div>
      ) : (
        <EmptyLesson message="진행 중인 레슨이 없습니다." />
      )}
    </>
  );
}
