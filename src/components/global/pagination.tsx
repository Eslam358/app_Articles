"use client";
import React from "react";
import { useRouter } from "next/navigation";

export  const Pagination = ({ totalPages, page, URL }: any) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState(page);
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    router.push(`/${URL}?page=${page}`);
  };

  const pagesToShow = 10;
  const halfPagesToShow = Math.floor(pagesToShow / 2);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= pagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li key={i}>
            <button
              onClick={() => handlePageChange(i)}
              disabled={currentPage == i}
              style={{
                backgroundColor: currentPage == i ? "#FFA500" : "",
                cursor: currentPage == i ? "text" : "",
              }}
              className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white cursor-pointer"
            >
              {i}
            </button>
          </li>
        );
      }
    } else {
      let startPage = Math.max(1, currentPage - halfPagesToShow);
      let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

      if (currentPage <= halfPagesToShow) {
        endPage = pagesToShow;
      } else if (currentPage >= totalPages - halfPagesToShow) {
        startPage = totalPages - pagesToShow + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <li key={i}>
            <button
              onClick={() => handlePageChange(i)}
              disabled={currentPage == i}
              style={{
                backgroundColor: currentPage == i ? "#FFA500" : "",
                cursor: currentPage == i ? "text" : "",
              }}
              className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white cursor-pointer"
            >
              {i}
            </button>
          </li>
        );
      }

      if (startPage > 1) {
        pageNumbers.unshift(
          <li key="prev-dots" className="p-2 flex itmes-center">
            <span>...</span>
          </li>
        );
      }

      if (endPage < totalPages) {
        pageNumbers.push(
          <li key="next-dots" className="p-2 flex itmes-center">
            <span>...</span>
          </li>
        );
      }
    }
    return pageNumbers;
  };

  return (
    <div className="pagination flex items-center gap-3 w-full justify-center my-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white`}
      >
        <span className="sr-only">Next Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`size-3 ${currentPage === 1 ? "opacity-10" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <ol className="flex justify-center gap-1 text-xs font-medium">
        {renderPageNumbers()}
      </ol>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 dark:border-gray-800 dark:bg-gray-900 dark:text-white`}
      >
        <span className="sr-only">Next Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`size-3 ${currentPage == totalPages ? "opacity-10" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};
