
import MyReviewCard from "@/components/Cards/MyReviewCard";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getReview } from "@/lib/api/ReviewService";
import { Review } from "@/types/reviews";
import ReviewCard from "@/components/Cards/ReviewCard";
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

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };
  
    return (
      <div className="p-6">
        <Tab />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {data.reviews.map((review: any) => (
            <MyReviewCard
              key={review.id}
              createdAt={review.date}
              price={review.price}
              tags={review.tags}
              content={review.content}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(data.total / ITEMS_PER_PAGE)}
          onPageChange={handlePageChange}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(data?.totalCount! / ITEMS_PER_PAGE || 1)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
