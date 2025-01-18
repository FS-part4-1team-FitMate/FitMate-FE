import { useState } from "react";
import { filter_trans } from "@/types/dropdown";
import { FilterList, PastLessonFilterList, SortList } from "./DropdownList";
import { FilterMenu, PastLessonFilterMenu, SortMenu } from "./DropdownMenu";

interface DropdownProps {
  options: string[];
  type: "sort" | "filter" | "pastLesson";
  filterType?: "lessonType" | "gender";
  setSortOrder?: (order: string, sort: string) => void;
  onFilterChange?: (filterType: string, value: string) => void;
}

interface SortMapping {
  [key: string]: [string, string];
}

const sortMapping: SortMapping = {
  "레슨 빠른 순": ["start_date", "asc"],
  "레슨 느린 순": ["start_date", "desc"],
  "최근 요청 순": ["created_at", "desc"],
  "리뷰 많은 순": ["reviewCount", "desc"],
  "평점 높은 순": ["rating", "desc"],
  "경력 높은 순": ["experience", "desc"],
  "확정 횟수 많은 순": ["lessonCount", "desc"],
};

export default function Dropdown({
  setSortOrder,
  options,
  type,
  filterType,
  onFilterChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string>(() => {
    if (type === "filter") {
      return filterType === "lessonType" ? "서비스" : "성별";
    }
    return options[0];
  });

  const handleOptionClick = (val: string) => {
    if (setSortOrder && type === "sort") {
      const [orderValue, sortValue] = sortMapping[val];
      setSortOrder(orderValue, sortValue);
    }

    if (filterType) {
      if (onFilterChange) {
        onFilterChange(filterType, val);
      }
    }

    if (type === "filter") {
      setCurrentValue(filter_trans(val));
    } else {
      setCurrentValue(val);
    }

    setIsOpen(false);
  };

  if (type === "sort") {
    return (
      <div className="relative flex flex-col w-max">
        <SortMenu currentSort={currentValue} onToggle={() => setIsOpen((prev) => !prev)} />
        {isOpen && <SortList options={options} onOptionClick={handleOptionClick} />}
      </div>
    );
  }

  if (type === "filter") {
    return (
      <div className="relative flex flex-col w-40 pc:w-[32.8rem]">
        <div className="flex flex-col gap-[1.6rem]">
          {filterType === "gender" ? (
            <label className="hidden text-2lg font-medium pc:block">성별을 선택해주세요</label>
          ) : (
            <label className="hidden text-2lg font-medium pc:block">
              어떤 서비스가 필요하세요?
            </label>
          )}
          <FilterMenu
            className={
              isOpen === true
                ? "border border-blue-300 text-blue-300 bg-blue-50"
                : "border border-gray-100"
            }
            currentFilter={currentValue}
            onToggle={() => setIsOpen((prev) => !prev)}
          />
        </div>
        {isOpen && <FilterList options={options} onOptionClick={handleOptionClick} />}
      </div>
    );
  }

  if (type === "pastLesson") {
    return (
      <div className="relative flex flex-col w-56 pc:w-[19rem]">
        <PastLessonFilterMenu
          className={
            isOpen === true
              ? "border border-blue-300 text-blue-300 bg-blue-50"
              : "border border-gray-100"
          }
          currentQuote={currentValue}
          onToggle={() => setIsOpen((prev) => !prev)}
        />
        {isOpen && <PastLessonFilterList options={options} onOptionClick={handleOptionClick} />}
      </div>
    );
  }
}
