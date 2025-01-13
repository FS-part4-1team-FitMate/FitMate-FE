import { LessonParams, LessonResult } from "@/types/lesson";
import instance from "./instance";

async function get(url: string, params = {}) {
  return instance.get(url, { params });
}

async function post<T>(url: string, body: T) {
  return instance.post(url, body);
}

async function patch<T>(url: string, body: T) {
  return instance.patch(url, body);
}

async function remove(url: string) {
  return instance.delete(url);
}

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
