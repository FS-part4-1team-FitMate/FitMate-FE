import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const MAX_VISIBLE_PAGES = 5;

  const generatePageNumbers = () => {
    const pages = [];
    const half = Math.floor(MAX_VISIBLE_PAGES / 2);
    const start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, currentPage + half);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (start > 1) {
      pages.unshift("...");
      pages.unshift(1);
    }
    if (end < totalPages) {
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex justify-center items-center mt-6 space-x-2">
      <button
        className={`px-3 py-2 rounded-md ${
          currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-black"
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {pageNumbers.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            className={`px-3 py-2 rounded-md ${
              currentPage === page
                ? "bg-black text-white"
                : "text-gray-500 hover:bg-gray-200"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-3 py-2 text-gray-500">
            {page}
          </span>
        )
      )}
      <button
        className={`px-3 py-2 rounded-md ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-black"
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;

// 강수님이 저번 프로젝트에서 만드신 페이지네이션이랑 방식이 좀 다르긴한데
//  const fetchData = (page: number) => {
//     const totalItems = 10;
//     const data = Array.from({ length: totalItems }, (_, i) => `Item ${i + 1}`);
//     const start = (page - 1) * ITEMS_PER_PAGE;
//     const end = start + ITEMS_PER_PAGE;
//     setItems(data.slice(start, end));
//     setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));
//   }; 이런 식으로 쓰시면 될 것 같습니다.