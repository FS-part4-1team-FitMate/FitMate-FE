import { img_landing_01, img_landing_02, img_landing_03 } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const service_container = clsx(
  "flex flex-col gap-[4.4rem] w-[32.7rem]",
  " pc:gap-[2.4rem] pc:flex-row pc:w-[122rem] pc:h-[59.8rem]",
);
const img_card = clsx(
  "relative flex flex-col justify-start items-start w-full h-[24rem]",
  "py-[4rem] px-[4.2rem] rounded-[3.2rem] shadow-card bg-blue-100",
);
const button = clsx(
  "flex-1 w-full h-[5.4rem] p-[1.6rem] rounded-[5rem] text-lg font-semibold",
  "pc:w-[34rem] pc:h-[6.4rem] pc:text-xl",
);

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-[4.8rem] h-screen m-auto py-[8rem] px-8 bg-bg-200">
      <h1 className="text-nowrap text-2xl font-semibold text-center pc:text-3lx">
        원하는 운동 유형을 확인하고
        <br />
        레슨을 받아보세요
      </h1>
      <div className={service_container}>
        <div className={`${img_card} bg-blue-100 pc:w-[43.2rem] pc:h-full`}>
          <p className="text-xl font-semibold pc:text-2.5xl">재활운동</p>
          <p className="text-gray-400 text-md font-normal pc:text-xl">스트레칭, 재활치료</p>
          <Image
            className="absolute right-8 bottom-0 w-[17rem] h-[17rem] pc:w-[34.8rem] pc:h-[34.8rem]"
            src={img_landing_01}
            width={348}
            height={348}
            alt="재활운동 이미지"
            priority
          />
        </div>
        <div className="flex flex-col gap-[4.4rem] pc:gap-[2.4rem]">
          <div className={`${img_card} bg-gray-50 pc:flex-1 pc:w-[76.4rem]`}>
            <p className="text-xl font-semibold pc:text-2.5xl">스포츠</p>
            <p className="text-gray-400 text-md font-normal pc:text-xl">
              축구, 테니스, 스키, 복싱, 주짓수 등
            </p>
            <Image
              className="absolute right-0 bottom-0 w-[32.5rem] h-[11.5rem] pc:w-[42.5rem] pc:h-[21.5rem]"
              src={img_landing_02}
              width={425}
              height={215}
              alt="스포츠 이미지"
              priority
            />
          </div>
          <div className={`${img_card} bg-gray-50 pc:flex-1 pc:w-[76.4rem]`}>
            <p className="text-xl font-semibold pc:text-2.5xl">피트니스</p>
            <p className="text-gray-400 text-md font-normal pc:text-xl">
              PT, 요가, 필라테스, 식단 관리
            </p>
            <Image
              className="absolute -right-10 bottom-0 w-[21.2rem] h-[14rem] pc:right-0 pc:w-[31.2rem] pc:h-[27.3rem]"
              src={img_landing_03}
              width={312}
              height={273}
              alt="피트니스 이미지"
              priority
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[1.1rem] max-w-[32.7rem] w-full pc:flex-row pc:max-w-fit">
        <button className={`${button} text-gray-50 bg-blue-300`}>
          <Link href="/login">로그인</Link>
        </button>
        <button className={`${button} border border-blue-300 text-blue-300 bg-gray-50`}>
          <Link href="/user/signup">회원가입</Link>
        </button>
      </div>
    </div>
  );
}
