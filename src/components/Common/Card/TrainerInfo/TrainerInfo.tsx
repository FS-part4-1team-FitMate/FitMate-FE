import { ic_profile_default_md } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import { VerticalLine } from "../../Line";
import Experience from "./Experience";
import Favorite from "./Favorite";
import LessonCount from "./LessonCount";
import Rating from "./Rating";

const container = clsx(
  "flex items-center gap-[1.2rem] w-full p-4",
  "border border-line-100 rounded-[0.6rem] shadow-card",
  "pc:gap-[2.4rem] pc:py-[1.6rem] pc:px-[1.8rem]",
);
const img_profile = clsx(
  "border-2 border-blue-400 w-[4.6rem] h-[4.6rem] rounded-full",
  "pc:w-[5.6rem] pc:h-[5.6rem]",
);

interface TrainerInfoProps {
  name?: string;
  rating?: number;
  reviewCount?: number;
  experience?: number;
  lessonCount?: number;
  isFavorited?: boolean;
  favoriteCount?: number;
}

export default function TrainerInfo({
  name,
  rating,
  reviewCount,
  experience,
  lessonCount,
  isFavorited,
  favoriteCount,
}: TrainerInfoProps) {
  return (
    <div className={container}>
      <Image
        className={img_profile}
        src={ic_profile_default_md}
        width={56}
        height={56}
        alt="프로필 사진"
      />
      <div className="flex flex-col flex-grow gap-[1.2rem] pc:gap-[0.8rem]">
        <div className="flex justify-between items-center">
          <p className="text-md font-semibold pc:text-2lg">{name} 강사님</p>
          <Favorite isFavorited={isFavorited} favoriteCount={favoriteCount} />
        </div>
        <div className="flex justify-start items-center gap-[0.8rem] pc:gap-[1.6rem]">
          <Rating rating={rating} reviewCount={reviewCount} />
          <VerticalLine height="1.4rem" />
          <Experience experience={experience} />
          <VerticalLine height="1.4rem" />
          <LessonCount lessonCount={lessonCount} />
        </div>
      </div>
    </div>
  );
}
