import { useUser } from "@/contexts/UserProvider";
import clsx from "clsx";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGetFavoriteTrainer } from "@/lib/api/queries/trainer";
import { Trainer } from "@/types/trainer";
import FavoriteTrainerCard from "../Cards/FavoriteTrainerCard";
import Loading from "../Common/Loading";

export default function FavoriteTrainer() {
  const user = useUser();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(user?.id ?? null);
  }, [user]);

  const {
    data: trainerList = [],
    isLoading,
    isError,
  } = useGetFavoriteTrainer(userId || "", { page: 1, limit: 100 });

  if (isLoading && userId) return <Loading />;
  if (isError) return toast.error("찜한 강사님 목록을 불러오는 중 에러가 발생했어요! 😢");

  return (
    <div className={clsx(!userId ? "hidden" : "flex flex-col gap-[1.6rem] w-[32.7rem]")}>
      <p className="text-xl font-semibold">찜한 강사님</p>
      {trainerList
        .slice(0, 3)
        .map(
          (trainer: Trainer) =>
            trainer?.isFavorite === true && (
              <FavoriteTrainerCard
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
