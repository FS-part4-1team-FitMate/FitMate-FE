import { useInfiniteQuery } from "@tanstack/react-query";
import { LessonParams, MyLessonResult } from "@/types/lesson";
import { getMyLessonRequest } from "../lessonService";

export const useGetMyLessonList = ({ limit, status }: LessonParams) => {
  return useInfiniteQuery<MyLessonResult>(
    ["my-lesson", { limit, status }],
    ({ pageParam }) =>
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
