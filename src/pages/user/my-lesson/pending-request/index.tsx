import { useUser } from "@/contexts/UserProvider";
import Head from "next/head";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroller";
import { useGetMyLessonList } from "@/lib/api/queries/lesson";
import { Lesson } from "@/types/lesson";
import PendingLessonCard from "@/components/Cards/PendingLessonCard";
import EmptyLesson from "@/components/Common/EmptyLesson";
import Loading from "@/components/Common/Loading";

export default function PendingRequest() {
  const user = useUser();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(user?.id ?? null);
  }, [user]);

  const { data, isLoading, isError, hasNextPage, fetchNextPage } = useGetMyLessonList(
    userId || "",
    {
      limit: 4,
      status: "PENDING",
    },
  );
  console.log(data);

  if (isLoading) return <Loading />;
  if (isError) return toast.error("대기중인 견적 목록을 불러오는 중 에러가 발생했어요! 😢");

  const pendingList = data?.pages?.flatMap((page) => page.list) ?? [];

  return (
    <>
      <Head>
        <title>대기 중인 견적 | 핏메이트</title>
      </Head>
      {pendingList?.length > 0 ? (
        pendingList.map((item: Lesson) =>
          item.lessonQuotes?.length > 0 ? (
            <InfiniteScroll key={item.id} hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
              <div className="flex flex-col gap-[2.4rem] mx-auto my-16 px-8 pc:grid pc:grid-cols-2 pc:gap-x-[2.4rem] pc:gap-y-[4.8rem] pc:max-w-[140rem] tablet:max-w-[64rem] mobile:max-w-[36.7rem]">
                {item.lessonQuotes.map(
                  (quote) =>
                    quote.status === "PENDING" && (
                      <PendingLessonCard key={quote.id} item={item} quote={quote} />
                    ),
                )}
              </div>
            </InfiniteScroll>
          ) : (
            <EmptyLesson key={item.id} message="받은 견적이 없습니다." />
          ),
        )
      ) : (
        <EmptyLesson message="대기 중인 레슨이 없습니다." />
      )}
    </>
  );
}
