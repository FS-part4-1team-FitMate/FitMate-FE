import { ic_star_active_md } from "@/imageExports";
import Image from "next/image";

const container = "flex items-center gap-[0.6rem]";
const text = "text-lg font-medium";

interface RatingProps {
  rating?: number;
  reviewCount?: number;
}

export default function Rating({ rating, reviewCount }: RatingProps) {
  return (
    <div className={container}>
      <Image src={ic_star_active_md} width={24} height={24} alt="별점" />
      <div className={container}>
        <p className={text}>{rating?.toFixed(1)}</p>
        <p className={`${text} text-gray-300`}>({reviewCount})</p>
      </div>
    </div>
  );
}
