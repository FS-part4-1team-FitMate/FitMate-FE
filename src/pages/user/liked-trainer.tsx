import { img_non_review_md } from "@/imageExports";
import Image from "next/image";
import Link from "next/link";
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
    },
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <div className="bg-bg-200 min-h-screen w-full mx-auto">
      <h1 className="w-full py-10 px-20 bg-white text-2xl font-semibold pc:px-40">찜한 강사님</h1>
      <div className="max-w-[140rem] w-full mx-auto p-10">
        {data?.pages.some((page) => page?.trainers?.length > 0) ? (
          <div className="grid grid-cols-1 gap-x-[2.4rem] gap-y-[2.4rem] pc:gap-y-[3.2rem] pc:grid-cols-2">
            {data.pages.map((page, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {page?.trainers?.map((trainer: any) => (
                  <Link href={`/user/detail-trainer/${trainer.id}`}>
                    <FavoriteTrainerCard
                      key={trainer.id}
                      name={trainer.profile.name}
                      rating={trainer.profile?.rating || 0}
                      reviewCount={trainer.profile?.reviewCount || 0}
                      experience={trainer.profile?.experience || 0}
                      lessonCount={trainer.profile?.lessonCount || 0}
                      isFavorited={true}
                      favoriteCount={trainer._count?.favoritedByUsers || 0}
                      lessonType={trainer.profile?.lessonType || []}
                    />
                  </Link>
                ))}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-[2.4rem] py-[24rem] px-[8rem]">
            <Image src={img_non_review_md} alt="non-request" width={160} height={160} />
            <h1 className="text-gray-400 text-lg font-regular">찜한 강사님이 없어요!</h1>
          </div>
        )}
      </div>
      {isFetchingNextPage && <p className="text-center mt-6">로딩 중...</p>}
      <div ref={observerRef} className="h-10" />
    </div>
  );
}
