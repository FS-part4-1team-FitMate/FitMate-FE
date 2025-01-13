import React, { useState } from "react";
import SimpleCard from "@/components/Cards/writeReviewCard";
import Pagination from "@/components/Common/Pagination";

export default function awaitingReview() {
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false)

    const ITEMS_PER_PAGE = 6;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentReviews = reviews.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-6">
        <div>
            <h1 className="text-2xl font-bold mb-6">작성 가능한 리뷰</h1>
            <h1 className="text-2xl font-bold mb-6">내가 작성한 리뷰</h1>
        </div>
        <div className="grid gap-6">
            {currentReviews.map((review) => (
            <div key={review.id} className="p-4 border rounded-lg shadow-sm">
                <SimpleCard
                    onclick
                />
            </div>
            ))}
        </div>

        <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(reviews.length / ITEMS_PER_PAGE)}
            onPageChange={handlePageChange}
        />
        </div>
  );
}
