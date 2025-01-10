import { ic_X_md } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import { ReactNode } from "react";

const container = clsx(
  "absolute left-0 right-0",
  "flex flex-col w-fit mx-auto pt-[3.2rem] pb-16 px-[2.4rem] bg-gray-50",
  "pc:top-[10%] pc:bottom-auto tablet:top-[10%] tablet:bottom-auto mobile:bottom-0",
  "pc:gap-16 tablet:gap-[2.6rem] mobile:gap-[2.6rem]",
  "pc:rounded-[3.2rem] tablet:rounded-[3.2rem] mobile:rounded-b-none mobile:rounded-t-[3.2rem]",
);

const icon = clsx(
  "cursor-pointer",
  "pc:w-[3.6rem] pc:h-[3.6rem] tablet:w-[2.4rem] tablet:h-[2.4rem] mobile:w-[2.4rem] mobile:h-[2.4rem]",
);

interface ModalContainerProps {
  title?: string;
  children?: ReactNode;
  buttonText?: string;
  closeModal?: () => void;
}

export default function ModalContainer({
  title,
  children,
  buttonText,
  closeModal,
}: ModalContainerProps) {
  return (
    <div className="fixed top-0 left-0  w-screen h-screen bg-black-400 bg-opacity-50 z-10">
      <div className={container}>
        <div className="flex justify-between items-center">
          <h1 className="font-bold pc:text-2xl tablet:text-2lg mobile:text-2lg">{title}</h1>
          <Image
            className={icon}
            src={ic_X_md}
            width={36}
            height={36}
            onClick={closeModal}
            alt="모달 닫기 버튼"
          />
        </div>
        {children}
        <button className="w-full h-[6.4rem] mx-auto p-[1.6rem] rounded-[1.6rem] text-gray-50 text-xl font-semibold bg-gray-200">
          {buttonText}
        </button>
      </div>
    </div>
  );
}
