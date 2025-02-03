import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Pagination from "@/components/Common/Pagination";
import ReviewModal from "@/components/Modal/ReviewModal";
import Tab from "@/components/Tab";
import WriteReviewCard from "@/components/Cards/writeReviewCard";

export default function AwaitingReview() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const ITEMS_PER_PAGE = 6;

  const { data } = useQuery(
    ["reviews", currentPage],
    () => fetchReviews(currentPage, ITEMS_PER_PAGE),
    {
      keepPreviousData: true,
    }
  );



  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleWriteReview = (review: any) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div>
        <Tab />
      </div>

      <div className="grid gap-6">
        {data.reviews.map((review: any) => (
          <div key={review.id} className="p-4 border rounded-lg shadow-sm">
            <WriteReviewCard
              item={review}
              onClick={() => handleWriteReview(review)}
            />
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(data.total / ITEMS_PER_PAGE)}
        onPageChange={handlePageChange}
      />

      {isModalOpen && (
        <ReviewModal
          review={selectedReview}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}