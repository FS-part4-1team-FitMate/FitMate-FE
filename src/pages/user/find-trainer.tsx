import { useState } from "react";
import { TrainerSort } from "@/types/dropdown";
import FindTrainerCard from "@/components/Cards/FindTrainerCard";
import Search from "@/components/Common/Search";
import Dropdown from "@/components/Dropdown/Dropdown";
import Filter from "@/components/FindTrainer/Filter";

const data = [{ name: "김코드" }, { name: "강코드" }, { name: "박코드" }];

export default function FindTrainer() {
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
    <div className="flex m-[26rem]">
      <div className="flex flex-col">
        <Filter />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <Dropdown options={trainerSort} type="sort" />
          <Search keyword={keyword} setKeyword={setKeyword} onSearch={handleSearch} />
        </div>
        <div>
          {filteredData.map((item) => (
            <div>
              <FindTrainerCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
