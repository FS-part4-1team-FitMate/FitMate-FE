import { ic_filter_active_sm } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { GenderFilter, ReceivedRequestFilter, ServiceFilter, UserSort } from "@/types/dropdown";
import RequestLessonCard from "@/components/Cards/RequestLessonCard";
import CheckboxFilter from "@/components/CheckboxFilter";
import Search from "@/components/Common/Search";
import Title from "@/components/Common/Title";
import Dropdown from "@/components/Dropdown/Dropdown";
import MobileFilter from "@/components/Modal/MobileFilter";

const data = [{ name: "김코드" }, { name: "강코드" }, { name: "박코드" }];

const container = clsx(
  "flex flex-col w-full mx-auto py-[2.4rem] px-8",
  "pc:flex-row pc:gap-[10rem] pc:max-w-[140rem] tablet:max-w-[74.4rem] mobile:max-w-[37.5rem]",
);

export default function ReceivedRequest() {
  const [keyword, setKeyword] = useState<string>("");
  const [isModalopen, setIsModalOpen] = useState<boolean>(false);

  const userSort: UserSort[] = ["레슨 빠른 순", "레슨 느린 순", "최근 요청 순"];
  const serviceFilter: ServiceFilter[] = ["재활운동", "스포츠", "피트니스"];
  const genderFilter: GenderFilter[] = ["남자", "여자"];
  const receivedRequestFilter: ReceivedRequestFilter[] = ["서비스 가능 지역", "지정 견적 요청"];

  // 타입 지정 필요
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = () => {
    const newFilteredData = data.filter((item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase()),
    );
    setFilteredData(newFilteredData);
  };

  return (
    <div className="flex flex-col gap-[2.4rem] max-w-[192rem] m-auto">
      <Title title="받은 요청" />
      <div className={container}>
        <div className="flex flex-col gap-[4.6rem]">
          <div className="hidden flex-col gap-[2.4rem] pc:flex">
            <CheckboxFilter label="운동 유형" options={serviceFilter} />
            <CheckboxFilter label="성별" options={genderFilter} />
            <CheckboxFilter label="필터" options={receivedRequestFilter} />
          </div>
        </div>
        <div className="flex flex-col gap-[3.2rem] w-full">
          <div className="flex flex-col gap-[2.4rem]">
            <Search keyword={keyword} setKeyword={setKeyword} onSearch={handleSearch} />
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium">전체 8건</p>
              <div className="flex gap-[0.4rem]">
                <Dropdown options={userSort} type="sort" />
                <div className="block pc:hidden" onClick={() => setIsModalOpen(true)}>
                  <Image src={ic_filter_active_sm} width={32} height={32} alt="모바일 필터" />
                </div>
              </div>
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
      {isModalopen && <MobileFilter closeModal={() => setIsModalOpen(false)} />}
    </div>
  );
}
