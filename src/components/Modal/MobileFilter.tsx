import { ic_X_sm } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { GenderFilter, ServiceFilter } from "@/types/dropdown";
import { Lesson } from "@/types/lesson";
import CheckboxFilter from "../CheckboxFilter";

const container = clsx(
  "absolute left-0 right-0",
  "flex flex-col gap-[2.6rem] max-w-[37.5rem] mx-auto pt-[3.2rem] pb-16 px-[2.4rem] bg-gray-50",
  "tablet:top-[20%] tablet:bottom-auto mobile:bottom-0",
  "tablet:rounded-[3.2rem] mobile:rounded-b-none mobile:rounded-t-[3.2rem]",
);

interface ModalContainerProps {
  receivedList: Lesson[];
  onFilterChange: (filterType: string, value: string) => void;
  closeModal?: () => void;
  onApplyFilters: (selectedOptions: any) => void;
}
export default function MobileFilter({
  receivedList,
  onFilterChange,
  closeModal,
  onApplyFilters,
}: ModalContainerProps) {
  const [activeTab, setActiveTab] = useState("service");
  const [isCheckedFilter, setIsCheckedFilter] = useState<boolean[]>(new Array(3).fill(false));

  const serviceFilter: ServiceFilter[] = ["REHAB", "SPORTS", "FITNESS"];
  const genderFilter: GenderFilter[] = ["MALE", "FEMALE"];
  const receivedRequestFilter: string[] = ["REGION", "DIRECT"];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleCheckboxClick = (index: number) => {
    const updatedCheckedState = [...isCheckedFilter];
    updatedCheckedState[index] = !updatedCheckedState[index];
    setIsCheckedFilter(updatedCheckedState);
  };

  const handleApplyFilters = () => {
    // 체크된 옵션을 필터링된 값으로 전달
    const selectedOptions = {
      lessonType: serviceFilter.filter((_, index) => isCheckedFilter[index]),
      gender: genderFilter.filter((_, index) => isCheckedFilter[index]),
      filter: receivedRequestFilter.filter((_, index) => isCheckedFilter[index]),
    };
    // 부모 컴포넌트로 필터를 전달
    onApplyFilters(selectedOptions);
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
              receivedList={receivedList}
              filterType="lessonType"
              onFilterChange={onFilterChange}
              options={serviceFilter}
            />
          )}
          {activeTab === "gender" && (
            <CheckboxFilter
              receivedList={receivedList}
              filterType="gender"
              onFilterChange={onFilterChange}
              options={genderFilter}
            />
          )}
          {activeTab === "filter" && (
            <CheckboxFilter
              receivedList={receivedList}
              filterType="filter"
              onFilterChange={onFilterChange}
              options={receivedRequestFilter}
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
