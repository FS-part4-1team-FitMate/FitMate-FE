import { ic_X_sm } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { GenderFilter, ServiceFilter } from "@/types/dropdown";
import CheckboxFilter from "../CheckboxFilter";

const container = clsx(
  "absolute left-0 right-0",
  "flex flex-col max-w-[37.5rem] mx-auto pt-[3.2rem] pb-16 px-[2.4rem] bg-gray-50",
  "tablet:top-[20%] tablet:bottom-auto mobile:bottom-0",
  "tablet:gap-[2.6rem] mobile:gap-[2.6rem]",
  "tablet:rounded-[3.2rem] mobile:rounded-b-none mobile:rounded-t-[3.2rem]",
);

interface ModalContainerProps {
  buttonText?: string;
  closeModal?: () => void;
}
export default function MobileFilter({ buttonText, closeModal }: ModalContainerProps) {
  const [activeTab, setActiveTab] = useState("service");

  const serviceFilter: ServiceFilter[] = ["재활운동", "스포츠", "피트니스"];
  const genderFilter: GenderFilter[] = ["남자", "여자"];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="fixed top-0 left-0  w-screen h-screen bg-black-400 bg-opacity-50 z-10">
      <div className={container}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[2.4rem]">
            <button
              className={`text-2lg ${activeTab === "service" ? "text-black-400 font-bold" : "text-gray-400 font-semibold"}`}
              onClick={() => handleTabClick("service")}
            >
              서비스
            </button>
            <button
              className={`text-2lg ${activeTab === "gender" ? "text-black-400 font-bold" : "text-gray-400 font-semibold"}`}
              onClick={() => handleTabClick("gender")}
            >
              성별
            </button>
            <button
              className={`text-2lg ${activeTab === "direct" ? "text-black-400 font-bold" : "text-gray-400 font-semibold"}`}
              onClick={() => handleTabClick("direct")}
            >
              지정 견적
            </button>
          </div>
          <Image
            className="cursor-pointer"
            src={ic_X_sm}
            width={24}
            height={24}
            onClick={closeModal}
            alt="모달 닫기 버튼"
          />
        </div>
        <div className="tab-content">
          {activeTab === "service" && <CheckboxFilter options={serviceFilter} />}
          {activeTab === "gender" && <CheckboxFilter options={genderFilter} />}
          {activeTab === "direct" && <CheckboxFilter label="지정 견적 요청" />}
        </div>
        <button className="w-full h-[6.4rem] mx-auto p-[1.6rem] rounded-[1.6rem] text-gray-50 text-xl font-semibold bg-gray-200">
          {buttonText}
        </button>
      </div>
    </div>
  );
}
