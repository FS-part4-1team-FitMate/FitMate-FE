import { Lesson } from "@/types/lesson";
import { LessonSubType, LessonType, LocationType } from "./types";


export interface QuoteData {
  lessonRequestId: string;
  price: number;
  message: string;
}

export interface QuoteParams {
  page?: number;
  limit?: number;
  order?: string;
  sort?: string;
  status?: string;
  trainer_id?: string;
  min_price?: number;
  max_price?: number;
  lesson_request_id?: string;
}

export interface Quote {
  id: string;
  trainerId: string;
  lessonRequestId: string;
  lessonRequest?: Lesson;
  price: number;
  message?: string;
  status: string;
  rejectionReason?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RejectedQuoteParams {
  page?: number;
  limit?: number;
  status?: string;
}

export interface QuoteResult {
  list:  {
    id: string;
    trainerId: string;
    lessonRequestId: string;
    lessonRequest?: Lesson;
    price: number;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
  hasMore: boolean;
  totalCount: number;
}

export interface QuoteDetail {
  list: {
    id: string;
    trainerId: string;
    lessonRequestId: string;
    price: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    lessonRequest: QuoteSummary;
    trainer: {
      id: string;
      email: string;
      nickname: string;
    };
  }[];
  totalCount: number;
  hasMore: boolean;
}


export interface QuoteSummary {
      id: string;
      userId: string;
      lessonType: string;
      lessonSubType: string;
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

export interface FormattedData {
    lessonType: LessonType;
    lessonSubType: string;
    startDate: string;
    endDate: string;
    lessonCount: number;
    lessonTime: number;
    locationType: LocationType;
    roadAddress?: string;
}