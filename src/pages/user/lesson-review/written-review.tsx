import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getReview } from "@/lib/api/ReviewService";
import MyReviewCard from "@/components/Cards/MyReviewCard";
import Pagination from "@/components/Common/Pagination";
import Tab from "@/components/Tab";

export default function ReviewListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const { data } = useQuery(
    ["reviews", { page: currentPage, limit: ITEMS_PER_PAGE }],
    () => getReview({ page: currentPage, limit: ITEMS_PER_PAGE }),
    {
      keepPreviousData: true,
    },
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <Tab />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {data?.reviews?.map((review: any) => (
          <MyReviewCard
            key={review.id}
            createdAt={review.date}
            price={review.price}
            // tags={review.tags}
            nickname={review?.user?.nickname}
            rating={review.rating}
            content={review.content}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(data?.totalCount! / ITEMS_PER_PAGE || 1)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
