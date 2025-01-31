import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyLessonRequest } from "@/lib/api/lessonService";
import { MyLesson, MyLessonResult } from "@/types/lesson";
import PastLessonCard from "@/components/Cards/PastLessonCard";
import Loading from "@/components/Common/Loading";

export default function PastLesson() {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } = useInfiniteQuery<MyLessonResult>(
    ["past-list"],
    ({ pageParam = 1 }) =>
      getMyLessonRequest({
        page: pageParam,
        limit: 2,
        status: "COMPLETED",
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.hasMore ? allPages.length + 1 : undefined;
      },
    },
  );

  const pastList = data?.pages?.flatMap((page) => page.list) ?? [];

  if (isLoading) return <Loading />;
  if (isError) return <div>error!</div>;

  if (pastList.length > 0) {
    return (
      <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
        <div className="flex flex-col gap-16 max-w-[192rem] m-auto py-16 bg-bg-100 pc:py-[6.4rem] pc:px-16 tablet:px-16 mobile:px-0">
          {pastList?.map((item: MyLesson) => <PastLessonCard key={item.id} myLesson={item} />)}
        </div>
      </InfiniteScroll>
    );
  } else {
    /** @TODO UI 변경할 예정 */
    return (
      <div className="flex justify-center items-center h-full">
        <p className="p-32 text-2xl">완료된 레슨이 없습니다.</p>
      </div>
    );
  }
}
