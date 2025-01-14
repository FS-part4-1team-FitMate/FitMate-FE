import { ic_filter_active_sm } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
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

  const [sort, setSort] = useState<string>(query.sort || "");
  const [lessonType, setLessonType] = useState<string[]>(query.lesson_type || []);
  const [gender, setGender] = useState<string[]>(query.gender || []);
  const [region, setRegion] = useState<string[]>(query.region || []);
  const [keyword, setKeyword] = useState<string>(query.keyword || "");

  const [isModalopen, setIsModalOpen] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<string>("레슨 빠른 순");
  const [filteredData, setFilteredData] = useState<Lesson[]>([]);

  const loaderRef = useRef<HTMLDivElement>(null);

  const { data, error, isLoading, isError, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery<LessonResult>({
      queryKey: ["received-request", query],
      queryFn: ({ pageParam = 1 }) =>
        getReceiveRequest({
          page: pageParam,
          limit: 10,
          order: "start_date",
          sort: sort,
          lesson_type: lessonType.join(","),
          gender: gender.join(","),
          region: region.join(","),
          keyword: keyword || "",
        }),
      getNextPageParam: (lastPage) => {
        return lastPage.hasMore ? lastPage.list.length + 1 : false;
      },
    });

  // 무한 스크롤
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "100px",
      },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 쿼리 파라미터 업데이트
  const updateQueryParams = () => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...query,
          keyword,
          sort: sortOrder,
          lesson_type: lessonType.join(","),
          gender: gender.join(","),
          region: region.join(","),
        },
      },
      undefined,
      { shallow: true },
    );
  };

  const handleSortChange = (sort: string) => {
    setSortOrder(sort);
    updateQueryParams();
  };

  const handleSearch = () => {
    updateQueryParams();
  };

  const handleFilterChange = (filtered: Lesson[]) => {
    setFilteredData(filtered);
  };

  const handleCheckboxChange = (type: string, selectedOptions: string[]) => {
    if (type === "lessonType") {
      setLessonType(selectedOptions);
    } else if (type === "gender") {
      setGender(selectedOptions);
    } else if (type === "region") {
      setRegion(selectedOptions);
    }
    updateQueryParams();
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
              items={filteredData}
              label="운동 유형"
              options={serviceFilter}
              filterType="lessonType"
              onFilterChange={handleFilterChange}
            />
            <CheckboxFilter items={filteredData} label="성별" options={genderFilter} />
            <CheckboxFilter items={filteredData} label="필터" options={receivedRequestFilter} />
          </div>
        </div>
        <div className="flex flex-col gap-[3.2rem] w-full">
          <div className="flex flex-col gap-[2.4rem]">
            <Search keyword={keyword} setKeyword={setKeyword} onSearch={handleSearch} />
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium pc:text-lg">전체 {data.totalCount}건</p>
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
