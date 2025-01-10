import { useState } from "react";
import { FilterList, PastLessonFilterList, SortList } from "./DropdownList";
import { FilterMenu, PastLessonFilterMenu, SortMenu } from "./DropdownMenu";

interface DropdownProps {
  options: string[];
  type: "sort" | "filter" | "pastLesson";
  filterType?: "service" | "gender";
}

export default function Dropdown({ options, type, filterType }: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentSort, setCurrentSort] = useState<string>(options[0]);
  const [currentFilter, setCurrentFilter] = useState<string>(
    filterType === "service" ? "서비스" : "성별",
  );
  const [currentQuote, setCurrentQuote] = useState<string>(options[0]);

  const handleOptionClick = (val: string) => {
    setCurrentSort(val);
    setCurrentFilter(val);
    setCurrentQuote(val);
    setIsOpen(false);
  };

  if (type === "sort") {
    return (
      <div className="relative flex flex-col w-max">
        <SortMenu currentSort={currentSort} onToggle={() => setIsOpen((prev) => !prev)} />
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
            currentFilter={currentFilter}
            onToggle={() => setIsOpen((prev) => !prev)}
          />
        </div>
        {isOpen && <FilterList options={options} onOptionClick={handleOptionClick} />}
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
          currentQuote={currentQuote}
          onToggle={() => setIsOpen((prev) => !prev)}
        />
        {isOpen && <PastLessonFilterList options={options} onOptionClick={handleOptionClick} />}
      </div>
    );
  }
}
