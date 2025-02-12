import { NotificationContextType } from "@/contexts/NotificationProvider";
import { useRouter } from "next/router";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { InfiniteData } from "@tanstack/react-query";
import { useReadNotiMutation } from "@/lib/api/queries/notification";
import { NotiResult, Notification, NotificationType, notificationType_trans } from "@/types/notis";
import Button from "../Common/Button";

interface NotiProps {
  noti: Notification;
  onClick: () => void;
  children: React.ReactNode;
}

function Noti({ noti, onClick, children }: NotiProps) {
  const [isRead, setIsRead] = useState<boolean>(noti.isRead);

  return (
    <div
      className={isRead ? "text-slate-400 text-md my-[10px]" : "text-md my-[10px]"}
      onClick={() => {
        setIsRead((prev) => !prev);
        onClick();
      }}
    >
      {children}
    </div>
  );
}

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
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<NotificationType>(NotificationType.LESSON_QUOTE);
  const notiDataFlatted = notiData?.pages.flatMap((page) => page.list) ?? [];
  console.log("notiDataFlatted", notiDataFlatted);
  console.log("notifications.notifications", notifications.notifications);

  return (
    <div
      className={`absolute top-[30px] right-[-30px] w-[280px] bg-white border border-gray-300 rounded-xl p-[10px] text-lg z-10`}
    >
      <div className="flex justify-between items-center">
        <h3 className="inline-block text-lg m-0 p-0">알림</h3>
        <Button
          className="bg-slate-400 text-black-500 text-md"
          onClick={() => router.push(`/noti`)}
        >
          전체 보기
        </Button>
      </div>
      <div className="max-h-[300px] overflow-y-auto">
        <div className="flex gap-[20px] justify-normal items-center border-b-2 border-slate-400">
          <div
            className={
              currentTab === NotificationType.LESSON_QUOTE
                ? "border-b border-slate-950"
                : "text-slate-500"
            }
          >
            {notificationType_trans[NotificationType.LESSON_QUOTE]}
          </div>
          <div
            className={
              currentTab === NotificationType.CHAT_MESSAGE
                ? "border-b border-slate-950"
                : "text-slate-500"
            }
          >
            {notificationType_trans[NotificationType.CHAT_MESSAGE]}
          </div>
        </div>
        {notifications?.notifications
          .filter((noti) => noti.type === currentTab)
          .filter((noti) => !noti.isRead)
          .map((noti) => {
            return (
              <Noti
                key={noti.id}
                noti={noti}
                onClick={() => {
                  readNotiMutation.mutate(noti.id);
                }}
              >
                {noti.message}
              </Noti>
            );
          })}
        <InfiniteScroll hasMore={hasNextNotiPage} loadMore={fetchNextNotiPage}>
          {notiDataFlatted
            .filter((noti) => noti.type === currentTab)
            .filter((noti) => !noti.isRead)
            .map((noti) => {
              return (
                <Noti
                  key={noti.id}
                  noti={noti}
                  onClick={() => {
                    readNotiMutation.mutate(noti.id);
                  }}
                >
                  {noti.message}
                </Noti>
              );
            })}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Notifications;
