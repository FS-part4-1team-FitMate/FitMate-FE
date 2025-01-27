import { Gender, LessonType, LocationType, Region } from "./types";

export interface TrainerParams {
  page?: number;
  limit?: number;
  order?: string;
  sort?: string;
  gender?: string;
  lessonType?: string;
  keyword?: string;
}

export interface Trainer {
  id: string;
  nickname: string;
  email: string;
  profile: {
    profileImage: string | null;
    intro: string;
    lessonType: LessonType[];
    experience: number;
    rating: number;
    reviewCount: number;
    lessonCount: number;
  };
  _count: {
    favoritedByUsers: number;
  };
  isFavorite: boolean;
}

export interface TrainerResult {
  trainers: Trainer[];
  totalCount: number;
  hasMore: boolean;
}

export type Profile = {
  certificationPresignedUrl: string;
  profile: {
    id: string;
    userId: string;
    name: string;
    phone?: string;
    profileImage?: string | FileList;
    gender: Gender;
    lessonType: LessonType[];
    region: Region[];
    intro?: string;
    description?: string;
    experience?: number;
    certification?: string | FileList;
    certificationValidated?: boolean;
    rating?: number;
    lessonCount?: number;
    reviewCount?: number;
    createdAt: Date;
    updatedAt: Date;
  };
};

export interface FavoriteInfo {
  isFavorite?: boolean;
  favoriteTotalCount?: number;
}
