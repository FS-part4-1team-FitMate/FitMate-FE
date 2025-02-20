import { useUser } from "@/contexts/UserProvider";
import Head from "next/head";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroller";
import { useCancelLesson, useGetMyLessonList } from "@/lib/api/queries/lesson";
import { Lesson } from "@/types/lesson";
import Button from "@/components/Common/Button";
import EmptyLesson from "@/components/Common/EmptyLesson";
import Loading from "@/components/Common/Loading";
import QuoteInfo from "@/components/Common/QuoteInfo";

export default function LessonHistory() {
  const user = useUser();
  const [userId, setUserId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("PENDING");
  const [activeTab, setActiveTab] = useState<string>(status);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const tabs = [
    { label: "대기중인 레슨", value: "PENDING" },
    { label: "만료된 레슨", value: "EXPIRED" },
    { label: "취소된 레슨", value: "CANCELED" },
  ];

  useEffect(() => {
    setUserId(user?.id ?? null);
  }, [user]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setStatus(tab);
  };

  const { data, isLoading, isError, hasNextPage, fetchNextPage } = useGetMyLessonList(
    userId || "",
    {
      limit: 3,
      status,
    },
  );

  const cancelLesson = useCancelLesson();
  const handleCancel = (lessonId: string) => {
    if (lessonId) {
      cancelLesson.mutate(lessonId);
    }
  };

  const myLessonList = data?.pages?.flatMap((page) => page.list) ?? [];
  console.log(myLessonList);
  if (isLoading) return <Loading />;
  if (isError) return toast.error("레슨 내역을 불러오는 중 에러가 발생했어요! 😢");

  const handleShowList = () => {
    if (activeTab === status) {
      return myLessonList.length > 0 ? (
        <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
          <div className="flex flex-col gap-8 w-full">
            {myLessonList.map((lesson: Lesson) => (
              <div
                key={lesson.id}
                className="flex flex-col p-8 pc:p-16 border border-line-200 rounded-[1.6rem] bg-white shadow-card"
              >
                <QuoteInfo lesson={lesson} />
                {status === "PENDING" && (
                  <Button
                    onClick={() => handleCancel(lesson.id)}
                    className="hover:bg-red-200 hover:text-red-100 my-8 mx-16 px-8 border border-red-200 bg-red-100 text-red-200 font-semibold pc:mx-[30rem] tablet:mx-[20rem]"
                  >
                    레슨 요청 취소
                  </Button>
                )}
              </div>
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <EmptyLesson message="해당 레슨 내역이 없습니다." />
      );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-bg-100 pc:flex-row">
      <Head>
        <title>레슨 내역 | 핏메이트</title>
      </Head>
      <div className="flex flex-row items-start gap-4 border-b border-line-100 bg-white shadow-card pc:flex-col pc:p-8 pc:border-r">
        {tabs.map((tab) => (
          <Button
            key={tab.value}
            className={`hover:bg-gray-100 w-full rounded-none text-nowrap pc:p-8 pc:text-2lg tablet:text-lg mobile:text-sm ${activeTab === tab.value ? "text-black-400 font-bold" : "text-gray-400 font-semibold"}`}
            onClick={() => handleTabClick(tab.value)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <div className="flex flex-col gap-4 flex-grow p-4 pc:p-8">
        <div
          className="relative flex justify-center items-center w-12 h-12 p-4 border border-red-200 rounded-full text-red-200 text-md font-semibold bg-red-100"
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          !
          {isVisible && (
            <div className="absolute top-full left-full w-fit py-2 px-4 border border-red-200 rounded-tr-xl rounded-b-xl text-nowrap text-red-200 font-regular bg-red-100 pc:text-lg tablet:text-md mobile:text-xs">
              레슨 시작일 전날까지 견적을 확정하지 않으면 요청이 만료되니,
              <br className="block pc:hidden tablet:hidden" />이 점 유의하시기 바랍니다!
            </div>
          )}
        </div>
        {handleShowList()}
      </div>
    </div>
  );
}
