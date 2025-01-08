import { img_landing_01, img_landing_02, img_landing_03 } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const container = clsx(
  "flex flex-col items-center gap-[4.8rem]",
  "max-w-[192rem]",
  "m-auto px-[35rem] py-[8rem]",
  "bg-bg-200",
);
const title = "text-[3.6rem] leading-[5rem] font-semibold text-center";
const img_card = clsx(
  "relative",
  "flex flex-col flex-1 justify-start items-start",
  "py-[4rem] px-[4.2rem] rounded-[3.2rem]",
  "shadow-card bg-blue-100",
);
const service_label = "text-2.5xl font-semibold";
const service_detail = "text-gray-400 text-xl font-normal";
const service_container = clsx("flex gap-[2.4rem]", "w-[122rem] h-[59.8rem]");
const sports_fitness = "flex flex-col gap-[2.4rem]";
const buttons = "flex gap-[1.1rem]";
const button = clsx(
  "flex-1",
  "w-[34rem] h-[6.4rem]",
  "p-[1.6rem] rounded-[5rem]",
  "text-xl font-semibold",
);

export default function Home() {
  return (
    <div className={container}>
      <h1 className={title}>
        원하는 운동 유형을 확인하고
        <br />
        레슨을 받아보세요
      </h1>
      <div className={service_container}>
        <div className={`${img_card} w-[43.2rem] h-full bg-blue-100`}>
          <p className={service_label}>재활운동</p>
          <p className={service_detail}>스트레칭, 재활치료</p>
          <Image
            className="absolute bottom-0"
            src={img_landing_01}
            width={348}
            height={348}
            alt="재활운동 이미지"
            priority
          />
        </div>
        <div className={sports_fitness}>
          <div className={`${img_card} w-[76.4rem] bg-gray-50`}>
            <p className={service_label}>스포츠</p>
            <p className={service_detail}>축구, 테니스, 스키, 복싱, 주짓수 등</p>
            <Image
              className="absolute right-0 bottom-0"
              src={img_landing_02}
              alt="스포츠 이미지"
              priority
            />
          </div>
          <div className={`${img_card} w-[76.4rem] bg-gray-50`}>
            <p className={service_label}>피트니스</p>
            <p className={service_detail}>개인 트레이닝(PT), 요가, 필라테스, 식단 관리</p>
            <Image
              className="absolute right-0 bottom-0"
              src={img_landing_03}
              alt="피트니스 이미지"
              priority
            />
          </div>
        </div>
      </div>
      <div className={buttons}>
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
