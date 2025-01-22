import clsx from "clsx";
import { filter_trans } from "@/types/dropdown";

interface DropdownListProps {
  options: string[];
  onOptionClick: (val: string) => void;
}

const sort_list = clsx(
  "absolute top-[110%]",
  "flex flex-col justify-center gap-0.5 w-full",
  "border border-gray-100 rounded-[0.8rem]",
  "shadow-card bg-gray-50",
);

const filter_list = clsx(
  "absolute top-[110%]",
  "flex flex-col justify-center gap-0.5 w-full",
  "border border-gray-100 rounded-[1.6rem]",
  "shadow-card bg-gray-50 z-10",
);

export function SortList({ options, onOptionClick }: DropdownListProps) {
  return (
    <div className={sort_list}>
      {options.map((option, index) => (
        <div
          className="cursor-pointer py-[0.6rem] px-[0.6rem] pc:px-[0.8rem]"
          key={index}
          onClick={() => onOptionClick(option)}
        >
          <p className="text-xs font-semibold pc:text-md">{option}</p>
        </div>
      ))}
    </div>
  );
}

export function FilterList({ options, onOptionClick }: DropdownListProps) {
  const option_list = clsx(
    options.includes("SEOUL")
      ? "absolute top-[110%] grid grid-cols-2 w-full h-[32rem] border border-gray-100 rounded-[1.6rem] overflow-y-auto shadow-card bg-gray-50 z-10 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent"
      : filter_list,
  );
  return (
    <div className={option_list}>
      {options.map((option, index) => (
        <div
          className="hover:bg-blue-100 hover:text-blue-300 cursor-pointer py-[0.6rem] px-[1.4rem] border-r-[0.1rem] border-line-200 pc:py-[1.6rem] pc:px-[2.4rem]"
          key={index}
          onClick={() => onOptionClick(option)}
        >
          <p className="text-md font-medium pc:text-2lg">{filter_trans(option)}</p>
        </div>
      ))}
    </div>
  );
}

export function PastLessonFilterList({ options, onOptionClick }: DropdownListProps) {
  return (
    <div className={filter_list}>
      {options.map((option, index) => (
        <div
          className="cursor-pointer py-[0.6rem] px-[1.4rem] pc:py-[1.6rem] pc:px-[2.4rem]"
          key={index}
          onClick={() => onOptionClick(option)}
        >
          <p className="text-md font-medium pc:text-2lg">{filter_trans(option)}</p>
        </div>
      ))}
    </div>
  );
}
