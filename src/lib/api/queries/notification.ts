import { useInfiniteQuery } from "@tanstack/react-query";
import { NotiParams, NotiResult } from "@/types/notis";
import { getNotiList } from "../notiService";

export const useGetNotiList = (userId: string, { page, limit, order, sort }: NotiParams) => {
  return useInfiniteQuery<NotiResult>(
    ["trainer-list", userId],
    ({ pageParam = 1 }) =>
      getNotiList({
        page: pageParam,
        limit,
        order,
        sort,
      }),
    {
      enabled: !!userId,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.hasMore ? allPages.length + 1 : undefined;
      },
      cacheTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    },
  );
};
