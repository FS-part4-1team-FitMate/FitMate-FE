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
        className={`w-[4.8rem] h-[4.8rem] p-2 rounded-full text-2lg ${
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
            className={`w-[4.8rem] h-[4.8rem] p-2 rounded-full text-2lg ${
              currentPage === page
                ? "bg-blue-300 text-white"
                : "text-gray-500 hover:text-blue-300 hover:bg-blue-100 hover:border hover:border-blue-300"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="p-2 text-gray-500">
            {page}
          </span>
        ),
      )}
      <button
        className={`w-[4.8rem] h-[4.8rem] px-3 py-2 rounded-full text-2lg ${
          currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-black"
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
