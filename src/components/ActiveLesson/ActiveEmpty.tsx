import Link from "next/link";
import Button from "../Common/Button";
import { HorizontalLine } from "../Common/Line";

export default function ActiveEmpty() {
  return (
    <div className="flex flex-col items-center gap-16 w-full h-screen m-auto pc:max-w-[80rem] tablet:max-w-[74.5rem] mobile:max-w-[37.5rem]">
      <div className="flex flex-col gap-4 p-[8rem]">
        <svg
          width="200"
          height="200"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="15.7279"
            cy="16.9492"
            r="8"
            transform="rotate(-45 15.7279 16.9492)"
            stroke="#4DA9FF"
            stroke-width="2"
          />
          <path
            d="M22.4243 23.4238L26.1242 27.1238"
            stroke="#4DA9FF"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <h1 className="text-gray-300 text-2xl font-bold text-nowrap">진행 중인 레슨이 없습니다.</h1>
      </div>
      <HorizontalLine width="100%" />
      <div className="flex flex-col gap-8 w-full text-md font-regular pc:text-lg">
        <div className="flex justify-between items-center">
          <p>아직 레슨 요청을 하지 않으셨다면?</p>
          <Button className="hover:text-blue-300 hover:bg-blue-100 hover:border hover:border-blue-300 px-6 rounded-3xl text-md text-white font-semibold bg-blue-300">
            <Link href="/user/create-request">레슨 요청하러 가기</Link>
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <p>
            요청한 레슨에 <br className="pc:hidden tablet:hidden mobile:block" />
            강사님을 직접 지정하고 싶다면?
          </p>
          <Button className="hover:text-blue-300 hover:bg-blue-100 hover:border hover:border-blue-300 px-6 rounded-3xl text-md text-white font-semibold bg-blue-300">
            <Link href="/user/find-trainer">강사님 찾기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
