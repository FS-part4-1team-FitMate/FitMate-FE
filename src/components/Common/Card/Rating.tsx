import { ic_star_active_md } from "@/imageExports";
import Image from "next/image";

export default function Rating() {
  return (
    <div className="flex justify-center items-center gap-[0.6rem] h-12">
      <Image src={ic_star_active_md} width={24} height={24} alt="별점" />
      <div className="flex justify-center items-center gap-[0.6rem]">
        <p className="text-lg">5.0</p>
        <p className="text-gray-300 text-lg">(100)</p>
      </div>
    </div>
  );
}
