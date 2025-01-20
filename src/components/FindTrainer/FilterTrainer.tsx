import { useState } from "react";
import { GenderFilter, ServiceFilter } from "@/types/dropdown";
import Dropdown from "../Dropdown/Dropdown";

const genderFilter: GenderFilter[] = ["ALL", "FEMALE", "MALE"];
const serviceFilter: ServiceFilter[] = ["ALL", "REHAB", "SPORTS", "FITNESS"];

interface FilterTrainerProps {
  gender?: string;
  lessonType?: string;
  onFilterReset: () => void;
  onFilterChange: (filterType: string, value: string) => void;
}

export default function FilterTrainer({
  gender,
  lessonType,
  onFilterReset,
  onFilterChange,
}: FilterTrainerProps) {
  return (
    <div className="flex flex-row pc:flex-col pc:gap-[3.2rem] tablet:gap-[1.2rem] mobile:gap-[0.8rem]">
      <div className="hidden justify-between items-center py-[1.6rem] px-4 border-b border-line-200 pc:flex">
        <p className="text-xl font-medium">필터</p>
        <p onClick={onFilterReset} className="text-gray-300 text-lg font-medium cursor-pointer">
          초기화
        </p>
      </div>
      <Dropdown
        onFilterChange={onFilterChange}
        options={genderFilter}
        type="filter"
        filterType="gender"
        currentValue={gender}
      />
      <Dropdown
        onFilterChange={onFilterChange}
        options={serviceFilter}
        type="filter"
        filterType="lessonType"
        currentValue={lessonType}
      />
    </div>
  );
}
