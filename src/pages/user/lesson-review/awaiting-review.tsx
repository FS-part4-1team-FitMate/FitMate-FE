import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getReviewableQuotes } from "@/lib/api/ReviewService";
import WriteReviewCard from "@/components/Cards/writeReviewCard";
import Pagination from "@/components/Common/Pagination";
import ReviewModal from "@/components/Modal/ReviewModal";
import { ReviewableList } from "@/types/reviews";

export default function AwaitingReview() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ReviewableList | null>(null);

  const ITEMS_PER_PAGE = 6;

  const { data, isLoading } = useQuery([
    "reviews",
    { page: currentPage, limit: ITEMS_PER_PAGE },
  ], () => getReviewableQuotes({ page: currentPage, limit: ITEMS_PER_PAGE }), {
    keepPreviousData: true,
  });

  if (isLoading) return <p>로딩 중...</p>;

  if (!data || !data.list || data.list.length === 0) {
    return <p>작성 가능한 리뷰가 없습니다.</p>;
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleWriteReview = (review: ReviewableList) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-2 gap-4">
        {data?.list?.length > 0 ? (
          data?.list.map((item) => (
            <div key={item.id} className="p-4 border rounded-lg shadow-sm">
              <WriteReviewCard
                item={item}
                onClick={() => handleWriteReview(item)}
              />
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">작성 가능한 리뷰가 없습니다.</p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil((data?.totalCount || 1) / ITEMS_PER_PAGE)}
        onPageChange={handlePageChange}
      />

      {isModalOpen && selectedReview && (
        <ReviewModal review={selectedReview} closeModal={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
