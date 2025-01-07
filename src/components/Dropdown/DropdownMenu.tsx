import { ic_arrow_down_md_36x36, ic_arrow_down_xs_20x20 } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface SortMenuProps {
  currentSort: string;
  onToggle: () => void;
}

interface FilterMenuProps {
  currentFilter: string;
  onToggle: () => void;
}

const sort_menu = clsx(
  "flex justify-center items-center gap-5",
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
        <Image src={ic_arrow_down_xs_20x20} width={20} height={20} alt="메뉴 아이콘" priority />
      </div>
    </div>
  );
}

export function FilterMenu({ currentFilter, onToggle }: FilterMenuProps) {
  return (
    <div className={filter_menu} onClick={onToggle}>
      <p className="text-2lg font-medium">{currentFilter}</p>
      <Image src={ic_arrow_down_md_36x36} width={36} height={36} alt="메뉴 아이콘" priority />
    </div>
  );
}
