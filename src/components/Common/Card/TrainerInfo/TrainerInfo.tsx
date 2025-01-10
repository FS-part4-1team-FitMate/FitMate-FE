import { ic_profile_default_md } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import { VerticalLine } from "../../Line";
import Experience from "./Experience";
import Favorite from "./Favorite";
import LessonCount from "./LessonCount";
import Rating from "./Rating";

const container = clsx(
  "flex items-center w-full",
  "border border-line-100 rounded-[0.6rem] shadow-card",
  "pc:gap-[2.4rem] pc:py-[1.6rem] pc:px-[1.8rem]",
  "tablet:gap-[1.2rem] tablet:p-4",
  "mobile:gap-[1.2rem] mobile:p-4",
);
const img_profile = clsx(
  "border-2 border-blue-400 rounded-full",
  "pc:w-[5.6rem] tablet:w-[4.6rem] mobile:w-[4.6rem]",
  "pc:h-[5.6rem] tablet:h-[4.6rem] mobile:h-[4.6rem]",
);
const trainer_info = clsx(
  "flex flex-col flex-grow",
  "pc:gap-[0.8rem] tablet:gap-[1.2rem] mobile:gap-[1.2rem]",
);
const trainer_name = "font-semibold pc:text-2lg tablet:text-md mobile:text-md";
const info_details = clsx(
  "flex items-center",
  "pc:justify-start tablet:justify-start mobile:justify-between",
  "pc:gap-[1.6rem] tablet:gap-[0.8rem] mobile:gap-0",
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
      <div className={trainer_info}>
        <div className="flex justify-between items-center">
          <p className={trainer_name}>{name} 강사님</p>
          <Favorite isFavorited={isFavorited} favoriteCount={favoriteCount} />
        </div>
        <div className={info_details}>
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
