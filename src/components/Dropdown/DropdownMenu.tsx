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

interface PastLessonMenuProps {
  className?: string;
  currentQuote: string;
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
  "px-[2.4rem] py-[1.6rem] rounded-[1.6rem]",
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
    <div className={`${filter_menu} border border-gray-100`} onClick={onToggle}>
      <p className="text-2lg font-medium">{currentFilter}</p>
      <Image src={ic_arrow_down_md_36x36} width={36} height={36} alt="메뉴 아이콘" priority />
    </div>
  );
}

export function PastLessonFilterMenu({ className, currentQuote, onToggle }: PastLessonMenuProps) {
  return (
    <div className={`${filter_menu} ${className}`} onClick={onToggle}>
      <p className="text-2lg font-medium">{currentQuote}</p>
      <div className={className === "border border-gray-100" ? "" : "text-blue-300"}>
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 14L18 22L26 14"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>{" "}
      </div>
    </div>
  );
}
