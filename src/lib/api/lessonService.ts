import { LessonParams, LessonResult } from "@/types/lesson";
import { get } from "./method";

// 받은 레슨 요청 목록 조회
export async function getReceiveRequest({
  page,
  limit,
  order,
  sort,
  lessonType,
  gender,
  region,
  keyword,
}: LessonParams): Promise<LessonResult> {
  const res = await get("/lessons", {
    page,
    limit,
    order,
    sort,
    lessonType,
    gender,
    region,
    keyword,
  });
  return res.data;
}

// 레슨 상세 조회
export async function getLessonInfo(lessonId: string) {
  const res = await get(`/lessons/${lessonId}`);
  return res.data;
}
