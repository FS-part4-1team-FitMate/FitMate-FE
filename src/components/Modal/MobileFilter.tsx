import { ic_X_sm } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { genderFilter, regionFilter, requestFilter, serviceFilter } from "@/types/dropdown";
import CheckboxFilter from "../CheckboxFilter";

const container = clsx(
  "absolute left-0 right-0",
  "flex flex-col gap-[2.6rem] max-w-[37.5rem] mx-auto pt-[3.2rem] pb-16 px-[2.4rem] bg-gray-50",
  "tablet:top-[20%] tablet:bottom-auto mobile:bottom-0",
  "tablet:rounded-[3.2rem] mobile:rounded-b-none mobile:rounded-t-[3.2rem]",
);

const regionOptions = regionFilter.filter((_, index: number) => index !== 0);

interface ModalContainerProps {
  setLessonType: React.Dispatch<React.SetStateAction<string>>;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  setIsDirectQuote: React.Dispatch<React.SetStateAction<boolean>>;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
  closeModal?: () => void;
  count: {};
  lessonTypeChecked: boolean[];
  genderChecked: boolean[];
  regionChecked: boolean[];
  directChecked: boolean[];
  setLessonTypeChecked: React.Dispatch<React.SetStateAction<boolean[]>>;
  setGenderChecked: React.Dispatch<React.SetStateAction<boolean[]>>;
  setRegionChecked: React.Dispatch<React.SetStateAction<boolean[]>>;
  setDirectChecked: React.Dispatch<React.SetStateAction<boolean[]>>;
}
export default function MobileFilter({
  setLessonType,
  setGender,
  setIsDirectQuote,
  setRegion,
  closeModal,
  count,
  lessonTypeChecked,
  genderChecked,
  regionChecked,
  directChecked,
  setLessonTypeChecked,
  setGenderChecked,
  setRegionChecked,
  setDirectChecked,
}: ModalContainerProps) {
  const [activeTab, setActiveTab] = useState("service");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleFilterChange = (filterType: string, selectedValues: string) => {
    const selectedArray = selectedValues.split(",");

    if (filterType === "lessonType") {
      setLessonTypeChecked(serviceFilter.map((option) => selectedArray.includes(option)));
    } else if (filterType === "gender") {
      setGenderChecked(genderFilter.map((option) => selectedArray.includes(option)));
    } else if (filterType === "direct") {
      setDirectChecked(requestFilter.map((option) => selectedArray.includes(option)));
    } else if (filterType === "region") {
      setRegionChecked(regionOptions.map((option) => selectedArray.includes(option)));
    }
  };

  const isAnyFilterChecked = [
    ...lessonTypeChecked,
    ...genderChecked,
    ...directChecked,
    ...regionChecked,
  ].some((checked) => !checked);

  const handleApplyFilters = () => {
    // 모바일에서 필터링을 적용하는 버튼을 눌렀을 때 상태 업데이트
    const selectedLessonTypes = serviceFilter.filter((_, index) => lessonTypeChecked[index]);
    const selectedGenders = genderFilter.filter((_, index) => genderChecked[index]);
    const selectedDirects = requestFilter.filter((_, index) => directChecked[index]);
    const selectedRegions = regionOptions.filter((_, index) => regionChecked[index]);

    if (selectedLessonTypes.length > 0) setLessonType(selectedLessonTypes.join(","));
    if (selectedGenders.length > 0) setGender(selectedGenders.join(","));
    if (selectedDirects.length > 0) setIsDirectQuote(selectedDirects.includes("DIRECT"));
    if (selectedRegions.length > 0) setRegion(selectedRegions.join(","));

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
              className={`text-2lg ${activeTab === "direct" ? "text-black-400 font-bold" : "text-gray-400 font-semibold"}`}
              onClick={() => handleTabClick("direct")}
            >
              필터
            </button>
            <button
              className={`text-2lg ${activeTab === "region" ? "text-black-400 font-bold" : "text-gray-400 font-semibold"}`}
              onClick={() => handleTabClick("region")}
            >
              지역
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
              isChecked={lessonTypeChecked || []}
              setIsChecked={setLessonTypeChecked}
            />
          )}
          {activeTab === "gender" && (
            <CheckboxFilter
              filterType="gender"
              onFilterChange={handleFilterChange}
              options={genderFilter}
              count={count}
              isChecked={genderChecked || []}
              setIsChecked={setGenderChecked}
            />
          )}
          {activeTab === "direct" && (
            <CheckboxFilter
              filterType="direct"
              onFilterChange={handleFilterChange}
              options={requestFilter}
              count={count}
              isChecked={directChecked || []}
              setIsChecked={setDirectChecked}
            />
          )}
          {activeTab === "region" && (
            <CheckboxFilter
              filterType="region"
              onFilterChange={handleFilterChange}
              options={regionOptions}
              isChecked={regionChecked || []}
              setIsChecked={setRegionChecked}
            />
          )}
        </div>
        <button
          disabled={!isAnyFilterChecked}
          onClick={handleApplyFilters}
          className={clsx(
            "w-full h-[6.4rem] mx-auto p-[1.6rem] rounded-[1.6rem] text-gray-50 text-xl font-semibold",
            isAnyFilterChecked ? "bg-blue-300" : "bg-gray-200",
          )}
        >
          조회하기
        </button>
      </div>
    </div>
  );
}
