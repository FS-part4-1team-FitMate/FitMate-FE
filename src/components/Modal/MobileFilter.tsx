import { ic_X_sm } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { genderFilter, regionFilter, requestFilter, serviceFilter } from "@/types/dropdown";
import { FilterCheck } from "@/types/lesson";
import CheckboxFilter from "../CheckboxFilter";

const container = clsx(
  "absolute left-0 right-0",
  "flex flex-col gap-[2.6rem] max-w-[37.5rem] mx-auto pt-[3.2rem] pb-16 px-[2.4rem] bg-gray-50",
  "tablet:top-[20%] tablet:bottom-auto mobile:bottom-0",
  "tablet:rounded-[3.2rem] mobile:rounded-b-none mobile:rounded-t-[3.2rem]",
);

const regionOptions = regionFilter.filter((_, index: number) => index !== 0);

interface ModalContainerProps {
  setParams: React.Dispatch<React.SetStateAction<{}>>;
  closeModal?: () => void;
  checked: FilterCheck;
  setChecked: React.Dispatch<React.SetStateAction<FilterCheck>>;
}
export default function MobileFilter({
  setParams,
  closeModal,
  checked,
  setChecked,
}: ModalContainerProps) {
  const [activeTab, setActiveTab] = useState("service");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    if (value === "ALL") {
      value = "";
    }

    setChecked((prevState) => {
      const newChecked = { ...prevState };

      if (filterType === "lessonType") {
        newChecked.lessonType[value] = !newChecked.lessonType[value];
      } else if (filterType === "gender") {
        newChecked.gender[value] = !newChecked.gender[value];
      } else if (filterType === "direct") {
        newChecked.isDirectQuote[value] = value === "DIRECT";
      } else if (filterType === "region") {
        newChecked.region[value] = !newChecked.region[value];
      }

      return newChecked;
    });
  };

  const handleApplyFilters = () => {
    setParams((prevState: any) => {
      let newParams = { ...prevState };

      if (checked.lessonType) {
        const selectedLessonTypes = Object.keys(checked.lessonType).filter(
          (key) => checked.lessonType[key],
        );
        if (selectedLessonTypes.length === Object.keys(checked.lessonType).length) {
          newParams.lesson_type = "";
        } else if (selectedLessonTypes.length > 0) {
          newParams.lesson_type = selectedLessonTypes.join(",");
        }
      }

      if (checked.gender) {
        const selectedGenders = Object.keys(checked.gender).filter((key) => checked.gender[key]);
        if (selectedGenders.length === Object.keys(checked.gender).length) {
          newParams.gender = "";
        } else if (selectedGenders.length > 0) {
          newParams.gender = selectedGenders.join(",");
        }
      }

      if (checked.isDirectQuote !== undefined) {
        const selectedDirectQuote = Object.keys(checked.isDirectQuote).filter(
          (key) => checked.isDirectQuote[key],
        );
        if (selectedDirectQuote.length === Object.keys(checked.isDirectQuote).length) {
          newParams.has_direct_quote = "";
        } else if (selectedDirectQuote.length > 0) {
          newParams.has_direct_quote = selectedDirectQuote.includes("DIRECT") ? true : false;
        }
      }

      if (checked.region) {
        const selectedRegions = Object.keys(checked.region).filter((key) => checked.region[key]);
        if (selectedRegions.length === Object.keys(checked.region).length) {
          newParams.region = "";
        } else if (selectedRegions.length > 0) {
          newParams.region = selectedRegions.join(",");
        }
      }

      return newParams;
    });

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
              isChecked={checked.lessonType}
              setIsChecked={setChecked}
            />
          )}
          {activeTab === "gender" && (
            <CheckboxFilter
              filterType="gender"
              onFilterChange={handleFilterChange}
              options={genderFilter}
              isChecked={checked.gender}
              setIsChecked={setChecked}
            />
          )}
          {activeTab === "direct" && (
            <CheckboxFilter
              filterType="isDirectQuote"
              onFilterChange={handleFilterChange}
              options={requestFilter}
              isChecked={checked.isDirectQuote}
              setIsChecked={setChecked}
            />
          )}
          {activeTab === "region" && (
            <CheckboxFilter
              filterType="region"
              onFilterChange={handleFilterChange}
              options={regionOptions}
              isChecked={checked.region}
              setIsChecked={setChecked}
            />
          )}
        </div>
        <button
          onClick={handleApplyFilters}
          className="w-full h-[6.4rem] mx-auto p-[1.6rem] rounded-[1.6rem] text-gray-50 text-xl font-semibold bg-blue-300"
        >
          조회하기
        </button>
      </div>
    </div>
  );
}
