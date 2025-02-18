import { NotificationContextType } from "@/contexts/NotificationProvider";
import { ic_red_dot } from "@/imageExports";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { InfiniteData } from "@tanstack/react-query";
import { useReadNotiMutation } from "@/lib/api/queries/notification";
import formatDateTime from "@/lib/utils/formatDateTime";
import { NotiResult, Notification, NotificationType, notificationType_trans } from "@/types/notis";
import Button from "../Common/Button";
import EmptyNotification from "./EmptyNotification";

interface NotiProps {
  noti: Notification;
  readNotiMutation: ReturnType<typeof useReadNotiMutation>;
}

export function SingleNoti({ noti, readNotiMutation }: NotiProps) {
  const [isRead, setIsRead] = useState<boolean>(noti.isRead);

  useEffect(() => {
    setIsRead(noti.isRead);
  }, [noti]);

  return (
    <div
      className={`${isRead ? "text-slate-400 " : ""}hover:bg-bg-200 w-full text-md py-[10px] border-b border-slate-300`}
      onClick={() => {
        setIsRead((prev) => !prev);
        readNotiMutation.mutate(noti.id);
      }}
    >
      {noti.message}
      <br />
      <div className="text-right text-slate-500">{formatDateTime(noti.updatedAt)}</div>
    </div>
  );
}

interface NotificationsProps {
  notiData?: InfiniteData<NotiResult>;
  notiContext: NotificationContextType;
  hasNextNotiPage?: boolean;
  fetchNextNotiPage: () => void;
  readNotiMutation: ReturnType<typeof useReadNotiMutation>;
}

function Notifications({
  notiData,
  notiContext,
  hasNextNotiPage,
  fetchNextNotiPage,
  readNotiMutation,
}: NotificationsProps) {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<NotificationType>(NotificationType.LESSON_QUOTE);
  const [hasNoti_LESSON_QUOTE, setHasNoti_LESSON_QUOTE] = useState<boolean>(true);
  const [hasNoti_CHAT_MESSAGE, setHasNoti_CHAT_MESSAGE] = useState<boolean>(true);
  const notiDataFlatted = notiData?.pages.flatMap((page) => page.list) ?? [];

  useEffect(() => {
    setHasNoti_LESSON_QUOTE(
      notiDataFlatted
        .filter((noti) => noti.type === NotificationType.LESSON_QUOTE)
        .filter((noti) => !noti.isRead).length > 0 ||
        notiContext?.notifications
          .filter((noti) => noti.type === NotificationType.LESSON_QUOTE)
          .filter((noti) => !noti.isRead).length > 0,
    );
    setHasNoti_CHAT_MESSAGE(
      notiDataFlatted
        .filter((noti) => noti.type === NotificationType.CHAT_MESSAGE)
        .filter((noti) => !noti.isRead).length > 0 ||
        notiContext?.notifications
          .filter((noti) => noti.type === NotificationType.CHAT_MESSAGE)
          .filter((noti) => !noti.isRead).length > 0,
    );
  }, [notiDataFlatted, notiContext?.notifications]);

  return (
    <div
      className={`absolute top-[30px] right-[-30px] w-[280px] bg-white border border-gray-300 rounded-xl py-6 px-8 text-lg z-10`}
    >
      <div className="flex justify-between items-center py-2">
        <h3 className="inline-block text-2lg font-semibold m-0 p-0">알림</h3>
        <Button
          className="border border-yellow-100 bg-yellow-50 text-orange-400 text-md font-semibold px-[8px] py-[5px]"
          onClick={() => router.push(`/noti?type=${currentTab}`)}
        >
          전체 보기
        </Button>
      </div>
      <div>
        <div className="flex gap-[20px] justify-normal items-center border-b-2 border-yellow-400">
          <div className="flex justify-normal items-start">
            <div
              className={
                currentTab === NotificationType.LESSON_QUOTE
                  ? "border-b border-orange-400 font-semibold"
                  : "text-gray-300"
              }
              onClick={() => setCurrentTab(NotificationType.LESSON_QUOTE)}
            >
              {notificationType_trans[NotificationType.LESSON_QUOTE]}
            </div>
            {hasNoti_LESSON_QUOTE && <Image width={4} height={4} src={ic_red_dot} alt="red dot" />}
          </div>
          <div className="flex justify-normal items-start">
            <div
              className={
                currentTab === NotificationType.CHAT_MESSAGE
                  ? "border-b border-orange-400 font-semibold"
                  : "text-gray-300"
              }
              onClick={() => setCurrentTab(NotificationType.CHAT_MESSAGE)}
            >
              {notificationType_trans[NotificationType.CHAT_MESSAGE]}
            </div>
            {hasNoti_CHAT_MESSAGE && <Image width={4} height={4} src={ic_red_dot} alt="red dot" />}
          </div>
        </div>
        <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          {currentTab === NotificationType.CHAT_MESSAGE && !hasNoti_CHAT_MESSAGE && (
            <EmptyNotification message="메시지" />
          )}
          {currentTab === NotificationType.LESSON_QUOTE && !hasNoti_LESSON_QUOTE && (
            <EmptyNotification message="견적" />
          )}
          {notiContext?.notifications
            .filter((noti) => noti.type === currentTab)
            .filter((noti) => !noti.isRead)
            .map((noti) => {
              return <SingleNoti key={noti.id} noti={noti} readNotiMutation={readNotiMutation} />;
            })}
          <InfiniteScroll hasMore={hasNextNotiPage} loadMore={() => fetchNextNotiPage()}>
            {notiDataFlatted
              .filter((noti) => noti.type === currentTab)
              .filter((noti) => !noti.isRead)
              .map((noti) => {
                return <SingleNoti key={noti.id} noti={noti} readNotiMutation={readNotiMutation} />;
              })}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
