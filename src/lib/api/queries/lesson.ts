import toast from "react-hot-toast";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Lesson, LessonParams, LessonResult } from "@/types/lesson";
import {
  cancelLessonRequest,
  createDirectQuote,
  getLessonInfo,
  getMyLessonRequest,
  getReceiveRequest,
} from "../lessonService";

// 레슨 요청 목록 조회
export const useGetReceivedLesson = (
  userId: string,
  { keyword, order, sort, status, lesson_type, gender, region, has_direct_quote }: LessonParams,
) => {
  return useInfiniteQuery<LessonResult>(
    [
      "received-request",
      userId,
      { keyword, order, sort, status, lesson_type, gender, region, has_direct_quote },
    ],
    ({ pageParam = 1 }) =>
      getReceiveRequest({
        page: pageParam,
        limit: 5,
        keyword,
        order,
        sort,
        status,
        lesson_type,
        gender,
        region,
        has_direct_quote,
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.hasMore ? allPages.length + 1 : undefined;
      },
    },
  );
};

// 내 레슨 전체 목록 조회
export const useGetMyLessons = ({ status }: LessonParams) => {
  return useQuery<LessonResult>(["my-lesson"], () => getMyLessonRequest({ status }));
};

// 내 레슨 조회 (무한 스크롤)
export const useGetMyLessonList = (userId: string, { limit, status }: LessonParams) => {
  return useInfiniteQuery<LessonResult>(
    ["my-lesson", userId, { limit, status }],
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
      queryClient.invalidateQueries(["received-request", "my-lesson"]);
      toast.success("지정 견적을 요청하였습니다.");
    },
    onError: (error: any) => {
      console.error("견적 요청에 실패하였습니다.", error.message);
      toast.error("견적 요청에 실패하였습니다.");
    },
  });
};

// 레슨 요청 취소
export const useCancelLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lessonId: string) => cancelLessonRequest(lessonId),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-lesson"]);
      toast.success("레슨 요청을 취소하였습니다.");
    },
    onError: (error: any) => {
      console.error("레슨 취소 중 문제가 발생했습니다.", error.message);
      toast.error("레슨 취소 중 문제가 발생했습니다.");
    },
  });
};
