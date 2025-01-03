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
  "flex justify-center items-center gap-3",
  "w-full",
  "p-[0.8rem] rounded-[0.8rem]",
  "bg-gray-50",
  "cursor-pointer",
);

const filter_menu = clsx(
  "flex justify-between items-center",
  "w-full h-[6.4rem]",
  "px-[2.4rem] py-[1.6rem] border border-gray-100 rounded-[1.6rem]",
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
