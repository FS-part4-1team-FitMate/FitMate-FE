import { useState } from "react";
import { FilterList, PastLessonFilterList, SortList } from "./DropdownList";
import { FilterMenu, PastLessonFilterMenu, SortMenu } from "./DropdownMenu";

interface DropdownProps {
  options: string[];
  type: "sort" | "filter" | "pastLesson";
  filterType?: "service" | "gender";
  setSortOrder?: (sort: string) => void;
  onFilterChange?: (selectedValue: string) => void;
}

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
      return filterType === "service" ? "서비스" : "성별";
    }
    return options[0];
  });

  const handleOptionClick = (val: string) => {
    if (setSortOrder) {
      setSortOrder(val);
    }

    if (onFilterChange) {
      onFilterChange(val);
    }

    setCurrentValue(val);
    setIsOpen(false);
  };

  const getFilteredOptions = () => {
    if (type === "filter") {
      if (filterType === "service") {
        return options.filter((option) => option.includes("서비스"));
      } else if (filterType === "gender") {
        return options.filter((option) => option.includes("성별"));
      }
    }
    return options;
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
      <div className="relative flex flex-col pc:w-[32.8rem] tablet:w-40 mobile:w-40">
        <div className="flex flex-col gap-[1.6rem]">
          {filterType === "gender" ? (
            <label className="text-2lg font-medium pc:block tablet:hidden mobile:hidden">
              성별을 선택해주세요
            </label>
          ) : (
            <label className="text-2lg font-medium pc:block tablet:hidden mobile:hidden">
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
        {isOpen && <FilterList options={getFilteredOptions()} onOptionClick={handleOptionClick} />}
      </div>
    );
  }

  if (type === "pastLesson") {
    return (
      <div className="relative flex flex-col pc:w-[19rem] tablet:w-56 mobile:w-56">
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
