import { Profile } from "@/types/types";

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
  directQuoteRequest?: [
    {
      directQuoteRequestId: string | undefined;
      lessonRequestId: string | undefined;
      trainerId: string | undefined;
      status: string | undefined;
      rejectionReason: string | undefined;
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

export interface MyLesson {
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
  directQuoteRequests: [
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
    profile: {
      name: string;
      gender: string;
      region: string[];
    };
  };
  isDirectQuote: false;
}

export interface MyLessonResult {
  list: MyLesson[];
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
