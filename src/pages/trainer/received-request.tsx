import clsx from "clsx";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getReceiveRequest } from "@/lib/api/lessonService";
import { genderFilter, requestFilter, serviceFilter } from "@/types/dropdown";
import { LessonResult } from "@/types/lesson";
import { region_options } from "@/types/types";
import RequestLessonCard from "@/components/Cards/RequestLessonCard";
import Loading from "@/components/Common/Loading";
import Title from "@/components/Common/Title";
import MobileFilter from "@/components/Modal/MobileFilter";
import LessonFilter from "@/components/ReceivedRequest/LessonFilter";
import ListHeader from "@/components/ReceivedRequest/ListHeader";

export default function ReceivedRequest() {
  const [isModalopen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [order, setOrder] = useState<string>("start_date");
  const [sort, setSort] = useState<string>("asc");

  const [lessonType, setLessonType] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [isDirectQuote, setIsDirectQuote] = useState<boolean>(false);

  const [lessonTypeChecked, setLessonTypeChecked] = useState<boolean[]>(
    new Array(serviceFilter.length).fill(true),
  );
  const [genderChecked, setGenderChecked] = useState<boolean[]>(
    new Array(genderFilter.length).fill(true),
  );
  const [directChecked, setDirectChecked] = useState<boolean[]>(
    new Array(requestFilter.length).fill(false),
  );
  const [regionChecked, setRegionChecked] = useState<boolean[]>(
    new Array(region_options.length).fill(false),
  );

  const params = { searchTerm, order, sort, lessonType, gender, region, isDirectQuote };

  const { data, isLoading, isError, hasNextPage, fetchNextPage } = useInfiniteQuery<LessonResult>(
    ["received-request", params],
    ({ pageParam = 1 }) =>
      getReceiveRequest({
        page: pageParam,
        limit: 10,
        keyword: params.searchTerm,
        order: params.order,
        sort: params.sort,
        lesson_type: params.lessonType || undefined,
        gender: params.gender || undefined,
        region: params.region || undefined,
        has_direct_quote: params.isDirectQuote,
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.hasMore ? allPages.length + 1 : undefined;
      },
    },
  );

  if (isError) {
    alert("데이터를 불러오는 중 오류가 발생하였습니다.");
  }

  const result = data?.pages[0];
  const receivedList = data?.pages.flatMap((page) => page.list) ?? [];
  const totalCount = data?.pages[0]?.totalCount ?? 0;

  const count = {
    SPORTS: result?.lessonTypeCounts.SPORTS || 0,
    FITNESS: result?.lessonTypeCounts.FITNESS || 0,
    REHAB: result?.lessonTypeCounts.REHAB || 0,
    MALE: result?.genderCounts?.male || 0,
    FEMALE: result?.genderCounts?.female || 0,
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
            setLessonType={setLessonType}
            setGender={setGender}
            setRegion={setRegion}
            setIsDirectQuote={setIsDirectQuote}
            lessonTypeChecked={lessonTypeChecked}
            genderChecked={genderChecked}
            regionChecked={regionChecked}
            directChecked={directChecked}
            setLessonTypeChecked={setLessonTypeChecked}
            setGenderChecked={setGenderChecked}
            setRegionChecked={setRegionChecked}
            setDirectChecked={setDirectChecked}
          />
        </div>
        <div className="flex flex-col gap-[3.2rem] w-full">
          <ListHeader
            totalCount={totalCount}
            setIsModalOpen={setIsModalOpen}
            setSearchTerm={setSearchTerm}
            setOrder={setOrder}
            setSort={setSort}
          />
          <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
            {receivedList.map((item) => (
              <div className="flex flex-col gap-[4.8rem]" key={item.id}>
                <RequestLessonCard item={item} />
              </div>
            ))}
          </InfiniteScroll>
          {isLoading && <Loading />}
        </div>
      </div>
      {isModalopen && (
        <MobileFilter
          setLessonType={setLessonType}
          setGender={setGender}
          setIsDirectQuote={setIsDirectQuote}
          setRegion={setRegion}
          closeModal={() => setIsModalOpen(false)}
          count={count}
          lessonTypeChecked={lessonTypeChecked}
          genderChecked={genderChecked}
          regionChecked={regionChecked}
          directChecked={directChecked}
          setLessonTypeChecked={setLessonTypeChecked}
          setGenderChecked={setGenderChecked}
          setRegionChecked={setRegionChecked}
          setDirectChecked={setDirectChecked}
        />
      )}
    </div>
  );
}
