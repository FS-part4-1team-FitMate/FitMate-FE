import { ic_square_check_active_md, ic_square_check_inactive_md } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  genderFilter_trans,
  receivedRequestFilter_trans,
  serviceFilter_trans,
} from "@/types/dropdown";
import { Lesson } from "@/types/lesson";

interface CheckboxFilterProps {
  receivedList: Lesson[];
  label?: string;
  options: string[];
  filterType: "lessonType" | "gender" | "filter";
  onFilterChange?: (filtered: Lesson[]) => void;
}

export default function CheckboxFilter({
  receivedList,
  label,
  options,
  filterType,
  onFilterChange,
}: CheckboxFilterProps) {
  const [isCheckedFilter, setIsCheckedFilter] = useState<boolean[]>(
    new Array(options.length).fill(false),
  );

  const [filteredItems, setFilteredItems] = useState<Lesson[]>(receivedList);

  const filterCount: { [key: string]: number } = {};

  // 필터 카운트 업데이트
  if (filterType === "lessonType") {
    receivedList.forEach((item: Lesson) => {
      const filterKey = item[filterType];
      if (filterKey) {
        filterCount[filterKey] = (filterCount[filterKey] || 0) + 1;
      }
    });
  }

  if (filterType === "gender") {
    // 성별 필터 카운트
    receivedList.forEach((item: Lesson) => {
      const gender = item.user.profile.gender;
      if (gender) {
        filterCount[gender] = (filterCount[gender] || 0) + 1;
      }
    });
  }

  if (filterType === "filter") {
    // REGION, DIRECT 필터 카운트
    receivedList.forEach((item: Lesson) => {
      if (item.user.profile.region) {
        filterCount["REGION"] = (filterCount["REGION"] || 0) + 1;
      }
      if (item.isDirectQuote) {
        filterCount["DIRECT"] = (filterCount["DIRECT"] || 0) + 1;
      }
    });
  }

  const filterItems = () => {
    let filtered = [...receivedList];

    // lessonType 필터링
    if (filterType === "lessonType") {
      const selectedFilters = options.filter((_, index) => isCheckedFilter[index]);
      if (selectedFilters.length > 0) {
        filtered = filtered.filter((item) => selectedFilters.includes(item[filterType]));
      }
    }

    // gender 필터링
    if (filterType === "gender") {
      const selectedFilters = options.filter((_, index) => isCheckedFilter[index]);
      if (selectedFilters.length > 0) {
        filtered = filtered.filter((item) => selectedFilters.includes(item.user.profile.gender));
      }
    }

    // filter (REGION, DIRECT) 필터링
    if (filterType === "filter") {
      const selectedFilters = options.filter((_, index) => isCheckedFilter[index]);
      if (selectedFilters.includes("REGION")) {
        filtered = filtered.filter((item) => item.user.profile.region);
      }
      if (selectedFilters.includes("DIRECT")) {
        filtered = filtered.filter((item) => item.isDirectQuote);
      }
    }

    setFilteredItems(filtered);

    if (onFilterChange) {
      onFilterChange(filtered); // 부모 컴포넌트에 필터링된 데이터 전달
    }
  };

  useEffect(() => {
    filterItems();
  }, [isCheckedFilter]);

  const handleCheckboxClick = (index: number) => {
    const updatedCheckedItems = [...isCheckedFilter];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setIsCheckedFilter(updatedCheckedItems);
  };

  const handleSelectAll = () => {
    const allChecked = isCheckedFilter.every((item) => item);
    setIsCheckedFilter(new Array(options.length).fill(!allChecked));
  };

  const getFilterTranslation = (option: string): string => {
    switch (filterType) {
      case "lessonType":
        return serviceFilter_trans(option);
      case "gender":
        return genderFilter_trans(option); // gender 필터의 번역
      case "filter":
        return receivedRequestFilter_trans(option); // REGION, DIRECT 필터의 번역
      default:
        return option;
    }
  };

  return (
    <div className="flex flex-col gap-[2.4rem]">
      <div className="flex pc:justify-between w-[32.8rem] py-[1.6rem] px-4 border-b border-line-200">
        <h1 className="text-nowrap text-xl font-medium">{label}</h1>
        <div
          className={clsx(
            "flex flex-row-reverse justify-between items-center w-full",
            "pc:flex-row pc:justify-end",
          )}
        >
          <Image
            className="cursor-pointer"
            src={
              isCheckedFilter.every((item) => item)
                ? ic_square_check_active_md
                : ic_square_check_inactive_md
            }
            width={36}
            height={36}
            onClick={handleSelectAll}
            alt="체크박스"
          />
          <p className="text-gray-300 text-lg font-normal pc:text-2lg">전체선택</p>
        </div>
      </div>
      <div className="flex flex-col gap-[1.6rem]">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-[1.6rem] tablet:px-4 mobile:px-4 border-b border-line-100"
          >
            <p className="text-lg font-medium pc:text-2lg">
              {getFilterTranslation(option)} ({filterCount[option] || 0})
            </p>
            <Image
              className="cursor-pointer"
              src={isCheckedFilter[index] ? ic_square_check_active_md : ic_square_check_inactive_md}
              width={36}
              height={36}
              onClick={() => handleCheckboxClick(index)}
              alt="체크박스"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
