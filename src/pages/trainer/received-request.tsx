import { ic_filter_active_sm } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getReceiveRequest } from "@/lib/api/lessonService";
import { GenderFilter, ReceivedRequestFilter, ServiceFilter, UserSort } from "@/types/dropdown";
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
const receivedRequestFilter: ReceivedRequestFilter[] = ["서비스 가능 지역", "지정 견적 요청"];

export default function ReceivedRequest() {
  const router = useRouter();
  const { query } = router;

  const [order, setOrder] = useState<string>(query.order?.toString() || "start_date");
  const [sort, setSort] = useState<string>(query.sort?.toString() || "asc");
  const [keyword, setKeyword] = useState<string>(query.keyword?.toString() || "");
  const [lessonType, setLessonType] = useState<string>(query.lessonType?.toString() || "");
  const [gender, setGender] = useState<string>(query.gender?.toString() || "");
  const [region, setRegion] = useState<string>(query.region?.toString() || "");

  const filters = {
    order,
    sort,
    lessonType,
    gender,
    region,
    keyword,
  };

  const { data, isLoading, isError, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery<LessonResult>({
      queryKey: ["received-request", filters],
      queryFn: ({ pageParam = 1 }) =>
        getReceiveRequest({
          page: pageParam,
          limit: 10,
          order: filters.order,
          sort: filters.sort,
          lessonType: filters.lessonType || undefined,
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

  const [isModalopen, setIsModalOpen] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<Lesson[]>([]);

  // 빈 값 필터링 후 쿼리 파라미터 업데이트
  const updateQueryParams = (params: { [key: string]: string | null }) => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([key, value]) => value !== null),
    );

    router.push(
      {
        pathname: router.pathname,
        query: { ...query, ...filteredParams },
      },
      undefined,
      { shallow: true },
    );
  };

  // 정렬 처리 함수
  const sortData = (data: Lesson[]) => {
    const sortedData = [...data];
    if (order === "start_date") {
      sortedData.sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        return sort === "asc" ? dateA - dateB : dateB - dateA;
      });
    } else if (order === "created_at") {
      sortedData.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sort === "asc" ? dateA - dateB : dateB - dateA;
      });
    }
    return sortedData;
  };

  // 정렬 처리 함수
  const handleSortChange = (order: string, sort: string) => {
    setOrder(order);
    setSort(sort);
    updateQueryParams({ order, sort });
  };

  // 검색 처리 함수
  const handleSearch = () => {
    // 검색어가 비어있으면 빈 값을 쿼리 파라미터에 반영
    updateQueryParams({ keyword: keyword || "" });

    // 검색어로 필터링된 데이터
    const filteredByKeyword = receivedList.filter((item) =>
      item.user.profile.name.toLowerCase().includes(keyword.toLowerCase()),
    );

    // 렌더링에 반영
    setFilteredData(filteredByKeyword);
  };

  // 필터 처리 함수
  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === "lessonType") {
      setLessonType(value);
      updateQueryParams({ lessonType: value });
    } else if (filterType === "gender") {
      setGender(value);
      updateQueryParams({ gender: value });
    } else if (filterType === "region") {
      setRegion(value);
      updateQueryParams({ region: value });
    }
  };

  const sortedData = sortData(filteredData.length > 0 ? filteredData : receivedList);

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
              items={sortedData}
              label="운동 유형"
              options={serviceFilter}
              filterType="lessonType"
              onFilterChange={handleFilterChange}
            />
            <CheckboxFilter items={sortedData} label="성별" options={genderFilter} />
            <CheckboxFilter items={sortedData} label="필터" options={receivedRequestFilter} />
          </div>
        </div>
        <div className="flex flex-col gap-[3.2rem] w-full">
          <div className="flex flex-col gap-[2.4rem]">
            <Search keyword={keyword} setKeyword={setKeyword} onSearch={handleSearch} />
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
          {sortedData.map((item) => (
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
