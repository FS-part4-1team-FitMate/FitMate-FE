import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { FavoriteInfo, Profile, Trainer, TrainerParams, TrainerResult } from "@/types/trainer";
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
  return useQuery<Profile>(["trainer-info", trainerId], () => getTrainerInfo(trainerId), {
    enabled: !!trainerId,
  });
};

// 찜한 강사 목록 조회
export const useGetFavoriteTrainer = (userId: string) => {
  return useQuery<Trainer[]>(["favorited-trainer", userId], () => getFavoriteTrainers(), {
    enabled: !!userId,
  });
};

// 트레이너 좋아요 정보 조회
export const useGetFavoriteInfo = (trainerId: string) => {
  return useQuery<FavoriteInfo>(["favorite", trainerId], () => getFavorite(trainerId), {
    enabled: !!trainerId,
  });
};
