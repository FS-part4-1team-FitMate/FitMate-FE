import toast from "react-hot-toast";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Lesson, LessonParams, MyLessonResult } from "@/types/lesson";
import { createDirectQuote, getLessonInfo, getMyLessonRequest } from "../lessonService";

// 내 레슨 전체 목록 조회
export const useGetMyLessons = ({ status }: LessonParams) => {
  return useQuery<MyLessonResult>(["my-lesson"], () => getMyLessonRequest({ status }));
};

// 내 레슨 조회 (무한 스크롤)
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

// 지정 견적 요청
export const useDirectQuote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lessonId, trainerId }: { lessonId: string; trainerId: string }) =>
      createDirectQuote(lessonId, trainerId),
    onSuccess: () => {
      queryClient.invalidateQueries(["received-request"]);
      toast.success("지정 견적을 요청하였습니다.");
    },
    onError: (error: any) => {
      console.error("견적 요청에 실패하였습니다.", error.message);
      toast.error("견적 요청에 실패하였습니다.");
    },
  });
};
