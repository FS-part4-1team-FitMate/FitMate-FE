import clsx from "clsx";

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
  "shadow-card bg-gray-50",
  "z-10",
);

const sort_option = clsx(
  "cursor-pointer py-[0.6rem]",
  "pc:px-[0.8rem] tablet:px-[0.6rem] mobile:px-[0.6rem]",
);

const filter_option = clsx(
  "cursor-pointer",
  "pc:py-[1.6rem] tablet:py-[0.6rem] mobile:py-[0.6rem]",
  "pc:px-[2.4rem] tablet:px-[1.4rem] mobile:px-[1.4rem]",
);

export function SortList({ options, onOptionClick }: DropdownListProps) {
  return (
    <div className={sort_list}>
      {options.map((option, index) => (
        <div className={sort_option} key={index} onClick={() => onOptionClick(option)}>
          <p className="font-semibold pc:text-md tablet:text-xs mobile:text-xs">{option}</p>
        </div>
      ))}
    </div>
  );
}

export function FilterList({ options, onOptionClick }: DropdownListProps) {
  return (
    <div className={filter_list}>
      {options.map((option, index) => (
        <div className={filter_option} key={index} onClick={() => onOptionClick(option)}>
          <p className="font-medium pc:text-2lg tablet:text-md mobile:text-md">{option}</p>
        </div>
      ))}
    </div>
  );
}

export function PastLessonFilterList({ options, onOptionClick }: DropdownListProps) {
  return (
    <div className={filter_list}>
      {options.map((option, index) => (
        <div className={filter_option} key={index} onClick={() => onOptionClick(option)}>
          <p className="font-medium pc:text-2lg tablet:text-md mobile:text-md">{option}</p>
        </div>
      ))}
    </div>
  );
}
