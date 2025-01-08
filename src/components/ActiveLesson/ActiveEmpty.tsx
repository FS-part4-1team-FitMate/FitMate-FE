import { img_progress_md } from "@/imageExports";
import Image from "next/image";

export default function ActiveEmpty() {
  return (
    <div className="flex flex-col gap-8 m-auto">
      <Image src={img_progress_md} alt="active empty" />
      <h1 className="text-gray-300 text-xl font-semibold">진행 중인 레슨이 없습니다.</h1>
    </div>
  );
}
