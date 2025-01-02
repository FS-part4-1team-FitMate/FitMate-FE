import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import arrowDown from "../../../public/assets/ic/ic_arrow-down_xs-20x20.svg";

type Sort = "리뷰 많은 순" | "평점 높은 순" | "경력 높은 순" | "확정 횟수 많은 순";

export default function Sort() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const [currentSort, setCurrentSort] = useState<Sort>("리뷰 많은 순");

  const options: Sort[] = ["리뷰 많은 순", "평점 높은 순", "경력 높은 순", "확정 횟수 많은 순"];

  const buttonRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (val: Sort) => {
    setCurrentSort(val);
    setIsOpen(false);
  };

  useEffect(() => {
    if (buttonRef.current) {
      setDropdownWidth(buttonRef.current.offsetWidth);
    }
  }, [currentSort]);

  const dropdown_container = "flex flex-col w-max";
  const dropdown_menu =
    "relative bg-gray-100 flex justify-center items-center gap-0.5 p-1.5 rounded-lg cursor-pointer";
  const dropdwon_list =
    "absolute top-12 bg-gray-100 flex flex-col justify-center gap-0.5 rounded-lg";

  return (
    <div className={dropdown_container}>
      <div ref={buttonRef} className={dropdown_menu} onClick={() => setIsOpen((prev) => !prev)}>
        <p>{currentSort}</p>
        <Image src={arrowDown} width={20} height={20} alt="메뉴 화살표" priority />
      </div>

      {isOpen && (
        <div className={dropdwon_list} style={{ width: dropdownWidth }}>
          {options.map((option, index) => (
            <div
              className=" p-1.5 cursor-pointer"
              key={index}
              onClick={() => handleOptionClick(option)}
            >
              <p>{option}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
