import { ic_profile_default_md } from "@/imageExports";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getFavoriteTrainers } from "@/lib/api/trainerService";
import { Trainer } from "@/types/trainer";
import Experience from "../Common/Card/TrainerInfo/Experience";
import Favorite from "../Common/Card/TrainerInfo/Favorite";
import LessonCount from "../Common/Card/TrainerInfo/LessonCount";
import Rating from "../Common/Card/TrainerInfo/Rating";
import { VerticalLine } from "../Common/Line";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const favoriteList = await getFavoriteTrainers();

    return {
      props: {
        favoriteList,
      },
    };
  } catch (error) {
    return {
      props: {
        favoriteList: null,
      },
    };
  }
};

export default function FavoriteTrainer({ favoriteList = [] }: { favoriteList?: Trainer[] }) {
  const [isUser, setIsUser] = useState<boolean | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    setIsUser(!!userData);
  }, []);

  return (
    <div className={clsx(!isUser ? "hidden" : "flex flex-col gap-[1.6rem] w-[32.7rem]")}>
      <p className="text-xl font-semibold">찜한 강사님</p>
      {favoriteList.map((item) => (
        <div
          className={clsx(
            "flex items-center gap-[1.2rem] w-full",
            " p-4 border border-line-100 rounded-[0.6rem] shadow-card",
          )}
        >
          <Image
            className="border-2 border-blue-400 rounded-full"
            src={item.profile.profileImage || ic_profile_default_md}
            width={46}
            height={46}
            alt="프로필 사진"
          />
          <div className="flex flex-col items-start w-full">
            <div className="flex justify-between items-center w-full">
              <p className="font-semibold text-md">{item.nickname} 강사님</p>
              <Favorite isFavorited={item.isFavorite} favoriteCount={20} />
            </div>
            <div className="flex justify-between items-center w-full text-nowrap">
              <Rating rating={item.profile.rating} reviewCount={item.profile.reviewCount} />
              <VerticalLine height="1.4rem" />
              <Experience experience={item.profile.experience} />
              <VerticalLine height="1.4rem" />
              <LessonCount lessonCount={item.profile.lessonCount} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
