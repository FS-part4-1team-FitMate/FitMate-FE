import { LessonRequestStatus, LessonType, LocationType } from "@/types/types";

export interface LessonParams {
  page?: number;
  limit?: number;
  order?: string;
  sort?: string;
  lesson_type?: string;
  gender?: string;
  region?: string;
  keyword?: string;
}

export interface Lesson {
  id: string;
  userId: string;
  lessonType: string;
  lessonSubType?: string;
  startDate: string;
  endDate: string;
  lessonCount: number;
  lessonTime: number;
  quoteEndDate: string;
  locationType: string;
  postcode?: string;
  roadAddress?: string;
  detailAddress?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface LessonResult {
  list: Lesson[];
  totalCount: number;
  hasMore: boolean;
}
