import { useState } from "react";
import { UserSort } from "@/types/dropdown";
import RequestLessonCard from "@/components/Cards/RequestLessonCard";
import { HorizontalLine } from "@/components/Common/Card/Line";
import Search from "@/components/Common/Search";
import Title from "@/components/Common/Title";
import Dropdown from "@/components/Dropdown/Dropdown";

const data = [{ name: "김코드" }, { name: "강코드" }, { name: "박코드" }];

export default function ReceivedRequest() {
  // 오류 방지용 임시 trainerID 지정
  const [keyword, setKeyword] = useState<string>("");
  const userSort: UserSort[] = ["레슨 빠른 순", "레슨 느린 순", "최근 요청 순"];

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
      <Title title="받은 요청" />
      <div className="flex justify-between max-w-[140rem] w-full mx-auto py-[2.4rem]">
        <div className="flex flex-col gap-[4.6rem]">
          <div className="flex justify-between">
            <p>이사 유형</p>
            <p>전체선택</p>
          </div>
          <HorizontalLine width="100%" />
          <div>
            <p>재활운동</p>
          </div>
        </div>
        <div className="flex flex-col gap-[3.2rem]">
          <div className="flex flex-col gap-[2.4rem]">
            <Search keyword={keyword} setKeyword={setKeyword} onSearch={handleSearch} />
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium">전체 8건</p>
              <Dropdown options={userSort} type="sort" />
            </div>
          </div>
          {filteredData.map((item, index) => (
            // 임시로 인덱스 키 지정 (수정 -> item.id)
            <div className="flex flex-col gap-[4.8rem]" key={index}>
              <RequestLessonCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
