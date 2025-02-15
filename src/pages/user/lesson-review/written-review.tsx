import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyReviews } from "@/lib/api/ReviewService";
import MyReviewCard from "@/components/Cards/MyReviewCard";
import Pagination from "@/components/Common/Pagination";

export default function MyReviews() {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const { data, isLoading } = useQuery(["myReviews"], getMyReviews);

  if (isLoading) return <p>로딩 중...</p>;

  if (!data || !data.reviews || data.reviews.length === 0) {
    return <p>작성한 리뷰가 없습니다.</p>;
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedReviews = data.reviews.slice(startIndex, endIndex);

  return (
    <div className="p-10 bg-gray-50 min-h-screen w-[75%] mx-auto">
      <div className="grid grid-cols-2 gap-4">
        {paginatedReviews.map((review) => (
          <div key={review.createdAt} className="p-4 rounded-lg shadow-sm">
            <MyReviewCard review={review} />
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil((data.reviews.length || 1) / ITEMS_PER_PAGE)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}