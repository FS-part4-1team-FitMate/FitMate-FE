import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getReviewableQuotes } from "@/lib/api/ReviewService";
import WriteReviewCard from "@/components/Cards/writeReviewCard";
import Pagination from "@/components/Common/Pagination";
import ReviewModal from "@/components/Modal/ReviewModal";
import { ReviewableList } from "@/types/reviews";
import { img_non_review_md } from "@/imageExports";
import Image from "next/image";

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
    <div className="p-10 bg-gray-50 min-h-screen w-[75%] mx-auto">
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
          <div className="flex flex-col justify-center items-center gap-[2.4rem] py-[24rem] px-[8rem]">
            <Image src={img_non_review_md} alt="non-request" />
            <h1 className="text-gray-400 text-lg font-regular">작성 가능한 리뷰가가 없어요!</h1>
          </div>
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
