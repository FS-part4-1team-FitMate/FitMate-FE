import Link from "next/link";
import { useState } from "react";
import { TrainerSort } from "@/types/dropdown";
import FindTrainerCard from "@/components/Cards/FindTrainerCard";
import Search from "@/components/Common/Search";
import Title from "@/components/Common/Title";
import Dropdown from "@/components/Dropdown/Dropdown";
import FavoriteTrainer from "@/components/FindTrainer/FavoriteTrainer";
import FilterTrainer from "@/components/FindTrainer/FilterTrainer";

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
    <div className="flex flex-col pc:max-w-[192rem] tablet:max-w-[74.5rem] mobile:max-w-[37.5rem] m-auto pb-16">
      <div className="pc:block tablet:hidden mobile:hidden">
        <Title title="기사님 찾기" />
      </div>
      <div className="flex justify-between max-w-[140rem] w-full mx-auto px-8 pc:flex-row tablet:flex-col mobile:flex-col">
        <div className="pc:flex tablet:hidden mobile:hidden flex-col gap-[4.6rem] w-fit">
          <FilterTrainer />
          <FavoriteTrainer items={filteredData} />
        </div>
        <div className="flex flex-col gap-[3.2rem] w-full pc:pl-[11rem]">
          <div className="flex flex-col gap-[2.4rem]">
            <div className="flex items-center pc:justify-end tablet:justify-between mobile:justify-between w-full pc:pt-0 tablet:pt-[1.6rem] mobile:pt-[1.6rem]">
              <div className="pc:hidden tablet:block mobile:block">
                <FilterTrainer />
              </div>
              <Dropdown options={trainerSort} type="sort" />
            </div>
            <Search keyword={keyword} setKeyword={setKeyword} onSearch={handleSearch} />
          </div>
          <div className="flex flex-col pc:gap-[4.8rem] tablet:gap-[3.2rem] mobile:gap[2.4rem]">
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
