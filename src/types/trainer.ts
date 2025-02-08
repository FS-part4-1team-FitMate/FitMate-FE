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
    name?: string | null;
    phone?: string | null;
    profileImage?: string | FileList | null;
    profileImageCount?: number;
    contentType?: string;
    gender: Gender;
    lessonType: LessonType[];
    locationType: LocationType[];
    region: Region[];
    intro?: string | null;
    description?: string | null;
    experience?: number | null;
    certification?: string | FileList | null;
    certificationCount?: number;
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
