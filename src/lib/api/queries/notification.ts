import { NotificationContextType } from "@/contexts/NotificationProvider";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NotiParams, NotiResult } from "@/types/notis";
import { getNotiList, readNoti } from "../notiService";

export const useGetNotiList = (userId: string, { page, limit, order, sort }: NotiParams) => {
  return useInfiniteQuery<NotiResult>(
    ["notifications", userId],
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

let readNotiTimeout: NodeJS.Timeout;

export const useReadNotiMutation = (notiContext: NotificationContextType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notiId: number) => readNoti(notiId),
    onSuccess: () => {
      clearTimeout(readNotiTimeout);
      readNotiTimeout = setTimeout(() => {
        notiContext.clearNotifications();
        queryClient.invalidateQueries(["notifications"]);
      }, 2000);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
