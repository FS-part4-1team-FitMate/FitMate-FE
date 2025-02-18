import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroller";
import { useGetTrainerList } from "@/lib/api/queries/trainer";
import { trainerSort } from "@/types/dropdown";
import { TrainerParams } from "@/types/trainer";
import FindTrainerCard from "@/components/Cards/FindTrainerCard";
import Loading from "@/components/Common/Loading";
import Search from "@/components/Common/Search";
import Title from "@/components/Common/Title";
import Dropdown from "@/components/Dropdown/Dropdown";
import FavoriteTrainer from "@/components/FindTrainer/FavoriteTrainer";
import FilterTrainer from "@/components/FindTrainer/FilterTrainer";

export default function FindTrainer() {
  const [params, setParams] = useState<TrainerParams>({
    order: "reviewCount",
    sort: "desc",
    lessonType: "",
    gender: "",
    keyword: "",
  });

  const { data, isLoading, isError, hasNextPage, fetchNextPage } = useGetTrainerList({
    order: params.order,
    sort: params.sort,
    lessonType: params.lessonType || undefined,
    gender: params.gender || undefined,
    keyword: params.keyword,
  });

  // 검색 처리 함수
  const handleSearch = (keyword: string) => {
    setParams({ keyword });
  };

  // 정렬 처리 함수
  const handleSortChange = (order: string, sort: string) => {
    setParams({ order });
    setParams({ sort });
  };

  // 필터 처리 함수
  const handleFilterChange = (filterType: string, value: string) => {
    if (value === "ALL") {
      value = "";
    }

    setParams((prevState) => {
      let newParams = { ...prevState };

      if (filterType === "lessonType") {
        newParams = { ...newParams, lessonType: value };
      } else if (filterType === "gender") {
        newParams = { ...newParams, gender: value };
      }

      return newParams;
    });
  };

  const handleFilterReset = () => {
    setParams({ lessonType: "", gender: "" });
  };

  if (isLoading) return <Loading />;
  if (isError) return toast.error("강사님 목록을 불러오는 중 에러가 발생했어요! 😢");

  const trainerList = data?.pages.flatMap((page) => page.trainers) ?? [];

  return (
    <div className="flex flex-col m-auto pb-16 pc:max-w-[140rem] tablet:max-w-[74.5rem] mobile:max-w-[37.5rem]">
      <div className="hidden pc:block">
        <Title title="강사님 찾기" />
      </div>
      <div className="flex flex-col justify-between max-w-[140rem] w-full mx-auto px-8 pc:flex-row">
        <div className="hidden flex-col gap-[4.6rem] w-[32.7rem] pc:flex">
          <FilterTrainer
            gender={params.gender}
            lessonType={params.lessonType}
            onFilterReset={handleFilterReset}
            onFilterChange={handleFilterChange}
          />
          <FavoriteTrainer />
        </div>
        <div className="flex flex-col gap-[3.2rem] w-full pc:pl-[5rem]">
          <div className="flex flex-col gap-[2.4rem]">
            <div className="flex flex-col justify-start gap-4 pt-[1.6rem] pc:justify-end pc:pt-0">
              <p
                onClick={handleFilterReset}
                className="block pc:hidden px-4 text-gray-300 text-sm font-medium cursor-pointer"
              >
                초기화
              </p>
              <div className="flex justify-between items-center w-full pc:justify-end">
                <div className="flex items-center gap-8 pc:hidden">
                  <FilterTrainer
                    onFilterReset={handleFilterReset}
                    onFilterChange={handleFilterChange}
                  />
                </div>
                <Dropdown setSortOrder={handleSortChange} options={trainerSort} type="sort" />
              </div>
            </div>
            <Search onSearch={handleSearch} />
          </div>
          <InfiniteScroll
            className="flex flex-col pc:gap-[4.8rem] tablet:gap-[3.2rem] mobile:gap-[2.4rem]"
            hasMore={hasNextPage}
            loadMore={() => fetchNextPage()}
          >
            {trainerList.map(
              (trainer) =>
                trainer.profile !== null && (
                  <Link
                    className="rounded-[1.6rem] hover:border-[0.15rem] hover:border-blue-300"
                    href={`/user/detail-trainer/${trainer.id}`}
                    key={trainer.id}
                  >
                    <FindTrainerCard trainer={trainer} />
                  </Link>
                ),
            )}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}
