import { img_non_review_md } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
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

// prettier-ignore
const regions = [
  'SEOUL', 'GYEONGGI', 'INCHEON', 'DAEJEON', 'DAEGU', 'ULSAN', 'BUSAN',
  'GWANGJU', 'SEJONG', 'GANGWON', 'CHUNGBUK', 'CHUNGNAM', 'JEONBUK',
  'JEONNAM', 'GYEONGBUK', 'GYEONGNAM', 'JEJU'
];

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
    region: Object.fromEntries(regions.map((region) => [region, true])),
  });

  const { data, isLoading, isError, hasNextPage, fetchNextPage } = useGetReceivedLesson({
    keyword: params.keyword,
    order: params.order,
    sort: params.sort,
    status: "PENDING",
    lesson_type: params.lesson_type || undefined,
    gender: params.gender || undefined,
    region: params.region || undefined,
    has_direct_quote: params.has_direct_quote || undefined,
  });

  if (isLoading) return <Loading />;
  if (isError) return toast.error("레슨 요청 목록을 불러오는 중 에러가 발생했어요! 😢");

  const receivedList = data?.pages.flatMap((page) => page.list) ?? [];
  const totalCount = data?.pages[0]?.totalCount ?? 0;

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
          <LessonFilter setParams={setParams} checked={checked} setChecked={setChecked} />
        </div>
        <div className="flex flex-col gap-[3.2rem] w-full">
          <ListHeader
            totalCount={totalCount}
            setIsModalOpen={setIsModalOpen}
            setParams={setParams}
          />
          <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
            {receivedList.length > 0 ? (
              receivedList.map((item) => {
                return (
                  <div className="flex flex-col gap-[4.8rem]" key={item.id}>
                    <RequestLessonCard item={item} />
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col justify-center items-center gap-[2.4rem] py-[24rem] px-[8rem]">
                <Image src={img_non_review_md} alt="non-request" />
                <h1 className="text-gray-400 text-lg font-regular">등록된 요청이 없어요!</h1>
              </div>
            )}
          </InfiniteScroll>
        </div>
      </div>
      {isModalopen && (
        <MobileFilter
          setParams={setParams}
          closeModal={() => setIsModalOpen(false)}
          checked={checked}
          setChecked={setChecked}
        />
      )}
    </div>
  );
}
