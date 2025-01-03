import { useState } from "react";
import { FilterList, SortList } from "./DropdownList";
import { FilterMenu, SortMenu } from "./DropdownMenu";

interface DropdownProps {
  options: string[];
  type: "sort" | "filter" | "profile";
  filterType?: "service" | "gender";
}

export default function Dropdown({ options, type, filterType }: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentSort, setCurrentSort] = useState<string>(options[0]);
  const [currentFilter, setCurrentFilter] = useState<string>(
    filterType === "service" ? "서비스" : "성별",
  );

  const handleOptionClick = (val: string) => {
    setCurrentSort(val);
    setCurrentFilter(val);
    setIsOpen(false);
  };

  if (type === "sort") {
    return (
      <div className="relative flex flex-col w-max">
        <SortMenu currentSort={currentSort} onToggle={() => setIsOpen((prev) => !prev)} />
        {isOpen && (
          <SortList className="w-full" options={options} onOptionClick={handleOptionClick} />
        )}
      </div>
    );
  }

  if (type === "filter") {
    return (
      <div className="relative flex flex-col w-[328px]">
        <div className="flex flex-col">
          {filterType === "gender" ? (
            <label className="text-2lg font-medium">성별을 선택해주세요</label>
          ) : (
            <label className="text-2lg font-medium">어떤 서비스가 필요하세요?</label>
          )}
          <FilterMenu currentFilter={currentFilter} onToggle={() => setIsOpen((prev) => !prev)} />
        </div>
        {isOpen && <FilterList options={options} onOptionClick={handleOptionClick} />}
      </div>
    );
  }

  if (type === "profile") {
    return (
      <div className="flex flex-col w-max">
        <SortMenu currentSort={currentSort} onToggle={() => setIsOpen((prev) => !prev)} />
        {isOpen && <FilterList options={options} onOptionClick={handleOptionClick} />}
      </div>
    );
  }
}
