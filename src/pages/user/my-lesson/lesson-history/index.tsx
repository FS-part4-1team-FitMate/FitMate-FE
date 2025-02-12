import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroller";
import { useGetMyLessonList } from "@/lib/api/queries/lesson";
import { Lesson } from "@/types/lesson";
import Button from "@/components/Common/Button";
import EmptyLesson from "@/components/Common/EmptyLesson";
import Loading from "@/components/Common/Loading";
import QuoteInfo from "@/components/Common/QuoteInfo";

export default function LessonHistory() {
  const [userId, setUserId] = useState<string>("");
  const [status, setStatus] = useState<string>("PENDING");
  const [activeTab, setActiveTab] = useState<string>(status);
  const tabs = [
    { label: "대기중인 레슨", value: "PENDING" },
    { label: "만료된 레슨", value: "EXPIRED" },
  ];

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUserId(parsedData?.user?.id);
    }
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setStatus(tab);
  };

  const { data, isLoading, isError, hasNextPage, fetchNextPage } = useGetMyLessonList(userId, {
    limit: 3,
    status,
  });

  const myLessonList = data?.pages?.flatMap((page) => page.list) ?? [];

  if (isLoading) return <Loading />;
  if (isError) return toast.error("레슨 내역을 불러오는 중 에러가 발생했어요! 😢");

  const handleShowList = () => {
    if (activeTab === status) {
      return myLessonList.length > 0 ? (
        <InfiniteScroll
          className="flex-grow"
          hasMore={hasNextPage}
          loadMore={() => fetchNextPage()}
        >
          <div className="flex flex-col gap-8 w-full p-4 pc:p-8">
            {myLessonList.map((lesson: Lesson) => (
              <div
                key={lesson.id}
                className="p-8 pc:p-16 border border-line-200 rounded-[1.6rem] bg-white shadow-card"
              >
                <QuoteInfo lesson={lesson} />
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
      {handleShowList()}
    </div>
  );
}
