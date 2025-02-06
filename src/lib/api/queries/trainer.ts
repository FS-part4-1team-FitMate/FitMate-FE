import { useQuery } from "@tanstack/react-query";
import { FavoriteInfo, Profile } from "@/types/trainer";
import { getTrainerInfo } from "../trainerService";
import { getFavorite } from "../userService";

export const useGetTrainer = (trainerId: string) => {
  return useQuery<Profile>(["trainer-info", trainerId], () => getTrainerInfo(trainerId), {
    enabled: !!trainerId,
  });
};

export const useGetFavoriteInfo = (trainerId: string) => {
  return useQuery<FavoriteInfo>(["favorite", trainerId], () => getFavorite(trainerId), {
    enabled: !!trainerId,
  });
};
