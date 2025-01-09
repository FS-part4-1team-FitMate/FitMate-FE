import { ic_star_active_md } from "@/imageExports";
import Image from "next/image";

const container = "flex pc:gap-[0.4rem] tablet:gap-[0.2rem] mobile:gap-[0.2rem]";
const text = "font-medium pc:text-lg tablet:text-sm mobile:text-sm";
const star = "pc:w-[2.4rem] pc:h-[2.4rem] tablet:w-8 tablet:h-8 mobile:w-8 mobile:h-8";

interface RatingProps {
  rating?: number;
  reviewCount?: number;
}

export default function Rating({ rating, reviewCount }: RatingProps) {
  return (
    <div className={container}>
      <Image className={star} src={ic_star_active_md} width={24} height={24} alt="별점" />
      <div className={container}>
        <p className={text}>{rating?.toFixed(1)}</p>
        <p className={`${text} text-gray-300`}>({reviewCount})</p>
      </div>
    </div>
  );
}
