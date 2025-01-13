import { LessonParams, LessonResult } from "@/types/lesson";
import { get } from "./method";

// 받은 레슨 요청 목록 조회
export async function getReceiveLesson({
  page,
  limit,
  order,
  sort,
  lesson_type,
  gender,
  region,
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
    keyword,
  });
  return res.data;
}
