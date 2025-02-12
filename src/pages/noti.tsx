import { useNotifications } from "@/contexts/NotificationProvider";
import { useUser } from "@/contexts/UserProvider";
import { ic_red_dot } from "@/imageExports";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useGetNotiList, useReadNotiMutation } from "@/lib/api/queries/notification";
import { NotificationType, notificationType_trans } from "@/types/notis";
import { SingleNoti } from "@/components/GNB/Notifications";

interface QueryParams {
  type?: NotificationType;
}

interface PageProps {
  initialQuery: QueryParams;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const { type = "" } = context.query;

  return {
    props: {
      initialQuery: {
        type: type as NotificationType,
      },
    },
  };
};

function Noti({ initialQuery }: PageProps) {
  const user = useUser();
  const [currentTab, setCurrentTab] = useState<NotificationType>(initialQuery.type!);
  const {
    data: notiData,
    fetchNextPage: fetchNextNotiPage,
    hasNextPage: hasNextNotiPage,
    isLoading: isNotiLoading,
    isError: isNotiError,
  } = useGetNotiList(user?.id!, { page: 1, limit: 5, order: "created_at", sort: "desc" });
  const notifications = useNotifications();
  const readNotiMutation = useReadNotiMutation();
  const router = useRouter();
  const [hasNoti_LESSON_QUOTE, setHasNoti_LESSON_QUOTE] = useState<boolean>(true);
  const [hasNoti_CHAT_MESSAGE, setHasNoti_CHAT_MESSAGE] = useState<boolean>(true);
  const notiDataFlatted = notiData?.pages.flatMap((page) => page.list) ?? [];

  useEffect(() => {
    setHasNoti_LESSON_QUOTE(
      notiDataFlatted
        .filter((noti) => noti.type === NotificationType.LESSON_QUOTE)
        .filter((noti) => !noti.isRead).length > 0 ||
        notifications?.notifications
          .filter((noti) => noti.type === NotificationType.LESSON_QUOTE)
          .filter((noti) => !noti.isRead).length > 0,
    );
    setHasNoti_CHAT_MESSAGE(
      notiDataFlatted
        .filter((noti) => noti.type === NotificationType.CHAT_MESSAGE)
        .filter((noti) => !noti.isRead).length > 0 ||
        notifications?.notifications
          .filter((noti) => noti.type === NotificationType.CHAT_MESSAGE)
          .filter((noti) => !noti.isRead).length > 0,
    );
  }, [notiDataFlatted, notifications?.notifications]);

  return (
    <main className="flex flex-col justify-normal items-start gap-[16px] w-full max-w-[800px] mx-auto p-[12px]">
      <Head>
        <title>알림 페이지</title>
      </Head>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold m-0 p-0">알림</h1>
      </div>
      <div className="flex gap-[20px] justify-normal items-center border-b-2 border-slate-400 text-xl">
        <div className="flex justify-normal items-start">
          <div
            className={
              currentTab === NotificationType.LESSON_QUOTE
                ? "border-b border-slate-950"
                : "text-slate-500"
            }
            onClick={() => {
              router.push(`/noti?type=${NotificationType.LESSON_QUOTE}`, undefined, {
                shallow: true,
              });
              setCurrentTab(NotificationType.LESSON_QUOTE);
            }}
          >
            {notificationType_trans[NotificationType.LESSON_QUOTE]}
          </div>
          {hasNoti_LESSON_QUOTE && <Image width={4} height={4} src={ic_red_dot} alt="red dot" />}
        </div>
        <div className="flex justify-normal items-start">
          <div
            className={
              currentTab === NotificationType.CHAT_MESSAGE
                ? "border-b border-slate-950"
                : "text-slate-500"
            }
            onClick={() => {
              router.push(`/noti?type=${NotificationType.LESSON_QUOTE}`, undefined, {
                shallow: true,
              });
              setCurrentTab(NotificationType.CHAT_MESSAGE);
            }}
          >
            {notificationType_trans[NotificationType.CHAT_MESSAGE]}
          </div>
          {hasNoti_CHAT_MESSAGE && <Image width={4} height={4} src={ic_red_dot} alt="red dot" />}
        </div>
      </div>
      <div className="text-2lg">
        {notifications?.notifications
          .filter((noti) => noti.type === currentTab)
          .map((noti) => {
            return <SingleNoti key={noti.id} noti={noti} readNotiMutation={readNotiMutation} />;
          })}
        <InfiniteScroll hasMore={hasNextNotiPage} loadMore={() => fetchNextNotiPage()}>
          {notiDataFlatted
            .filter((noti) => noti.type === currentTab)
            .map((noti) => {
              return <SingleNoti key={noti.id} noti={noti} readNotiMutation={readNotiMutation} />;
            })}
        </InfiniteScroll>
      </div>
    </main>
  );
}

export default Noti;
