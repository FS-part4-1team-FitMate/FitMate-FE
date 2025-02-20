import { useUser } from "@/contexts/UserProvider";
import Head from "next/head";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroller";
import { useGetMyLessonList } from "@/lib/api/queries/lesson";
import { Lesson } from "@/types/lesson";
import PastLessonCard from "@/components/Cards/PastLessonCard";
import EmptyLesson from "@/components/Common/EmptyLesson";
import Loading from "@/components/Common/Loading";

export default function PastLesson() {
  const user = useUser();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(user?.id ?? null);
  }, [user]);

  const { data, isLoading, isError, hasNextPage, fetchNextPage } = useGetMyLessonList(
    userId || "",
    {
      limit: 2,
      status: "COMPLETED",
    },
  );

  const pastList = data?.pages?.flatMap((page) => page.list) ?? [];

  if (isLoading) return <Loading />;
  if (isError) return toast.error("받았던 레슨 정보를 불러오는 중 에러가 발생했어요! 😢");

  return (
    <>
      <Head>
        <title>받았던 레슨 | 핏메이트</title>
      </Head>
      {pastList.length > 0 ? (
        <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
          <div className="flex flex-col gap-16 max-w-[192rem] m-auto py-16 bg-bg-100 pc:py-[6.4rem] pc:px-16 tablet:px-16 mobile:px-0">
            {pastList?.map((item: Lesson) => <PastLessonCard key={item.id} myLesson={item} />)}
          </div>
        </InfiniteScroll>
      ) : (
        <EmptyLesson message="받았던 레슨 내역이 없습니다." />
      )}
    </>
  );
}
