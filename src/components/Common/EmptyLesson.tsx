import search from "@/assets/ic/ic_search_blue.svg";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { HorizontalLine } from "./Line";

export default function EmptyLesson({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-16 w-full h-screen mx-auto px-4 pc:py-16 pc:px-8 pc:max-w-[80rem] tablet:max-w-[74.5rem] mobile:max-w-[37.5rem]">
      <div className="flex flex-col items-center gap-4 pc:p-32 tablet:p-32">
        <Image src={search} width={200} height={200} alt="search icon" />
        <h1 className="text-gray-300 text-2xl font-bold text-nowrap">{message}</h1>
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
