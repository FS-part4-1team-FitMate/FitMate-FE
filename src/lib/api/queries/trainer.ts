import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { FavoriteInfo, Trainer, TrainerParams, TrainerResult } from "@/types/trainer";
import { ProfileData } from "@/types/types";
import { getFavoriteTrainers, getTrainerInfo, getTrainerList } from "../trainerService";
import { getFavorite } from "../userService";

// 트레이너 목록 조회
export const useGetTrainerList = ({ keyword, order, sort, lessonType, gender }: TrainerParams) => {
  return useInfiniteQuery<TrainerResult>(
    ["trainer-list", { keyword, order, sort, lessonType, gender }],
    ({ pageParam = 1 }) =>
      getTrainerList({
        page: pageParam,
        limit: 5,
        keyword,
        order,
        sort,
        lessonType,
        gender,
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.hasMore ? allPages.length + 1 : undefined;
      },
    },
  );
};

// 트레이너 프로필 조회
export const useGetTrainer = (trainerId: string) => {
  return useQuery<ProfileData>(["trainer-info", trainerId], () => getTrainerInfo(trainerId), {
    enabled: !!trainerId,
    cacheTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });
};

// 찜한 강사 목록 조회
export const useGetFavoriteTrainer = (
  userId: string,
  { page, limit }: { page: number; limit: number },
) => {
  return useQuery<Trainer[]>(
    ["favorited-trainer", userId],
    () => getFavoriteTrainers({ page, limit }),
    {
      enabled: !!userId,
      cacheTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    },
  );
};

// 트레이너 좋아요 정보 조회
export const useGetFavoriteInfo = (trainerId: string) => {
  return useQuery<FavoriteInfo>(["favorite", trainerId], () => getFavorite(trainerId), {
    enabled: !!trainerId,
    cacheTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });
};
