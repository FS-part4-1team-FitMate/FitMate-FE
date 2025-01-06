import { ic_star_active_md } from "@/imageExports";
import Image from "next/image";

const container = "flex items-center gap-[0.6rem]";
const text = "text-lg font-medium";

export default function Rating() {
  return (
    <div className={container}>
      <Image src={ic_star_active_md} width={24} height={24} alt="별점" />
      <div className={container}>
        <p className={text}>5.0</p>
        <p className={`${text} text-gray-300`}>(100)</p>
      </div>
    </div>
  );
}
