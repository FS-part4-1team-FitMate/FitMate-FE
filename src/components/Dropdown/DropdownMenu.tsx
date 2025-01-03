import clsx from "clsx";
import Image from "next/image";
import React from "react";
import filterArrowDown from "../../../public/assets/ic/ic_arrow-down_md-36x36.svg";
import sortArrowDown from "../../../public/assets/ic/ic_arrow-down_xs-20x20.svg";

interface SortMenuProps {
  currentSort: string;
  onToggle: () => void;
}

interface FilterMenuProps {
  currentFilter: string;
  onToggle: () => void;
}

const sort_menu = clsx(
  "flex justify-center items-center gap-1.5",
  "w-full",
  "p-2 rounded-lg",
  "bg-gray-50",
  "cursor-pointer",
);

const filter_menu = clsx(
  "flex justify-between items-center",
  "w-full h-16",
  "px-6 py-4 border border-gray-100 rounded-2xl",
  "bg-gray-50",
  "cursor-pointer",
);

export function SortMenu({ currentSort, onToggle }: SortMenuProps) {
  return (
    <div className={sort_menu} onClick={onToggle}>
      <p className="text-md font-semibold">{currentSort}</p>
      <div className="text-gray-200">
        <Image src={sortArrowDown} width={20} height={20} alt="메뉴 아이콘" priority />
      </div>
    </div>
  );
}

export function FilterMenu({ currentFilter, onToggle }: FilterMenuProps) {
  return (
    <div className={filter_menu} onClick={onToggle}>
      <p className="text-2lg font-medium">{currentFilter}</p>
      <Image src={filterArrowDown} width={36} height={36} alt="메뉴 아이콘" priority />
    </div>
  );
}
