import { ic_filter_active_sm } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getReceiveRequest } from "@/lib/api/lessonService";
import { GenderFilter, ServiceFilter, UserSort } from "@/types/dropdown";
import { LessonResult } from "@/types/lesson";
import RequestLessonCard from "@/components/Cards/RequestLessonCard";
import CheckboxFilter from "@/components/CheckboxFilter";
import Loading from "@/components/Common/Loading";
import Search from "@/components/Common/Search";
import Title from "@/components/Common/Title";
import Dropdown from "@/components/Dropdown/Dropdown";
import MobileFilter from "@/components/Modal/MobileFilter";

const userSort: UserSort[] = ["레슨 빠른 순", "레슨 느린 순", "최근 요청 순"];
const serviceFilter: ServiceFilter[] = ["REHAB", "SPORTS", "FITNESS"];
const genderFilter: GenderFilter[] = ["MALE", "FEMALE"];
const receivedRequestFilter: string[] = ["DIRECT"];

export default function ReceivedRequest() {
  const [isModalopen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [order, setOrder] = useState<string>("start_date");
  const [sort, setSort] = useState<string>("asc");

  const [lessonType, setLessonType] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [isDirectQuote, setIsDirectQuote] = useState<boolean>(false);

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

  if (!data) {
    return <div>No data available</div>;
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

  // 검색 처리 함수
  const handleSearch = (keyword: string) => {
    setSearchTerm(keyword);
  };

  // 정렬 처리 함수
  const handleSortChange = (order: string, sort: string) => {
    setOrder(order);
    setSort(sort);
  };

  // 필터 처리 함수
  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === "lessonType") {
      setLessonType(value);
    } else if (filterType === "gender") {
      setGender(value);
    } else if (filterType === "direct") {
      setIsDirectQuote(value === "DIRECT");
    }
  };

  const handleApplyFilters = (selectedOptions: any) => {
    setLessonType(selectedOptions.lessonType.join(","));
    setGender(selectedOptions.gender.join(","));
    setIsDirectQuote(selectedOptions.filter.includes("DIRECT"));
  };

  if (isError) {
    return <div>데이터를 불러오는 중 오류가 발생하였습니다.</div>;
  }

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
          <div className="hidden flex-col gap-[5rem] pc:flex">
            <CheckboxFilter
              label="운동 유형"
              options={serviceFilter}
              filterType="lessonType"
              onFilterChange={handleFilterChange}
              count={count}
            />
            <CheckboxFilter
              label="성별"
              options={genderFilter}
              filterType="gender"
              onFilterChange={handleFilterChange}
              count={count}
            />
            <CheckboxFilter
              label="필터"
              options={receivedRequestFilter}
              filterType="direct"
              onFilterChange={handleFilterChange}
              count={count}
            />
          </div>
        </div>
        <div className="flex flex-col gap-[3.2rem] w-full">
          <div className="flex flex-col gap-[2.4rem]">
            <Search onSearch={handleSearch} />
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium pc:text-lg">전체 {totalCount}건</p>
              <div className="flex gap-[0.4rem]">
                <Dropdown setSortOrder={handleSortChange} options={userSort} type="sort" />
                <div className="block pc:hidden" onClick={() => setIsModalOpen(true)}>
                  <Image src={ic_filter_active_sm} width={32} height={32} alt="모바일 필터" />
                </div>
              </div>
            </div>
          </div>
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
          receivedList={receivedList}
          onFilterChange={handleFilterChange}
          closeModal={() => setIsModalOpen(false)}
          onApplyFilters={handleApplyFilters}
        />
      )}
    </div>
  );
}
