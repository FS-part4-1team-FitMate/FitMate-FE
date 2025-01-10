import React, { useRef, useEffect } from "react";
import SentRequestCard from "@/components/Cards/SentRequestCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getSentRequest } from "@/lib/api/requestService";

export default function SentRequest() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
      } = useInfiniteQuery(
        ["sentRequest", { lessonQuoteId }],
        getSentRequest,
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
          <h1 className="text-2xl font-bold mb-6">보낸 견적 조회</h1>
          <h1 className="text-2xl font-bold mb-6">반려 요청</h1>
          <div className="grid grid-cols-2 gap-4">
            {data?.pages.map((page, pageIndex) => (
                <React.Fragment key={pageIndex}>
                {page.lessons.map((lesson: Lesson) => (
                    <SentRequestCard
                     item={lesson}
                    />
                ))}
                </React.Fragment>
            ))}
            </div>
          {isFetchingNextPage && <p className="text-center mt-6">로딩 중...</p>}
          <div ref={observerRef} className="h-10" />
        </div>
      );
}