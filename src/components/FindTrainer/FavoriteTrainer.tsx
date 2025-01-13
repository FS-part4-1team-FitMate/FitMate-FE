import { ic_profile_default_md } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import Experience from "../Common/Card/TrainerInfo/Experience";
import Favorite from "../Common/Card/TrainerInfo/Favorite";
import LessonCount from "../Common/Card/TrainerInfo/LessonCount";
import Rating from "../Common/Card/TrainerInfo/Rating";
import { VerticalLine } from "../Common/Line";

const container = clsx(
  "flex items-center gap-[1.2rem] w-full",
  " p-4 border border-line-100 rounded-[0.6rem] shadow-card",
);
/**
 *
 * @TODO replace any, items
 */
export default function FavoriteTrainer({ items }: { items: any }) {
  return (
    <div className="flex flex-col gap-[1.6rem] w-[32.7rem]">
      <p className="text-xl font-semibold">찜한 기사님</p>
      <div className={container}>
        <Image
          className="border-2 border-blue-400 rounded-full"
          src={ic_profile_default_md}
          width={46}
          height={46}
          alt="프로필 사진"
        />
        <div className="flex flex-col items-start w-full">
          <div className="flex justify-between items-center w-full">
            <p className="font-semibold text-md">{items.name} 강사님</p>
            <Favorite isFavorited={items.isFavorited} favoriteCount={items.favoriteCount} />
          </div>
          <div className="flex justify-between items-center w-full text-nowrap">
            <Rating rating={items.rating} reviewCount={items.reviewCount} />
            <VerticalLine height="1.4rem" />
            <Experience experience={items.experience} />
            <VerticalLine height="1.4rem" />
            <LessonCount lessonCount={items.lessonCount} />
          </div>
        </div>
      </div>
    </div>
  );
}
