import { useUser } from "@/contexts/UserProvider";
import { img_non_review_md } from "@/imageExports";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getRejectedRequest } from "@/lib/api/requestService";
import RejectedRequestCard from "@/components/Cards/RejectedRequestCard";

type rejectedRequestQueryKey = [
  string,
  {
    trainer_id?: string;
    limit?: number;
  },
];

export default function RejectedRequest() {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const user = useUser();
  const trainerId = user?.id;

  console.log("trainerId:", trainerId);
  const queryKey: rejectedRequestQueryKey = [
    "rejectedRequest",
    {
      trainer_id: trainerId,
      limit: 10,
    },
  ];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    queryKey,
    ({ pageParam = 1 }) => {
      if (!trainerId) {
        throw new Error("Trainer ID is required");
      }
      return getRejectedRequest({
        pageParam,
        trainer_id: trainerId,
        limit: 10,
      });
    },
    {
      enabled: !!trainerId,
      getNextPageParam: (lastPage) => (lastPage.nextPage ? lastPage.nextPage : undefined),
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
    <div className="p-10 bg-gray-50 min-h-screen w-[75%] mx-auto">
      {data?.pages.some((page) => page?.list?.length > 0) ? (
        <div className="grid grid-cols-2 gap-4">
          {data.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page?.list?.map((quote: any) => <RejectedRequestCard key={quote.id} item={quote} />)}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-[2.4rem] w-full mx-auto py-[24rem] px-8">
          <Image src={img_non_review_md} alt="non-request" />
          <h1 className="text-gray-400 text-lg font-regular">반려된 견적이 없어요!</h1>
        </div>
      )}
      {isFetchingNextPage && <p className="text-center mt-6">로딩 중...</p>}
      <div ref={observerRef} className="h-10" />
    </div>
  );
}
