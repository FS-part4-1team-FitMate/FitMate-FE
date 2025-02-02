import { useEffect, useState } from "react";
import { filter_trans } from "@/types/dropdown";
import { FilterList, PastLessonFilterList, SortList } from "./DropdownList";
import { FilterMenu, PastLessonFilterMenu, SortMenu } from "./DropdownMenu";

interface DropdownProps {
  options: string[];
  type: "sort" | "filter";
  filterType?: "lessonType" | "gender" | "region" | "pastLesson";
  setSortOrder?: (order: string, sort: string) => void;
  onFilterChange?: (filterType: string, value: string) => void;
  currentValue?: string;
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
  currentValue = "",
}: DropdownProps) {
  const getInitialLabel = () => {
    if (filterType === "gender") {
      return "성별";
    }
    if (filterType === "lessonType") {
      return "서비스";
    }
    if (filterType === "region" || filterType === "pastLesson") {
      return filter_trans(options[0]);
    }
    return options[0];
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentLabel, setCurrentLabel] = useState<string>(options[0]);

  useEffect(() => {
    if (currentValue === "") {
      setCurrentLabel(getInitialLabel());
    } else {
      setCurrentLabel(filter_trans(currentValue));
    }
  }, [currentValue]);

  const handleOptionClick = (val: string) => {
    if (setSortOrder && type === "sort") {
      const [orderValue, sortValue] = sortMapping[val];
      setSortOrder(orderValue, sortValue);
    }

    if (filterType && onFilterChange) {
      onFilterChange(filterType, val);
    }

    if (type === "filter") {
      setCurrentLabel(filter_trans(val));
    } else {
      setCurrentLabel(val);
    }
    setIsOpen(false);
  };

  const getLabel = () => {
    if (filterType === "gender") {
      return <label className="hidden text-2lg font-medium pc:block">성별을 선택해주세요</label>;
    } else if (filterType === "lessonType") {
      return (
        <label className="hidden text-2lg font-medium pc:block">어떤 서비스가 필요하세요?</label>
      );
    } else {
      return <label className="text-nowrap text-xl font-medium">지역</label>;
    }
  };

  if (type === "sort") {
    return (
      <div className="relative flex flex-col w-max">
        <SortMenu currentSort={currentLabel} onToggle={() => setIsOpen((prev) => !prev)} />
        {isOpen && <SortList options={options} onOptionClick={handleOptionClick} />}
      </div>
    );
  }

  if (filterType === "pastLesson") {
    return (
      <div className="relative flex flex-col w-56 pc:w-[19rem]">
        <PastLessonFilterMenu
          className={
            isOpen === true
              ? "border border-blue-300 text-blue-300 bg-blue-50"
              : "border border-gray-100"
          }
          currentQuote={currentLabel}
          onToggle={() => setIsOpen((prev) => !prev)}
        />
        {isOpen && <PastLessonFilterList options={options} onOptionClick={handleOptionClick} />}
      </div>
    );
  }

  if (type === "filter") {
    return (
      <div className="relative flex flex-col w-40 pc:w-full">
        <div className="flex flex-col gap-[1.6rem]">
          {getLabel()}
          <FilterMenu
            className={
              isOpen === true
                ? "border border-blue-300 text-blue-300 bg-blue-50"
                : "border border-gray-100"
            }
            currentFilter={currentLabel}
            onToggle={() => setIsOpen((prev) => !prev)}
          />
        </div>
        {isOpen && <FilterList options={options} onOptionClick={handleOptionClick} />}
      </div>
    );
  }
}
