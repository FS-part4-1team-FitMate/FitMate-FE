import { useNotifications } from "@/contexts/NotificationProvider";
import { useUser } from "@/contexts/UserProvider";
import { ic_noti_empty, ic_red_dot } from "@/imageExports";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useGetNotiList, useReadNotiMutation } from "@/lib/api/queries/notification";
import { NotificationType, notificationType_trans } from "@/types/notis";
import EmptyNotification from "@/components/GNB/EmptyNotification";
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
  const notiContext = useNotifications();
  const {
    data: notiData,
    fetchNextPage: fetchNextNotiPage,
    hasNextPage: hasNextNotiPage,
    isLoading: isNotiLoading,
    isError: isNotiError,
  } = useGetNotiList(user?.id!, { page: 1, limit: 5, order: "created_at", sort: "desc" });
  const readNotiMutation = useReadNotiMutation(notiContext);
  const router = useRouter();
  const { query } = router;
  const [hasNoti_LESSON_QUOTE, setHasNoti_LESSON_QUOTE] = useState<boolean>(true);
  const [hasNoti_CHAT_MESSAGE, setHasNoti_CHAT_MESSAGE] = useState<boolean>(true);
  const [hasNoti_LESSON_QUOTE_FULL, setHasNoti_LESSON_QUOTE_FULL] = useState<boolean>(true);
  const [hasNoti_CHAT_MESSAGE_FULL, setHasNoti_CHAT_MESSAGE_FULL] = useState<boolean>(true);
  let notiDataFlatted = notiData?.pages.flatMap((page) => page.list) ?? [];

  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: { type: currentTab },
    });
  }, [currentTab]);

  useEffect(() => {
    setCurrentTab(query.type as NotificationType);
  }, [query.type]);

  useEffect(() => {
    const notiSet = new Set<number>();
    notiDataFlatted = notiDataFlatted.filter((noti) => {
      const alreadyHasNoti = notiSet.has(noti.id);
      notiSet.add(noti.id);
      return !alreadyHasNoti;
    });
    notiContext.setNotifications(
      notiContext.notifications.filter((noti) => {
        const alreadyHasNoti = notiSet.has(noti.id);
        notiSet.add(noti.id);
        return !alreadyHasNoti;
      }),
    );
    setHasNoti_LESSON_QUOTE(
      notiDataFlatted
        .filter((noti) => noti.type === NotificationType.LESSON_QUOTE)
        .filter((noti) => !noti.isRead).length > 0 ||
        notiContext?.notifications
          .filter((noti) => noti.type === NotificationType.LESSON_QUOTE)
          .filter((noti) => !noti.isRead).length > 0,
    );
    setHasNoti_LESSON_QUOTE_FULL(
      notiDataFlatted.filter((noti) => noti.type === NotificationType.LESSON_QUOTE).length > 0 ||
        notiContext?.notifications.filter((noti) => noti.type === NotificationType.LESSON_QUOTE)
          .length > 0,
    );
    setHasNoti_CHAT_MESSAGE(
      notiDataFlatted
        .filter((noti) => noti.type === NotificationType.CHAT_MESSAGE)
        .filter((noti) => !noti.isRead).length > 0 ||
        notiContext?.notifications
          .filter((noti) => noti.type === NotificationType.CHAT_MESSAGE)
          .filter((noti) => !noti.isRead).length > 0,
    );
    setHasNoti_CHAT_MESSAGE_FULL(
      notiDataFlatted.filter((noti) => noti.type === NotificationType.CHAT_MESSAGE).length > 0 ||
        notiContext?.notifications.filter((noti) => noti.type === NotificationType.CHAT_MESSAGE)
          .length > 0,
    );
  }, [notiDataFlatted, notiContext?.notifications]);

  return (
    <main className="flex flex-col w-full h-screen mx-auto p-8 bg-bg-200">
      <Head>
        <title>알림 페이지</title>
      </Head>
      <div className="flex flex-col gap-6 max-w-[80rem] w-full mx-auto p-16 border border-line-200 rounded-[2rem] bg-white shadow-card">
        <div className="flex justify-between items-center">
          <h1 className="border border-yellow-100 rounded-full text-orange-400 text-2xl font-semibold bg-yellow-50 m-0 py-2 px-8">
            알림
          </h1>
        </div>
        <div className="flex gap-[20px] justify-normal items-center border-b-2 border-yellow-400 text-xl">
          <div className="flex justify-normal items-start">
            <div
              className={`${
                currentTab === NotificationType.LESSON_QUOTE
                  ? "border-b border-orange-400 font-semibold"
                  : "text-gray-300"
              } cursor-pointer`}
              onClick={() => {
                // router.push(`/noti?type=${NotificationType.LESSON_QUOTE}`, undefined, {
                //   shallow: true,
                // });
                setCurrentTab(NotificationType.LESSON_QUOTE);
              }}
            >
              {notificationType_trans[NotificationType.LESSON_QUOTE]}
            </div>
            {hasNoti_LESSON_QUOTE && <Image width={4} height={4} src={ic_red_dot} alt="red dot" />}
          </div>
          <div className="flex justify-normal items-start">
            <div
              className={`${
                currentTab === NotificationType.CHAT_MESSAGE
                  ? "border-b border-orange-400 font-semibold"
                  : "text-gray-300"
              } cursor-pointer`}
              onClick={() => {
                // router.push(`/noti?type=${NotificationType.CHAT_MESSAGE}`, undefined, {
                //   shallow: true,
                // });
                setCurrentTab(NotificationType.CHAT_MESSAGE);
              }}
            >
              {notificationType_trans[NotificationType.CHAT_MESSAGE]}
            </div>
            {hasNoti_CHAT_MESSAGE && <Image width={4} height={4} src={ic_red_dot} alt="red dot" />}
          </div>
        </div>
        <div className="w-full text-2lg">
          {currentTab === NotificationType.CHAT_MESSAGE && !hasNoti_CHAT_MESSAGE_FULL && (
            <EmptyNotification newNoti={false} message="메시지" />
          )}
          {currentTab === NotificationType.LESSON_QUOTE && !hasNoti_LESSON_QUOTE_FULL && (
            <EmptyNotification newNoti={false} message="견적" />
          )}
          {notiContext?.notifications
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
      </div>
    </main>
  );
}

export default Noti;
