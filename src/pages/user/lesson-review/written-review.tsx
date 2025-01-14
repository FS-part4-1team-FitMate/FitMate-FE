import ReviewCard from "@/components/Cards/ReviewCard";
import Pagination from "@/components/Common/Pagination";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function ReviewListPage() {
    const [currentPage, setCurrentPage] = useState(1);
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
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">작성 가능한 리뷰</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {data.reviews.map((review: any) => (
            <ReviewCard
              key={review.id}
              title={review.title}
              date={review.date}
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
    );
  }