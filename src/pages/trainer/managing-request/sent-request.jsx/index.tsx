import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getSentRequest } from "@/lib/api/requestService";
import SentRequestCard from "@/components/Cards/SentRequestCard";
import Tab from "@/components/Tab";
import { useUser } from "@/contexts/UserProvider";

type SentRequestQueryKey = [
  string,
  {
    trainer_id?: string;
    limit?: number;
  }
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
        },
      ]

      const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
      } = useInfiniteQuery(
        queryKey,
        ({ pageParam = 1 }) => {
          if (!trainerId) {
            throw new Error("Trainer ID is required");
          }
          return getSentRequest({
            pageParam,
            trainer_id: trainerId,
            limit: 10,
          });
        },
        {
          enabled: !!trainerId,
          getNextPageParam: (lastPage) =>
            lastPage.nextPage ? lastPage.nextPage : undefined,
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
      <Tab />
      <div className="grid grid-cols-2 gap-4">
        {data?.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.results.map((quote: any) => (
              <SentRequestCard key={quote.id} item={quote} />
            ))}
          </React.Fragment>
        ))}
      </div>
      {isFetchingNextPage && <p className="text-center mt-6">로딩 중...</p>}
      <div ref={observerRef} className="h-10" />
    </div>
  );
}