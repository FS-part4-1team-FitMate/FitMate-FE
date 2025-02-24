import { ic_square_check_active_md, ic_square_check_inactive_md } from "@/imageExports";
import Image from "next/image";
import { filter_trans } from "@/types/dropdown";
import { FilterCheck } from "@/types/lesson";

interface CheckboxFilterProps {
  label?: string;
  options: string[];
  filterType: "lessonType" | "gender" | "isDirectQuote" | "region";
  onFilterChange?: (filterType: string, value: string) => void;
  count?: { [key: string]: number };
  isChecked: { [key: string]: boolean };
  setIsChecked: React.Dispatch<React.SetStateAction<FilterCheck>>;
}

export default function CheckboxFilter({
  label,
  options,
  filterType,
  onFilterChange,
  isChecked,
  setIsChecked,
}: CheckboxFilterProps) {
  const handleCheckboxClick = (option: string) => {
    const updatedCheckedState = { ...isChecked, [option]: !isChecked[option] };
    setIsChecked((prevState) => ({
      ...prevState,
      [filterType]: updatedCheckedState,
    }));

    const selectedOptions = Object.keys(updatedCheckedState)
      .filter((option) => updatedCheckedState[option])
      .join(",");
    if (onFilterChange) {
      onFilterChange(filterType, selectedOptions);
    }
  };

  const handleSelectAll = () => {
    const allSelected = options.every((option) => isChecked[option]);
    const newCheckedState = options.reduce(
      (acc, option) => {
        acc[option] = !allSelected;
        return acc;
      },
      {} as { [key: string]: boolean },
    );

    setIsChecked((prevState) => ({
      ...prevState,
      [filterType]: newCheckedState,
    }));

    const selectedOptions = Object.keys(newCheckedState)
      .filter((option) => newCheckedState[option])
      .join(",");
    if (onFilterChange) {
      onFilterChange(filterType, selectedOptions);
    }
  };

  return (
    <div className="flex flex-col gap-2 pc:gap-[2.4rem]">
      <div className="flex flex-col pc:flex-row justify-between w-full py-[1.6rem] px-4 border-b border-line-200">
        <h1 className="text-nowrap text-lg pc:text-xl font-medium">{label}</h1>
        <div className="flex flex-row-reverse justify-between pc:flex-row pc:justify-end items-center w-full">
          <Image
            className="cursor-pointer w-[2.4rem] h-[2.4rem] pc:w-[3.6rem] pc:h-[3.6rem]"
            src={
              options.every((option) => isChecked[option])
                ? ic_square_check_active_md
                : ic_square_check_inactive_md
            }
            width={36}
            height={36}
            onClick={handleSelectAll}
            alt="체크박스"
          />
          <p className="text-gray-300 text-md font-normal pc:text-2lg">전체선택</p>
        </div>
      </div>
      <div className="flex flex-col pc:gap-[1.6rem]">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-[1.6rem] tablet:px-4 mobile:px-4 border-b border-line-100"
          >
            <p className="text-md font-medium pc:text-2lg">{filter_trans(option)}</p>
            <Image
              className="cursor-pointer w-[2.4rem] h-[2.4rem] pc:w-[3.6rem] pc:h-[3.6rem]"
              src={isChecked[option] ? ic_square_check_active_md : ic_square_check_inactive_md}
              width={36}
              height={36}
              onClick={() => handleCheckboxClick(option)}
              alt="체크박스"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
