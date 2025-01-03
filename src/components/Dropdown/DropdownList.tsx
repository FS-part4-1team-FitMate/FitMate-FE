import clsx from "clsx";

interface SortListProps {
  className?: string;
  options: string[];
  dropdownWidth?: number;
  onOptionClick: (val: string) => void;
}

const sort_list = clsx(
  "absolute top-14",
  "flex flex-col justify-center gap-0.5",
  "w-full",
  "border border-gray-100 rounded-2xl",
  "bg-gray-50",
);

const filter_list = clsx(
  "absolute top-24",
  "flex flex-col justify-center gap-0.5",
  "w-full",
  "border border-gray-100 rounded-2xl",
  "bg-gray-50",
);

export function SortList({ options, onOptionClick }: SortListProps) {
  return (
    <div className={sort_list}>
      {options.map((option, index) => (
        <div className={"p-1.5 cursor-pointer"} key={index} onClick={() => onOptionClick(option)}>
          <p className="text-md font-semibold">{option}</p>
        </div>
      ))}
    </div>
  );
}

export function FilterList({ options, onOptionClick }: SortListProps) {
  return (
    <div className={filter_list} style={{ width: "inherit" }}>
      {options.map((option, index) => (
        <div
          className={"px-6 py-4 cursor-pointer"}
          key={index}
          onClick={() => onOptionClick(option)}
        >
          <p className="text-2lg font-medium">{option}</p>
        </div>
      ))}
    </div>
  );
}
