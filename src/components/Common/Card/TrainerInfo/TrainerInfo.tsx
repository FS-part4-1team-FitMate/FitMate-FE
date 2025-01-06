import { ic_profile_default_md } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import { VerticalLine } from "../Line";
import Experience from "./Experience";
import Favorite from "./Favorite";
import LessonCount from "./LessonCount";
import Rating from "./Rating";

const container = clsx(
  "flex items-start gap-[2.4rem]",
  "py-[1.6rem] px-[1.8rem]",
  "border border-line-100 rounded-[0.6rem]",
);
const trainer_info = "flex flex-col flex-grow gap-[0.8rem]";
const trainer_name = "text-2lg font-semibold";
const info_details = "flex items-center gap-[1.6rem]";

interface TrainerInfoProps {
  rating: number;
  reviewCount: number;
  experience: number;
  lessonCount: number;
  isFavorited: boolean;
  favoriteCount: number;
}

export default function TrainerInfo({
  rating,
  reviewCount,
  experience,
  lessonCount,
  isFavorited,
  favoriteCount,
}: TrainerInfoProps) {
  return (
    <div className={container}>
      <Image src={ic_profile_default_md} width={56} height={56} alt="프로필 사진" />
      <div className={trainer_info}>
        <p className={trainer_name}>김코드 강사님</p>
        <div className={info_details}>
          <Rating rating={rating} reviewCount={reviewCount} />
          <VerticalLine height="1.4rem" />
          <Experience experience={experience} />
          <VerticalLine height="1.4rem" />
          <LessonCount lessonCount={lessonCount} />
        </div>
      </div>
      <Favorite isFavorited={isFavorited} favoriteCount={favoriteCount} />
    </div>
  );
}
