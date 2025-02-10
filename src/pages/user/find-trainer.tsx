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

    if (filterType === "lessonType") {
      setParams({ lessonType: value });
    } else if (filterType === "gender") {
      setParams({ gender: value });
    }
  };

  const handleFilterReset = () => {
    setParams({ lessonType: "", gender: "" });
  };

  if (isLoading) return <Loading />;
  if (isError) return toast.error("강사님 목록을 불러오는 중 에러가 발생했어요! 😢");

  const trainerList = data?.pages.flatMap((page) => page.trainers) ?? [];

  return (
    <div className="flex flex-col m-auto pb-16 pc:max-w-[192rem] tablet:max-w-[74.5rem] mobile:max-w-[37.5rem]">
      <div className="hidden pc:block">
        <Title title="기사님 찾기" />
      </div>
      <div className="flex flex-col justify-between max-w-[140rem] w-full mx-auto px-8 pc:flex-row">
        <div className="hidden flex-col gap-[4.6rem] w-fit pc:flex">
          <FilterTrainer
            gender={params.gender}
            lessonType={params.lessonType}
            onFilterReset={handleFilterReset}
            onFilterChange={handleFilterChange}
          />
          <FavoriteTrainer trainerList={trainerList} />
        </div>
        <div className="flex flex-col gap-[3.2rem] w-full pc:pl-[5rem]">
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
              {trainerList.map(
                (trainer) =>
                  trainer.profile !== null && (
                    <Link href={`/user/detail-trainer/${trainer.id}`} key={trainer.id}>
                      <FindTrainerCard trainer={trainer} />
                    </Link>
                  ),
              )}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
}
