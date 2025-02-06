import { useQuery } from "@tanstack/react-query";
import { FavoriteInfo, Profile } from "@/types/trainer";
import { getTrainerInfo } from "../trainerService";
import { getFavorite } from "../userService";

// 트레이너 프로필 조회
export const useGetTrainer = (trainerId: string) => {
  return useQuery<Profile>(["trainer-info", trainerId], () => getTrainerInfo(trainerId), {
    enabled: !!trainerId,
  });
};

// 트레이너 좋아요 정보 조회
export const useGetFavoriteInfo = (trainerId: string) => {
  return useQuery<FavoriteInfo>(["favorite", trainerId], () => getFavorite(trainerId), {
    enabled: !!trainerId,
  });
};
