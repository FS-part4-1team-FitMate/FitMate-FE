import { NotificationContextType } from "@/contexts/NotificationProvider";
import InfiniteScroll from "react-infinite-scroller";
import { InfiniteData } from "@tanstack/react-query";
import { useReadNotiMutation } from "@/lib/api/queries/notification";
import { NotiResult } from "@/types/notis";

interface NotificationsProps {
  notiData?: InfiniteData<NotiResult>;
  notifications: NotificationContextType;
  hasNextNotiPage?: boolean;
  fetchNextNotiPage: () => void;
  readNotiMutation: ReturnType<typeof useReadNotiMutation>;
}

function Notifications({
  notiData,
  notifications,
  hasNextNotiPage,
  fetchNextNotiPage,
  readNotiMutation,
}: NotificationsProps) {
  const notiDataFlatted = notiData?.pages.flatMap((page) => page.list) ?? [];
  console.log("notiDataFlatted", notiDataFlatted);
  console.log("notifications.notifications", notifications.notifications);

  return (
    <div
      className={`absolute top-[30px] right-[-30px] w-[280px] bg-white border border-gray-300 rounded-xl p-[10px] text-lg z-10`}
    >
      <h3 className="text-lg m-0 p-0">알림</h3>
      {notifications.notifications.map((noti) => {
        return (
          <div
            key={noti.id}
            className={noti.isRead ? "text-slate-400 text-md my-[10px]" : "text-md my-[10px]"}
            onClick={() => {
              readNotiMutation.mutate(noti.id);
            }}
          >
            {noti.message}
          </div>
        );
      })}
      <InfiniteScroll hasMore={hasNextNotiPage} loadMore={fetchNextNotiPage}>
        {notiDataFlatted?.map((noti) => {
          return (
            <div
              key={noti.id}
              className="text-md my-[10px]"
              onClick={() => {
                readNotiMutation.mutate(noti.id);
              }}
            >
              {noti.message}
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}

export default Notifications;
