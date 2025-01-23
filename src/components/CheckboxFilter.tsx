import { ic_square_check_active_md, ic_square_check_inactive_md } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { filter_trans } from "@/types/dropdown";

interface CheckboxFilterProps {
  label?: string;
  options: string[];
  filterType: "lessonType" | "gender" | "direct" | "region";
  onFilterChange?: (filterType: string, value: string) => void;
  count?: { [key: string]: number };
  isChecked: boolean[];
  setIsChecked: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export default function CheckboxFilter({
  label,
  options,
  filterType,
  onFilterChange,
  count = {},
  isChecked,
  setIsChecked,
}: CheckboxFilterProps) {
  const safeCheckedState = isChecked?.length ? isChecked : new Array(options.length).fill(false);

  const handleCheckboxClick = (index: number) => {
    const updatedCheckedState = [...isChecked];
    updatedCheckedState[index] = !updatedCheckedState[index];
    setIsChecked(updatedCheckedState);

    const selectedOptions = options.filter((_, idx) => updatedCheckedState[idx]).join(",");
    if (onFilterChange) {
      onFilterChange(filterType, selectedOptions);
    }
  };

  const handleSelectAll = () => {
    const newCheckedState = isChecked.every((checked) => checked)
      ? new Array(options.length).fill(false)
      : new Array(options.length).fill(true);
    setIsChecked(newCheckedState);

    if (onFilterChange) {
      const selectedOptions = newCheckedState.every(Boolean) ? options.join(",") : "";
      onFilterChange(filterType, selectedOptions);
    }
  };

  return (
    <div className="flex flex-col gap-[2.4rem]">
      <div className="flex pc:justify-between w-[32.8rem] py-[1.6rem] px-4 border-b border-line-200">
        <h1 className="text-nowrap text-xl font-medium">{label}</h1>
        <div
          className={clsx(
            "flex flex-row-reverse justify-between items-center w-full",
            "pc:flex-row pc:justify-end",
          )}
        >
          <Image
            className="cursor-pointer"
            src={
              safeCheckedState.every((item) => item)
                ? ic_square_check_active_md
                : ic_square_check_inactive_md
            }
            width={36}
            height={36}
            onClick={handleSelectAll}
            alt="체크박스"
          />
          <p className="text-gray-300 text-lg font-normal pc:text-2lg">전체선택</p>
        </div>
      </div>
      <div className={filterType === "region" ? "grid grid-cols-3" : "flex flex-col gap-[1.6rem]"}>
        {options.map((option, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-[1.6rem] tablet:px-4 mobile:px-4 border-b border-line-100"
          >
            <p className="text-lg font-medium pc:text-2lg">
              {filterType === "region"
                ? `${filter_trans(option)}`
                : `${filter_trans(option)} (${count[option]})`}
            </p>
            <Image
              className="cursor-pointer"
              src={
                safeCheckedState[index] ? ic_square_check_active_md : ic_square_check_inactive_md
              }
              width={36}
              height={36}
              onClick={() => handleCheckboxClick(index)}
              alt="체크박스"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
