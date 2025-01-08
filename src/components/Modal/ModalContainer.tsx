import { ic_X_md } from "@/imageExports";
import Image from "next/image";
import { ReactNode } from "react";

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
    <div className="fixed top-0 left-0 w-screen h-screen bg-black-400 bg-opacity-50 z-10">
      <div className="absolute top-[8.6rem] left-0 right-0 flex flex-col gap-16 w-fit mx-auto py-[3.2rem] px-[2.4rem] rounded-[3.2rem] bg-gray-50">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">견적 보내기</h1>
          <Image
            className="cursor-pointer"
            src={ic_X_md}
            width={36}
            height={36}
            onClick={closeModal}
            alt="모달 닫기 버튼"
          />
        </div>
        {children}
        <button className="w-[56rem] h-[6.4rem] mx-auto p-[1.6rem] rounded-[1.6rem] text-gray-50 text-xl font-semibold bg-gray-200">
          견적 보내기
        </button>
      </div>
    </div>
  );
}
