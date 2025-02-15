import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFavoriteTrainers } from "@/lib/api/trainerService";
import FavoriteTrainerCard from "@/components/Cards/FavoriteTrainerCard";

export default function LikedTrainer() {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["favoriteTrainers"],
    ({ pageParam = 1 }) => getFavoriteTrainers({ page: pageParam, limit: 10 }),
    {
      getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextPage : undefined),
    }
  );

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

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {data?.pages.some((page) => page?.list?.length > 0) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page?.list?.map((trainer: any) => (
                <FavoriteTrainerCard key={trainer.id} {...trainer} />
              ))}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">찜한 트레이너가 없습니다.</p>
      )}
      {isFetchingNextPage && <p className="text-center mt-6">로딩 중...</p>}
      <div ref={observerRef} className="h-10" />
    </div>
  );
}