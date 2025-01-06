import { ic_profile_default_md } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import Experience from "./Experience";
import Favorite from "./Favorite";
import LessonCount from "./LessonCount";
import { VerticalLine } from "./Line";
import Rating from "./Rating";

const container = clsx(
  "flex items-start gap-[2.4rem]",
  "py-[1.6rem] px-[1.8rem]",
  "border border-line-100 rounded-[0.6rem]",
);
const trainer_info = "flex flex-col flex-grow gap-[0.8rem]";
const trainer_name = "text-2lg font-semibold";
const info_details = "flex items-center gap-[1.6rem]";

export default function TrainerInfo() {
  return (
    <div className={container}>
      <Image src={ic_profile_default_md} width={56} height={56} alt="프로필 사진" />
      <div className={trainer_info}>
        <p className={trainer_name}>김코드 강사님</p>
        <div className={info_details}>
          <Rating rating={4.8} reviewCount={238} />
          <VerticalLine height="1.4rem" />
          <Experience experience={3} />
          <VerticalLine height="1.4rem" />
          <LessonCount lessonCount={45} />
        </div>
      </div>
      <Favorite isFavorited={true} favoriteCount={26} />
    </div>
  );
}
