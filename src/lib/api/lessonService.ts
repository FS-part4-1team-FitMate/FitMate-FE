import { LessonParams, LessonResult } from "@/types/lesson";
import { get, patch, post } from "./method";

// 받은 레슨 요청 목록 조회 (강사)
export async function getReceiveRequest({
  page,
  limit,
  order,
  sort,
  lesson_type,
  gender,
  region,
  has_direct_quote,
  keyword,
}: LessonParams): Promise<LessonResult> {
  const res = await get("/lessons", {
    page,
    limit,
    order,
    sort,
    lesson_type,
    gender,
    region,
    has_direct_quote,
    keyword,
  });
  return res.data;
}

// 지정 견적 반려
export async function rejectedLesson(
  lessonId?: string,
  directQuoteRequestId?: string,
  rejectionReason?: string,
) {
  const res = await patch(
    `/lessons/${lessonId}/direct-quote/${directQuoteRequestId}/reject`,
    rejectionReason,
  );
  return res.data;
}

// 레슨 상세 조회
export async function getLessonInfo(lessonId: string) {
  const res = await get(`/lessons/${lessonId}`);
  return res.data;
}

// 내가 신청한 레슨 목록 조회 (유저)
export async function getMyLessonRequest() {
  const res = await get("/lessons/me");
  return res.data;
}

// 지정 견적 요청 (유저)
export async function createDirectQuote(lessonId: string, trainerId: string) {
  const res = await post(`/lessons/${lessonId}/direct-quote`, trainerId);
  return res.data;
}

// 레슨 요청 취소 (유저)
export async function cancelLessonRequest(lessonId: string) {
  const res = await patch(`/lessons/${lessonId}/cancel`);
  return res.data;
}
