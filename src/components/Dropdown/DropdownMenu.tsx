import { ic_arrow_down_md_36x36, ic_arrow_down_xs_20x20 } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface SortMenuProps {
  currentSort: string;
  onToggle: () => void;
}

interface FilterMenuProps {
  className?: string;
  currentQuote?: string;
  currentFilter?: string;
  onToggle: () => void;
}

const sort_menu = clsx(
  "flex justify-center items-center gap-5 w-full rounded-[0.8rem]",
  "bg-gray-50 cursor-pointer",
  "pc:p-[0.8rem] tablet:p-[0.6rem] mobile:p-[0.6rem]",
);

const filter_menu = clsx(
  "flex justify-between items-center w-full rounded-[1.6rem]",
  "bg-gray-50 cursor-pointer",
  "pc:h-[6.4rem] tablet:h-auto mobile:h-auto",
  "pc:py-[1.6rem] tablet:py-[0.6rem] mobile:py-[0.6rem]",
  "pc:px-[2.4rem] tablet:px-[1.3rem] mobile:px-[1.2rem]",
);

const icon = "pc:w-[3.6rem] pc:h-[3.6rem] tablet:w-8 tablet:h-8 mobile:w-8 mobile:h-8";

export function SortMenu({ currentSort, onToggle }: SortMenuProps) {
  return (
    <div className={sort_menu} onClick={onToggle}>
      <p className="font-semibold pc:text-md tablet:text-xs mobile:text-xs">{currentSort}</p>
      <div className="text-gray-200">
        <Image
          className={icon}
          src={ic_arrow_down_xs_20x20}
          width={20}
          height={20}
          alt="메뉴 아이콘"
          priority
        />
      </div>
    </div>
  );
}

export function FilterMenu({ className, currentFilter, onToggle }: FilterMenuProps) {
  return (
    <div className={`${filter_menu} ${className}`} onClick={onToggle}>
      <p className="font-medium pc:text-2lg tablet:text-md mobile:text-md">{currentFilter}</p>
      <div className={className === "border border-gray-100" ? "" : "text-blue-300"}>
        <svg
          className={icon}
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
        </svg>
      </div>
    </div>
  );
}

export function PastLessonFilterMenu({ className, currentQuote, onToggle }: FilterMenuProps) {
  return (
    <div className={`${filter_menu} ${className}`} onClick={onToggle}>
      <p className="font-medium pc:text-2lg tablet:text-md mobile:text-md">{currentQuote}</p>
      <div className={className === "border border-gray-100" ? "" : "text-blue-300"}>
        <svg
          className={icon}
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
        </svg>
      </div>
    </div>
  );
}
