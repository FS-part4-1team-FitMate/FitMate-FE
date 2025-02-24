import { useUser } from "@/contexts/UserProvider";
import { img_non_review_md } from "@/imageExports";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getSentRequest } from "@/lib/api/requestService";
import SentRequestCard from "@/components/Cards/SentRequestCard";

type SentRequestQueryKey = [
  string,
  {
    trainer_id?: string;
    limit?: number;
    status?: string;
  },
];

export default function SentRequest() {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const user = useUser();
  const trainerId = user?.id;
  const queryKey: SentRequestQueryKey = [
    "sentRequest",
    {
      trainer_id: trainerId,
      limit: 10,
      status: "ACCEPTED",
    },
  ];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    queryKey,
    ({ pageParam = 1 }) => {
      if (!trainerId) {
        throw new Error("Trainer ID is required");
      }
      return getSentRequest({
        pageParam,
        trainer_id: trainerId,
        limit: 10,
        status: "ACCEPTED",
      });
    },
    {
      enabled: !!trainerId,
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
    <div className="p-10 bg-gray-50 min-h-screen w-full">
      {data?.pages.some((page) => page?.list?.length > 0) ? (
        <div className="pc:max-w-[140rem] tablet:max-w-[72rem] mx-auto grid grid-cols-1 gap-4 pc:grid-cols-2">
          {data.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page?.list?.map((quote: any) => <SentRequestCard key={quote.id} item={quote} />)}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-[2.4rem] mx-auto py-[24rem] px-[8rem]">
          <Image src={img_non_review_md} alt="non-request" width={160} height={160} />
          <h1 className="text-gray-400 text-lg font-regular">보낸 견적이 없어요!</h1>
        </div>
      )}
      {isFetchingNextPage && <p className="text-center mt-6">로딩 중...</p>}
      <div ref={observerRef} className="h-10" />
    </div>
  );
}
