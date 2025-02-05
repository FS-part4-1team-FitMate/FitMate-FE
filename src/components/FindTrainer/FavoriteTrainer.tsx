import clsx from "clsx";
import { useEffect, useState } from "react";
import { Trainer } from "@/types/trainer";
import FavoiriteTrainerCard from "../Cards/FavoriteTrainerCard";

export default function FavoriteTrainer({ list }: { list: Trainer[] }) {
  const [isUser, setIsUser] = useState<boolean | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    setIsUser(!!userData);
  }, []);

  const filteredList = list.filter((item) => {
    return item?.isFavorite === true;
  });

  return (
    <div className={clsx(!isUser ? "hidden" : "flex flex-col gap-[1.6rem] w-[45rem]")}>
      <p className="text-xl font-semibold">찜한 강사님</p>
      {filteredList.map((item) => (
        <FavoiriteTrainerCard
          key={item.id}
          name={item.nickname}
          rating={item.profile.rating}
          reviewCount={item.profile.reviewCount}
          experience={item.profile.experience}
          lessonCount={item.profile.lessonCount}
          isFavorited={item.isFavorite}
          favoriteCount={item._count.favoritedByUsers}
          lessonType={item.profile.lessonType}
        />
      ))}
    </div>
  );
}
