import { LessonRequestStatus, LessonType, LocationType, Profile } from "@/types/types";

export interface LessonParams {
  page?: number;
  limit?: number;
  order?: string;
  sort?: string;
  lesson_type?: string;
  lesson_sub_type?: string;
  location_type?: string;
  status?: string;
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
  directQuoteRequest?: [];
  user: {
    id: string;
    nickname: string;
    profile: Pick<Profile, "name" | "gender" | "region">;
  };
  isDirectQuote: boolean;
}

export interface LessonResult {
  list: Lesson[];
  totalCount: number;
  hasMore: boolean;
  lessonTypeCounts: {
    SPORTS: number;
    FITNESS: number;
    REHAB: number;
  };
  genderCounts: {
    MALE: number;
    FEMALE: number;
  };
  directQuoteRequestCount: number;
}
