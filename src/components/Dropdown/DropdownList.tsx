import clsx from "clsx";

interface DropdownListProps {
  options: string[];
  onOptionClick: (val: string) => void;
}

const sort_list = clsx(
  "absolute top-[4.3rem]",
  "flex flex-col justify-center gap-0.5",
  "w-full",
  "border border-gray-100 rounded-[0.8rem]",
  "shadow-card bg-gray-50",
);

const filter_list = clsx(
  "absolute top-[11.3rem]",
  "flex flex-col justify-center gap-2.5",
  "w-full",
  "border border-gray-100 rounded-[1.6rem]",
  "shadow-card bg-gray-50",
  "z-10",
);

const quote_list = clsx(
  "absolute top-[7rem]",
  "flex flex-col justify-center gap-0.5",
  "w-full",
  "border border-gray-100 rounded-[1.6rem]",
  "shadow-card bg-gray-50",
);

export function SortList({ options, onOptionClick }: DropdownListProps) {
  return (
    <div className={sort_list}>
      {options.map((option, index) => (
        <div
          className={"pl-[0.8rem] py-[0.6rem] pr-[0.6rem] cursor-pointer"}
          key={index}
          onClick={() => onOptionClick(option)}
        >
          <p className="text-md font-semibold">{option}</p>
        </div>
      ))}
    </div>
  );
}

export function FilterList({ options, onOptionClick }: DropdownListProps) {
  return (
    <div className={filter_list}>
      {options.map((option, index) => (
        <div
          className={"px-[2.4rem] py-[1.6rem] cursor-pointer"}
          key={index}
          onClick={() => onOptionClick(option)}
        >
          <p className="text-2lg font-medium">{option}</p>
        </div>
      ))}
    </div>
  );
}

export function PastLessonFilterList({ options, onOptionClick }: DropdownListProps) {
  return (
    <div className={quote_list}>
      {options.map((option, index) => (
        <div
          className={"px-[2.4rem] py-[1.6rem] cursor-pointer"}
          key={index}
          onClick={() => onOptionClick(option)}
        >
          <p className="text-2lg font-medium">{option}</p>
        </div>
      ))}
    </div>
  );
}
