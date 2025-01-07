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

  // 타입 지정 필요
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = () => {
    const newFilteredData = data.filter((item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase()),
    );
    setFilteredData(newFilteredData);
  };

  return (
    <div className="flex flex-col max-w-[192rem] m-auto">
      <Title title="기사님 찾기" />
      <div className="flex justify-between max-w-[144rem] mx-[26rem]">
        <div className="flex flex-col gap-[4.6rem]">
          <Filter />
          <FavoriteTrainer />
        </div>
        <div className="flex flex-col gap-[3.2rem]">
          <div className="flex flex-col items-end gap-[2.4rem]">
            <Dropdown options={trainerSort} type="sort" />
            <Search keyword={keyword} setKeyword={setKeyword} onSearch={handleSearch} />
          </div>
          <div className="flex flex-col gap-[4.8rem]">
            {filteredData.map((item, index) => (
              // 임시로 인덱스 키 지정 (수정 -> item.id)
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
