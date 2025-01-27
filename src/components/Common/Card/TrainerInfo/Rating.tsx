import { ic_star_active_md } from "@/imageExports";
import Image from "next/image";

interface RatingProps {
  rating?: number;
  reviewCount?: number;
}

export default function Rating({ rating, reviewCount }: RatingProps) {
  return (
    <div className="flex gap-[0.2rem] pc:gap-[0.4rem]">
      <Image
        className="w-8 h-8 pc:w-[2.4rem] pc:h-[2.4rem]"
        src={ic_star_active_md}
        width={24}
        height={24}
        alt="별점"
      />
      <div className="flex gap-[0.2rem] pc:gap-[0.4rem]">
        <p className="text-sm font-medium pc:text-lg">{rating?.toFixed(1)}</p>
        <p className={"text-gray-300 text-sm font-medium pc:text-lg"}>({reviewCount})</p>
      </div>
    </div>
  );
}
