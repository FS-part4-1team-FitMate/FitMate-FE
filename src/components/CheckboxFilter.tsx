import { ic_square_check_active_md, ic_square_check_inactive_md } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

const select_all = clsx(
  "flex items-center w-full",
  "pc:flex-row tablet:flex-row-reverse mobile:flex-row-reverse",
  "pc:justify-end tablet:justify-between mobile:justify-between",
);

interface CheckboxFilterProps {
  label?: string;
  options?: string[];
}

export default function CheckboxFilter({ label, options = [] }: CheckboxFilterProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isCheckedFilter, setIsCheckedFilter] = useState<boolean[]>(
    new Array(options.length).fill(false),
  );

  const handleCheckboxClick = (index: number) => {
    const updatedCheckedItems = [...isCheckedFilter];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setIsCheckedFilter(updatedCheckedItems);
  };

  const handleSelectAll = () => {
    const allChecked = isCheckedFilter.every((item) => item);
    setIsCheckedFilter(new Array(options.length).fill(!allChecked));
  };

  if (label === "지정 견적 요청") {
    return (
      <div className="flex justify-between items-center p-[1.6rem]">
        <p className="text-xl font-medium">지정 견적 요청 (10)</p>
        <Image
          className="cursor-pointer"
          src={isChecked ? ic_square_check_active_md : ic_square_check_inactive_md}
          width={36}
          height={36}
          onClick={() => setIsChecked((prev) => !prev)}
          alt="체크박스"
        />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-[2.4rem]">
        <div className="flex pc:justify-between w-[32.8rem] py-[1.6rem] px-4 border-b border-line-200">
          <h1 className="text-nowrap text-xl font-medium">{label}</h1>
          <div className={select_all}>
            <Image
              className="cursor-pointer"
              src={
                isCheckedFilter.every((item) => item)
                  ? ic_square_check_active_md
                  : ic_square_check_inactive_md
              }
              width={36}
              height={36}
              onClick={handleSelectAll}
              alt="체크박스"
            />
            <p className="text-gray-300 font-normal pc:text-2lg tablet:text-lg mobile:text-lg">
              전체선택
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[1.6rem]">
          {options.map((_, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-[1.6rem] tablet:px-4 mobile:px-4 border-b border-line-100"
            >
              <p className="font-medium pc:text-2lg tablet:text-lg mobile:text-lg">
                {options[index]} (10)
              </p>
              <Image
                className="cursor-pointer"
                src={
                  isCheckedFilter[index] ? ic_square_check_active_md : ic_square_check_inactive_md
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
}
