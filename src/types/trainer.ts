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

export interface FavoriteInfo {
  isFavorite?: boolean;
  favoriteTotalCount?: number;
}
