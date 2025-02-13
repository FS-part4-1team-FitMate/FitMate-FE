import { useUser } from "@/contexts/UserProvider";
import clsx from "clsx";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGetMyLessonList } from "@/lib/api/queries/lesson";
import { QuoteStatus, lessonSubType_trans } from "@/types/types";
import ActiveLessonCard from "@/components/Cards/ActiveLessonCard";
import EmptyLesson from "@/components/Common/EmptyLesson";
import Loading from "@/components/Common/Loading";
import QuoteInfo from "@/components/Common/QuoteInfo";

export default function ActiveLesson() {
  const user = useUser();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(user?.id ?? null);
  }, [user]);

  const { data, isLoading, isError } = useGetMyLessonList(userId || "", {
    limit: 1,
    status: "QUOTE_CONFIRMED",
  });

  if (isLoading) return <Loading />;
  if (isError) return toast.error("받았던 레슨 정보를 불러오는 중 에러가 발생했어요! 😢");

  const activeLesson = data?.pages?.flatMap((page) => page.list) ?? [];

  return (
    <>
      {activeLesson.length > 0 ? (
        <div className="flex flex-col max-w-[192rem] h-screen m-auto py-16 px-4 bg-bg-100 pc:py-[6.4rem] pc:px-8">
          {activeLesson.map((lesson) => (
            <div
              className={clsx(
                "flex flex-col gap-8 h-fit p-10 border border-line-100 rounded-[4rem]",
                "shadow-card bg-gray-50 pc:p-16",
              )}
            >
              <div className="flex justify-between items-end gap-4 pb-8 border-b border-line-200">
                <h1 className="py-4 px-10 border border-yellow-100 bg-yellow-50 rounded-[3rem] text-yellow-100 text-xl font-bold pc:text-3xl">
                  {lessonSubType_trans[lesson.lessonSubType]} 수업 진행 중 ... 🏃🏻‍➡️
                </h1>
                <p className="text-md font-semibold pc:text-lg">
                  레슨 종료까지 D-
                  {Math.ceil(
                    (new Date(lesson.endDate).getTime() - new Date(lesson.startDate).getTime()) /
                      (1000 * 3600 * 24),
                  )}
                </p>{" "}
              </div>
              <QuoteInfo lesson={lesson} />
              {lesson.lessonQuotes
                .filter((quote) => quote.status === QuoteStatus.ACCEPTED)
                .map((quote) => (
                  <ActiveLessonCard key={quote.id} item={lesson} quote={quote} />
                ))}
            </div>
          ))}
        </div>
      ) : (
        <EmptyLesson message="진행 중인 레슨이 없습니다." />
      )}
    </>
  );
}
