import { useQuery } from "@tanstack/react-query";
import { ProfileData } from "@/types/types";
import { getUserInfo } from "../userService";

// 유저 프로필 조회
export const useGetUser = (userId: string) => {
  return useQuery<ProfileData>(["user-info", userId], () => getUserInfo(userId), {
    enabled: !!userId,
    cacheTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });
};
