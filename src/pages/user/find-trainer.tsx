import Link from "next/link";
import { useState } from "react";
import { TrainerSort } from "@/types/dropdown";
import FindTrainerCard from "@/components/Cards/FindTrainerCard";
import Search from "@/components/Common/Search";
import Title from "@/components/Common/Title";
import Dropdown from "@/components/Dropdown/Dropdown";
import FavoriteTrainer from "@/components/FindTrainer/FavoriteTrainer";
import Filter from "@/components/FindTrainer/Filter";

const data = [{ name: "김코드" }, { name: "강코드" }, { name: "박코드" }];
const container = "flex flex-col m-auto";
const filter_list = "flex justify-between mx-[26rem]";
const filter_favorite = "flex flex-col gap-[4.6rem]";
const list_wrapper = "flex flex-col gap-[3.2rem]";
const sort_search = "flex flex-col items-end gap-[2.4rem]";
const list = "flex flex-col gap-[4.8rem]";

export default function FindTrainer() {
  // 오류 방지용 임시 trainerID 지정
  const trainerId = 1;
  const [keyword, setKeyword] = useState<string>("");
  const trainerSort: TrainerSort[] = [
    "리뷰 많은 순",
    "평점 높은 순",
    "경력 높은 순",
    "확정 횟수 많은 순",
  ];

  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = () => {
    const newFilteredData = data.filter((item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase()),
    );
    setFilteredData(newFilteredData);
  };

  return (
    <div className={container}>
      <Title title="기사님 찾기" />
      <div className={filter_list}>
        <div className={filter_favorite}>
          <Filter />
          <FavoriteTrainer />
        </div>
        <div className={list_wrapper}>
          <div className={sort_search}>
            <Dropdown options={trainerSort} type="sort" />
            <Search keyword={keyword} setKeyword={setKeyword} onSearch={handleSearch} />
          </div>
          <div className={list}>
            {filteredData.map((item, index) => (
              <div key={index}>
                <Link href={`/user/detail-trainer/${trainerId}`}>
                  <FindTrainerCard item={item} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
