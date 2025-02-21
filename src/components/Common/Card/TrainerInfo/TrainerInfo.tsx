import { ic_profile_default_md } from "@/imageExports";
import clsx from "clsx";
import Image from "next/image";
import { VerticalLine } from "../../Line";
import Experience from "./Experience";
import Favorite from "./Favorite";
import LessonCount from "./LessonCount";
import Rating from "./Rating";

interface TrainerInfoProps {
  profileImage?: string | null;
  name?: string | null;
  rating?: number | null;
  reviewCount?: number | null;
  experience?: number | null;
  lessonCount?: number | null;
  isFavorited?: boolean | null;
  favoriteCount?: number | null;
  size?: "sm" | "lg";
}

export default function TrainerInfo({
  profileImage,
  name,
  rating,
  reviewCount,
  experience,
  lessonCount,
  isFavorited,
  favoriteCount,
  size = "lg",
}: TrainerInfoProps) {
  const container = clsx(
    "flex items-center gap-[1.2rem] w-full p-4",
    "border border-line-100 rounded-[0.6rem] shadow-card",
    size === "lg" && "pc:gap-[2.4rem] pc:py-[1.6rem] pc:px-[1.8rem]",
  );
  const img_profile = clsx(
    "border-2 border-blue-400 w-[4.6rem] h-[4.6rem] rounded-full",
    size === "lg" && "pc:w-[5.6rem] pc:h-[5.6rem]",
  );

  if (size === "lg") {
    return (
      <div className={container}>
        <Image
          className={profileImage ? profileImage : img_profile}
          src={ic_profile_default_md}
          objectFit="contain"
          width={56}
          height={56}
          alt="프로필 사진"
        />
        <div
          className={clsx(
            "flex flex-col flex-grow gap-[1.2rem]",
            size === "lg" && "pc:gap-[0.8rem]",
          )}
        >
          <div className="flex justify-between items-center">
            <p className={clsx("text-md font-semibold", size === "lg" && "pc:text-2lg")}>
              {name} 강사님
            </p>
            <Favorite isFavorited={isFavorited} favoriteCount={favoriteCount || 0} />
          </div>
          <div
            className={clsx(
              "flex justify-start items-center",
              size === "lg" && "gap-[0.8rem] pc:gap-[1.6rem]",
            )}
          >
            <Rating rating={rating || 0} reviewCount={reviewCount || 0} />
            <VerticalLine height="1.3rem" />
            <Experience experience={experience || 0} />
            <VerticalLine height="1.3rem" />
            <LessonCount lessonCount={lessonCount || 0} />
          </div>
        </div>
      </div>
    );
  }

  if (size === "sm") {
    return (
      <div className="flex items-center gap-[1.2rem] w-full p-4 border border-line-100 rounded-[0.6rem] shadow-card">
        <Image
          className="border-2 border-blue-400 w-[4.6rem] h-[4.6rem] rounded-full"
          src={profileImage ? profileImage : ic_profile_default_md}
          objectFit="contain"
          width={56}
          height={56}
          alt="프로필 사진"
        />
        <div className="flex flex-col flex-grow gap-4">
          <div className="flex justify-between items-center">
            <p className="text-md font-semibold">{name} 강사님</p>
            <Favorite isFavorited={isFavorited} favoriteCount={favoriteCount || 0} />
          </div>
          <div className="flex justify-between items-center">
            <Rating rating={rating || 0} reviewCount={reviewCount || 0} size="sm" />
            <VerticalLine height="1.2rem" />
            <Experience experience={experience || 0} size="sm" />
            <VerticalLine height="1.2rem" />
            <LessonCount lessonCount={lessonCount || 0} size="sm" />
          </div>
        </div>
      </div>
    );
  }
}
