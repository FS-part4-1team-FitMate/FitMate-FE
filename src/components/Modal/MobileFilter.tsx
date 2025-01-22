import { ic_X_sm } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { GenderFilter, RequestFilter, ServiceFilter } from "@/types/dropdown";
import CheckboxFilter from "../CheckboxFilter";

const serviceFilter: ServiceFilter[] = ["REHAB", "SPORTS", "FITNESS"];
const genderFilter: GenderFilter[] = ["MALE", "FEMALE"];
const receivedRequestFilter: RequestFilter[] = ["DIRECT"];

const container = clsx(
  "absolute left-0 right-0",
  "flex flex-col gap-[2.6rem] max-w-[37.5rem] mx-auto pt-[3.2rem] pb-16 px-[2.4rem] bg-gray-50",
  "tablet:top-[20%] tablet:bottom-auto mobile:bottom-0",
  "tablet:rounded-[3.2rem] mobile:rounded-b-none mobile:rounded-t-[3.2rem]",
);

interface ModalContainerProps {
  setLessonType: React.Dispatch<React.SetStateAction<string>>;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  setIsDirectQuote: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal?: () => void;
  count: {};
}
export default function MobileFilter({
  setLessonType,
  setGender,
  setIsDirectQuote,
  closeModal,
  count,
}: ModalContainerProps) {
  const [activeTab, setActiveTab] = useState("service");
  const [isCheckedFilter, setIsCheckedFilter] = useState<boolean[]>(new Array(3).fill(false));

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === "lessonType") {
      setLessonType(value);
    } else if (filterType === "gender") {
      setGender(value);
    } else if (filterType === "direct") {
      setIsDirectQuote(value === "DIRECT");
    }
  };

  const handleApplyFilters = () => {
    const selectedOptions = {
      lessonType: serviceFilter.filter((_, index) => isCheckedFilter[index]),
      gender: genderFilter.filter((_, index) => isCheckedFilter[index]),
      filter: receivedRequestFilter.filter((_, index) => isCheckedFilter[index]),
    };

    closeModal && closeModal();
  };

  return (
    <div className="fixed top-0 left-0  w-screen h-screen bg-black-400 bg-opacity-50 z-10">
      <div className={container}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[2.4rem]">
            <button
              className={`text-2lg ${activeTab === "service" ? "text-black-400 font-bold" : "text-gray-400 font-semibold"}`}
              onClick={() => handleTabClick("service")}
            >
              서비스
            </button>
            <button
              className={`text-2lg ${activeTab === "gender" ? "text-black-400 font-bold" : "text-gray-400 font-semibold"}`}
              onClick={() => handleTabClick("gender")}
            >
              성별
            </button>
            <button
              className={`text-2lg ${activeTab === "filter" ? "text-black-400 font-bold" : "text-gray-400 font-semibold"}`}
              onClick={() => handleTabClick("filter")}
            >
              필터
            </button>
          </div>
          <Image
            className="cursor-pointer"
            src={ic_X_sm}
            width={24}
            height={24}
            onClick={closeModal}
            alt="모달 닫기 버튼"
          />
        </div>
        <div className="tab-content">
          {activeTab === "service" && (
            <CheckboxFilter
              filterType="lessonType"
              onFilterChange={handleFilterChange}
              options={serviceFilter}
              count={count}
            />
          )}
          {activeTab === "gender" && (
            <CheckboxFilter
              filterType="gender"
              onFilterChange={handleFilterChange}
              options={genderFilter}
              count={count}
            />
          )}
          {activeTab === "filter" && (
            <CheckboxFilter
              filterType="direct"
              onFilterChange={handleFilterChange}
              options={receivedRequestFilter}
              count={count}
            />
          )}
        </div>
        <button
          onClick={handleApplyFilters}
          className="w-full h-[6.4rem] mx-auto p-[1.6rem] rounded-[1.6rem] text-gray-50 text-xl font-semibold bg-gray-200"
        >
          조회하기
        </button>
      </div>
    </div>
  );
}
