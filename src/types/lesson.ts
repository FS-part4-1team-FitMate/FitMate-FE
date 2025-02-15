import {
  LessonRequestStatus,
  LessonSubType,
  LessonType,
  LocationType,
  Profile,
} from "@/types/types";

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
  has_direct_quote?: boolean;
  keyword?: string;
}

export interface Lesson {
  id: string;
  userId: string;
  lessonType: LessonType;
  lessonSubType: LessonSubType;
  startDate: string;
  endDate: string;
  lessonCount: number;
  lessonTime: number;
  quoteEndDate: string;
  locationType: LocationType;
  postcode?: string;
  roadAddress?: string;
  detailAddress?: string;
  status: LessonRequestStatus;
  createdAt: string;
  updatedAt: string;
  directQuoteRequest: [
    {
      directQuoteRequestId: string | undefined;
      lessonRequestId: string | undefined;
      trainerId: string | undefined;
      status: string | undefined;
      rejectionReason: string | undefined;
    },
  ];
  lessonQuotes: [
    {
      id: string;
      lessonRequestId: string;
      trainerId: string;
      price: number;
      status: string;
      createdAt: string;
      updatedAt: string;
      rejectionReason: null;
      trainer: {
        id: string;
        nickname: string;
        profile: {
          name: string;
          region: string[];
        };
      };
    },
  ];
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
    male: number;
    female: number;
  };
  directQuoteRequestCount: number;
}

export interface FilterCheck {
  lessonType: { [key: string]: boolean };
  gender: { [key: string]: boolean };
  isDirectQuote: { [key: string]: boolean };
  region: { [key: string]: boolean };
}
