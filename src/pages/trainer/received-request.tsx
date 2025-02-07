import clsx from "clsx";
import { useState } from "react";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroller";
import { useGetReceivedLesson } from "@/lib/api/queries/lesson";
import { FilterCheck, LessonParams } from "@/types/lesson";
import RequestLessonCard from "@/components/Cards/RequestLessonCard";
import Loading from "@/components/Common/Loading";
import Title from "@/components/Common/Title";
import MobileFilter from "@/components/Modal/MobileFilter";
import LessonFilter from "@/components/ReceivedRequest/LessonFilter";
import ListHeader from "@/components/ReceivedRequest/ListHeader";

export default function ReceivedRequest() {
  const [isModalopen, setIsModalOpen] = useState<boolean>(false);
  const [params, setParams] = useState<LessonParams>({
    order: "lesson_time",
    sort: "asc",
    lesson_type: "",
    gender: "",
    region: "",
    has_direct_quote: false,
    keyword: "",
  });

  const [checked, setChecked] = useState<FilterCheck>({
    lessonType: {
      SPORTS: true,
      REHAB: true,
      FITNESS: true,
    },
    gender: {
      MALE: true,
      FEMALE: true,
    },
    isDirectQuote: {
      NORMAL: true,
      DIRECT: true,
    },
    region: {
      SEOUL: true,
      GYEONGGI: true,
      INCHEON: true,
      DAEJEON: true,
      DAEGU: true,
      ULSAN: true,
      BUSAN: true,
      GWANGJU: true,
      SEJONG: true,
      GANGWON: true,
      CHUNGBUK: true,
      CHUNGNAM: true,
      JEONBUK: true,
      JEONNAM: true,
      GYEONGBUK: true,
      GYEONGNAM: true,
      JEJU: true,
    },
  });

  const { data, isLoading, isError, hasNextPage, fetchNextPage } = useGetReceivedLesson({
    keyword: params.keyword,
    order: params.order,
    sort: params.sort,
    lesson_type: params.lesson_type || undefined,
    gender: params.gender || undefined,
    region: params.region || undefined,
    has_direct_quote: params.has_direct_quote || undefined,
  });

  if (isLoading) return <Loading />;
  if (isError) return toast.error("레슨 요청 목록을 불러오는 중 에러가 발생했어요! 😢");

  const result = data?.pages[0];
  const receivedList = data?.pages.flatMap((page) => page.list) ?? [];
  const totalCount = data?.pages[0]?.totalCount ?? 0;

  const count = {
    SPORTS: result?.lessonTypeCounts.SPORTS || 0,
    FITNESS: result?.lessonTypeCounts.FITNESS || 0,
    REHAB: result?.lessonTypeCounts.REHAB || 0,
    MALE: result?.genderCounts?.male || 0,
    FEMALE: result?.genderCounts?.female || 0,
    NORMAL: result?.totalCount - result?.directQuoteRequestCount || 0,
    DIRECT: result?.directQuoteRequestCount || 0,
  };

  return (
    <div className="flex flex-col gap-[2.4rem] max-w-[192rem] m-auto">
      <Title title="받은 요청" />
      <div
        className={clsx(
          "flex flex-col w-full mx-auto py-[2.4rem] px-8",
          "pc:flex-row pc:gap-[10rem] pc:max-w-[140rem] tablet:max-w-[74.4rem] mobile:max-w-[37.5rem]",
        )}
      >
        <div className="flex flex-col gap-[4.6rem]">
          <LessonFilter
            count={count}
            setParams={setParams}
            checked={checked}
            setChecked={setChecked}
          />
        </div>
        <div className="flex flex-col gap-[3.2rem] w-full">
          <ListHeader
            totalCount={totalCount}
            setIsModalOpen={setIsModalOpen}
            setParams={setParams}
          />
          <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
            {receivedList.map((item) => (
              <div className="flex flex-col gap-[4.8rem]" key={item.id}>
                <RequestLessonCard item={item} />
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
      {isModalopen && (
        <MobileFilter
          setParams={setParams}
          closeModal={() => setIsModalOpen(false)}
          count={count}
          checked={checked}
          setChecked={setChecked}
        />
      )}
    </div>
  );
}
