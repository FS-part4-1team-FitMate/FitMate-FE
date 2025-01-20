import Link from "next/link";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getTrainerList } from "@/lib/api/trainerService";
import { TrainerSort } from "@/types/dropdown";
import { TrainerResult } from "@/types/trainer";
import FindTrainerCard from "@/components/Cards/FindTrainerCard";
import Loading from "@/components/Common/Loading";
import Search from "@/components/Common/Search";
import Title from "@/components/Common/Title";
import Dropdown from "@/components/Dropdown/Dropdown";
import FavoriteTrainer from "@/components/FindTrainer/FavoriteTrainer";
import FilterTrainer from "@/components/FindTrainer/FilterTrainer";

const trainerSort: TrainerSort[] = [
  "리뷰 많은 순",
  "평점 높은 순",
  "경력 높은 순",
  "확정 횟수 많은 순",
];

export default function FindTrainer() {
  const [order, setOrder] = useState<string>("reviewCount");
  const [sort, setSort] = useState<string>("desc");

  const [lessonType, setLessonType] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const params = { order, sort, lessonType, gender, searchTerm };

  const { data, isLoading, isError, hasNextPage, fetchNextPage } = useInfiniteQuery<TrainerResult>(
    ["trainer-list", params],
    ({ pageParam = 1 }) =>
      getTrainerList({
        page: pageParam,
        limit: 5,
        keyword: params.searchTerm,
        order: params.order,
        sort: params.sort,
        lessonType: params.lessonType || undefined,
        gender: params.gender || undefined,
      }),
    // {
    //   keepPreviousData: true,
    // }
  );

  const list = data?.pages.flatMap((page) => page.trainers) ?? [];

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
    }
  };

  const handleFilterReset = () => {
    setLessonType("");
    setGender("");
  };

  // if (isError) {
  //   return <div>데이터를 불러오는 중 오류가 발생하였습니다.</div>;
  // }

  return (
    <div className="flex flex-col m-auto pb-16 pc:max-w-[192rem] tablet:max-w-[74.5rem] mobile:max-w-[37.5rem]">
      <div className="hidden pc:block">
        <Title title="기사님 찾기" />
      </div>
      <div className="flex flex-col justify-between max-w-[140rem] w-full mx-auto px-8 pc:flex-row">
        <div className="hidden flex-col gap-[4.6rem] w-fit pc:flex">
          <FilterTrainer
            gender={gender}
            lessonType={lessonType}
            onFilterReset={handleFilterReset}
            onFilterChange={handleFilterChange}
          />
          {/* 비회원일 시 안보이게 설정 */}
          <FavoriteTrainer items={list} />
        </div>
        <div className="flex flex-col gap-[3.2rem] w-full pc:pl-[11rem]">
          <div className="flex flex-col gap-[2.4rem]">
            <div className="flex justify-between items-center w-full pt-[1.6rem] pc:justify-end pc:pt-0">
              <div className="block pc:hidden">
                <FilterTrainer
                  onFilterReset={handleFilterReset}
                  onFilterChange={handleFilterChange}
                />
              </div>
              <Dropdown setSortOrder={handleSortChange} options={trainerSort} type="sort" />
            </div>
            <Search onSearch={handleSearch} />
          </div>
          <div className="flex flex-col pc:gap-[4.8rem] tablet:gap-[3.2rem] mobile:gap[2.4rem]">
            <InfiniteScroll hasMore={hasNextPage} loadMore={() => fetchNextPage()}>
              {list.map((item) => (
                <div key={item.id}>
                  <Link href={`/user/detail-trainer/${item.id}`}>
                    <FindTrainerCard item={item} />
                  </Link>
                </div>
              ))}
            </InfiniteScroll>
            {/* {isLoading && <Loading />} */}
          </div>
        </div>
      </div>
    </div>
  );
}
