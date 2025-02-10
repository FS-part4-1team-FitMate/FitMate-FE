import Link from "next/link";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroller";
import { useGetMyLessonList } from "@/lib/api/queries/lesson";
import { Lesson } from "@/types/lesson";
import PastLessonCard from "@/components/Cards/PastLessonCard";
import Button from "@/components/Common/Button";
import { HorizontalLine } from "@/components/Common/Line";
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
    return (
      <div className="flex flex-col items-center gap-16 w-full h-screen m-auto py-16 pc:max-w-[80rem] tablet:max-w-[74.5rem] mobile:max-w-[37.5rem]">
        <div className="flex flex-col gap-4 p-[8rem]">
          <svg
            width="200"
            height="200"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="15.7279"
              cy="16.9492"
              r="8"
              transform="rotate(-45 15.7279 16.9492)"
              stroke="#4DA9FF"
              stroke-width="2"
            />
            <path
              d="M22.4243 23.4238L26.1242 27.1238"
              stroke="#4DA9FF"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <h1 className="text-gray-300 text-2xl font-bold text-nowrap">
            받았던 레슨 내역이 없습니다.
          </h1>
        </div>
        <HorizontalLine width="100%" />
        <div className="flex flex-col gap-8 w-full text-md font-regular pc:text-lg">
          <div className="flex justify-between items-center">
            <p>아직 레슨 요청을 하지 않으셨다면?</p>
            <Button className="hover:text-blue-300 hover:bg-blue-100 hover:border hover:border-blue-300 px-6 rounded-3xl text-md text-white font-semibold bg-blue-300">
              <Link href="/user/create-request">레슨 요청하러 가기</Link>
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <p>
              요청한 레슨에 <br className="pc:hidden tablet:hidden mobile:block" />
              강사님을 직접 지정하고 싶다면?
            </p>
            <Button className="hover:text-blue-300 hover:bg-blue-100 hover:border hover:border-blue-300 px-6 rounded-3xl text-md text-white font-semibold bg-blue-300">
              <Link href="/user/find-trainer">강사님 찾기</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
