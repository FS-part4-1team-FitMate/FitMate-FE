import clsx from "clsx";
import { useEffect, useState } from "react";
import { Trainer } from "@/types/trainer";
import FavoiriteTrainerCard from "../Cards/FavoriteTrainerCard";

export default function FavoriteTrainer({ trainerList }: { trainerList: Trainer[] }) {
  const [isUser, setIsUser] = useState<boolean | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    setIsUser(!!userData);
  }, []);

  return (
    <div className={clsx(!isUser ? "hidden" : "flex flex-col gap-[1.6rem] w-[32.7rem]")}>
      <p className="text-xl font-semibold">찜한 강사님</p>
      {trainerList.map(
        (trainer) =>
          trainer?.isFavorite === true && (
            <FavoiriteTrainerCard
              key={trainer.id}
              name={trainer.nickname}
              rating={trainer.profile.rating}
              reviewCount={trainer.profile.reviewCount}
              experience={trainer.profile.experience}
              lessonCount={trainer.profile.lessonCount}
              isFavorited={trainer.isFavorite}
              favoriteCount={trainer._count.favoritedByUsers}
              lessonType={trainer.profile.lessonType}
              size="sm"
            />
          ),
      )}
    </div>
  );
}
