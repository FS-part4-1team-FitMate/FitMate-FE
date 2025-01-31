import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyLessonRequest } from "@/lib/api/lessonService";
import { MyLesson, MyLessonResult } from "@/types/lesson";
import PendingLessonCard from "@/components/Cards/PendingLessonCard";
import Loading from "@/components/Common/Loading";

export default function PendingRequest() {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } = useInfiniteQuery<MyLessonResult>(
    ["pending-list"],
    ({ pageParam = 1 }) =>
      getMyLessonRequest({
        page: pageParam,
        limit: 4,
        status: "PENDING",
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.hasMore ? allPages.length + 1 : undefined;
      },
    },
  );

  const pendingList = data?.pages?.flatMap((page) => page.list) ?? [];

  if (isError) return <div>error!</div>;

  if (isLoading || pendingList?.length > 0) {
    return (
      <div>
        <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
          {pendingList?.map((item: MyLesson) => (
            <div
              key={item.id}
              className="flex flex-col gap-[2.4rem] mx-auto mt-16 px-8 pc:grid pc:grid-cols-2 pc:gap-x-[2.4rem] pc:gap-y-[4.8rem] pc:max-w-[140rem] tablet:max-w-[64rem] mobile:max-w-[36.7rem]"
            >
              {item.lessonQuotes.map((quote) => (
                <PendingLessonCard key={quote.id} item={item} quote={quote} />
              ))}
            </div>
          ))}
        </InfiniteScroll>
        {isLoading && <Loading />}
      </div>
    );
  } else {
    /** @TODO UI 변경할 예정 */
    return (
      <div className="flex justify-center items-center h-full">
        <p className="p-32 text-2xl">대기중인 견적이 없습니다.</p>
      </div>
    );
  }
}
