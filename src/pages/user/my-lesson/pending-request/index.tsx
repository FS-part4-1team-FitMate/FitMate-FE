import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroller";
import { useGetMyLessonList } from "@/lib/api/query/lesson";
import { MyLesson } from "@/types/lesson";
import PendingLessonCard from "@/components/Cards/PendingLessonCard";
import Loading from "@/components/Common/Loading";

export default function PendingRequest() {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } = useGetMyLessonList({
    limit: 4,
    status: "PENDING",
  });

  if (isLoading) return <Loading />;
  if (isError) return toast.error("대기중인 견적 목록을 불러오는 중 에러가 발생했어요! 😢");

  const pendingList = data?.pages?.flatMap((page) => page.list) ?? [];

  if (pendingList?.length > 0) {
    return (
      <>
        {pendingList?.map((item: MyLesson) => (
          <InfiniteScroll key={item.id} hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
            <div className="flex flex-col gap-[2.4rem] mx-auto mt-16 px-8 pc:grid pc:grid-cols-2 pc:gap-x-[2.4rem] pc:gap-y-[4.8rem] pc:max-w-[140rem] tablet:max-w-[64rem] mobile:max-w-[36.7rem]">
              {item.lessonQuotes.map((quote) => (
                <PendingLessonCard key={quote.id} item={item} quote={quote} />
              ))}
            </div>
          </InfiniteScroll>
        ))}
      </>
    );
  }

  if (pendingList?.length === 0) {
    /** @TODO UI 변경할 예정 */
    return (
      <div className="flex justify-center items-center h-full">
        <p className="p-32 text-2xl">대기중인 견적이 없습니다.</p>
      </div>
    );
  }
}
