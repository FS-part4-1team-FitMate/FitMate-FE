import { ic_filter_active_sm } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getReceiveRequest } from "@/lib/api/lessonService";
import { GenderFilter, ServiceFilter, UserSort } from "@/types/dropdown";
import { Lesson, LessonResult } from "@/types/lesson";
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
const receivedRequestFilter: string[] = ["REGION", "DIRECT"];

export default function ReceivedRequest() {
  const router = useRouter();
  const query = router.query;

  const [order, setOrder] = useState<string>(query.order?.toString() || "start_date");
  const [sort, setSort] = useState<string>(query.sort?.toString() || "asc");
  const [keyword, setKeyword] = useState<string>(query.keyword?.toString() || "");
  const [lessonType, setLessonType] = useState<string>(query.lesson_type?.toString() || "");
  const [gender, setGender] = useState<string>(query.gender?.toString() || "");
  const [region, setRegion] = useState<string>(query.region?.toString() || "");
  const [isDirectQuote, setIsDirectQuote] = useState<boolean>(false);

  const filters = { order, sort, lessonType, gender, region, keyword };

  const { data, isLoading, isError, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery<LessonResult>({
      queryKey: ["received-request", filters],
      queryFn: ({ pageParam = 1 }) =>
        getReceiveRequest({
          page: pageParam,
          limit: 10,
          order: filters.order,
          sort: filters.sort,
          lesson_type: filters.lessonType || undefined,
          gender: filters.gender || undefined,
          region: filters.region || undefined,
          keyword: filters.keyword,
        }),
      getNextPageParam: (lastPage) => {
        return lastPage.hasMore ? lastPage.list.length + 1 : false;
      },
    });

  const receivedList = data?.pages.flatMap((page) => page.list) ?? [];
  const totalCount = data?.pages.flatMap((page) => page.totalCount) ?? [];
  const [filteredData, setFilteredData] = useState<Lesson[]>(receivedList);
  const [isModalopen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    router.push(
      {
        pathname: router.pathname,
        query: {},
      },
      undefined,
      { shallow: true },
    );
  }, []);

  // 빈 값 필터링 후 쿼리 파라미터 업데이트
  const updateQueryParams = (params: { [key: string]: string | null }) => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([key, value]) => value !== null && value !== ""),
    );

    const formattedParams = Object.fromEntries(
      Object.entries(filteredParams).map(([key, value]) => [
        key === "lessonType" ? "lesson_type" : key,
        value,
      ]),
    );
    router.push(
      {
        pathname: router.pathname,
        query: { ...query, ...formattedParams },
      },
      undefined,
      { shallow: true },
    );
  };

  // 정렬 처리 함수
  const handleSortChange = (order: string, sort: string) => {
    setOrder(order);
    setSort(sort);
    updateQueryParams({ order, sort });
  };

  // 검색 처리 함수
  const handleSearch = (searchTerm: string) => {
    setKeyword(searchTerm);
    updateQueryParams({ keyword: searchTerm });
  };

  // 필터 처리 함수
  const handleFilterChange = (filtered: Lesson[]) => {
    setFilteredData(filtered);
  };

  if (isLoading) {
    return <Loading />;
  }

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
              receivedList={receivedList}
              label="운동 유형"
              options={serviceFilter}
              filterType="lessonType"
              onFilterChange={handleFilterChange}
            />
            <CheckboxFilter
              receivedList={receivedList}
              label="성별"
              options={genderFilter}
              filterType="gender"
              onFilterChange={handleFilterChange}
            />
            <CheckboxFilter
              receivedList={receivedList}
              label="필터"
              options={receivedRequestFilter}
              filterType="filter"
              onFilterChange={handleFilterChange}
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
          {filteredData.map((item) => (
            <div className="flex flex-col gap-[4.8rem]" key={item.id}>
              <RequestLessonCard item={item} />
            </div>
          ))}
        </div>
      </div>
      {isModalopen && <MobileFilter closeModal={() => setIsModalOpen(false)} />}
    </div>
  );
}
