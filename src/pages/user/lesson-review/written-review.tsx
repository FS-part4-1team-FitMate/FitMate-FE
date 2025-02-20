import { img_non_review_md } from "@/imageExports";
import Image from "next/image";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyReviews } from "@/lib/api/ReviewService";
import MyReviewCard from "@/components/Cards/MyReviewCard";
import Pagination from "@/components/Common/Pagination";
import { useUser } from "@/contexts/UserProvider";

export default function MyReviews() {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const user = useUser();
  const userId = user?.id;

  const { data, isLoading } = useQuery(["myReviews", userId], getMyReviews);

  if (isLoading) return <p>로딩 중...</p>;

  if (!data || !data.reviews || data.reviews.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-[2.4rem] py-[24rem] px-[8rem]">
        <Image src={img_non_review_md} alt="non-request" width={160} height={160} />
        <h1 className="text-gray-400 text-lg font-regular">작성한 리뷰가 없어요!</h1>
      </div>
    );
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedReviews = data.reviews.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-8 p-10 bg-bg-100 min-h-screen w-full">
      <div className="pc:max-w-[140rem] tablet:max-w-[72rem] w-full grid grid-cols-1 gap-4 mx-auto pc:grid-cols-2">
        {paginatedReviews.map((review) => (
          <MyReviewCard key={review.createdAt} review={review} />
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
