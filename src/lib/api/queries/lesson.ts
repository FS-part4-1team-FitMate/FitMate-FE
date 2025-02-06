import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Lesson, LessonParams, MyLessonResult } from "@/types/lesson";
import { getLessonInfo, getMyLessonRequest } from "../lessonService";

// 내 레슨 조회
export const useGetMyLessonList = ({ limit, status }: LessonParams) => {
  return useInfiniteQuery<MyLessonResult>(
    ["my-lesson", { limit, status }],
    ({ pageParam = 1 }) =>
      getMyLessonRequest({
        page: pageParam,
        limit,
        status,
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.hasMore ? allPages.length + 1 : undefined;
      },
    },
  );
};

// 레슨 상세 조회
export const useGetLesson = (lessonRequestId: string) => {
  return useQuery<Lesson>(["lesson-info", lessonRequestId], () => getLessonInfo(lessonRequestId), {
    enabled: !!lessonRequestId,
  });
};
