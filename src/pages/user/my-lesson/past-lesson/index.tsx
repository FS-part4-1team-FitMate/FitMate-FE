import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroller";
import { useGetMyLessonList } from "@/lib/api/queries/lesson";
import { Lesson } from "@/types/lesson";
import PastLessonCard from "@/components/Cards/PastLessonCard";
import Loading from "@/components/Common/Loading";

export default function PastLesson() {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } = useGetMyLessonList({
    limit: 2,
    status: "COMPLETED",
  });

  const pastList = data?.pages?.flatMap((page) => page.list) ?? [];

  if (isLoading) return <Loading />;
  if (isError) return toast.error("받았던 레슨 정보를 불러오는 중 에러가 발생했어요! 😢");

  if (pastList.length > 0) {
    return (
      <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
        <div className="flex flex-col gap-16 max-w-[192rem] m-auto py-16 bg-bg-100 pc:py-[6.4rem] pc:px-16 tablet:px-16 mobile:px-0">
          {pastList?.map((item: Lesson) => <PastLessonCard key={item.id} myLesson={item} />)}
        </div>
      </InfiniteScroll>
    );
  }

  if (pastList.length === 0) {
    /** @TODO UI 변경할 예정 */
    return (
      <div className="flex justify-center items-center h-full">
        <p className="p-32 text-2xl">완료된 레슨이 없습니다.</p>
      </div>
    );
  }
}
