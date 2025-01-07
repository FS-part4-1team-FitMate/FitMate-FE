import React, { useEffect, useRef} from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import FavoiriteTrainerCard from "@/components/Cards/FavoriteTrainerCard";
import { getFavoriteTrainers } from "@/lib/api/userService";

interface Trainer {
  id: number;
  rating: number;
  reviewCount: number;
  experience: number;
  lessonCount: number;
  isFavorited: boolean;
  favoriteCount: number;
}

const LikedTrainerPage = ({ userId }: { userId: string}) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ["favoriteTrainers", { userId }],
    getFavoriteTrainers,
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.hasMore) {
          return lastPage.nextPage;
        }
        return undefined;
      },
    }
  );

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [fetchNextPage, hasNextPage]);

  if (status === "loading") return <p>로딩 중...</p>;
  if (status === "error") return <p>오류가 발생했습니다.</p>;

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">찜한 강사님</h1>
      <div className="grid grid-cols-2 gap-4">
        {data?.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
            {page.trainers.map((trainer: Trainer) => (
                <FavoiriteTrainerCard
                key={trainer.id}
                rating={trainer.rating}
                reviewCount={trainer.reviewCount}
                experience={trainer.experience}
                lessonCount={trainer.lessonCount}
                isFavorited={trainer.isFavorited}
                favoriteCount={trainer.favoriteCount}
                />
            ))}
            </React.Fragment>
        ))}
        </div>
      {isFetchingNextPage && <p className="text-center mt-6">로딩 중...</p>}
      <div ref={observerRef} className="h-10" />
    </div>
  );
};

export default LikedTrainerPage;