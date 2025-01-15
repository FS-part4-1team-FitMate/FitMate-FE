import React, { useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import SentRequestCard from "@/components/Cards/SentRequestCard";
import { getRejectedQuote } from "@/lib/api/quoteService";

export default function RejectedQuotesList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery<PaginatedResponse<RejectedQuote>>(
    ["rejectedQuotes"],
    getRejectedQuote,
    {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    }
  );

  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasNextPage, fetchNextPage]
  );

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.data.map((item, itemIndex) => {
            const isLastItem =
              pageIndex === data.pages.length - 1 &&
              itemIndex === page.data.length - 1;
            return (
              <div
                key={item.id}
                ref={isLastItem ? lastElementRef : undefined}
              >
                <SentRequestCard item={item} />
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
}