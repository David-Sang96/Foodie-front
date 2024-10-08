/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalPages, currentPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageNum = (value) => {
    if (value < 1 || value > totalPages) return;
    searchParams.set("page", value);
    setSearchParams(searchParams);
  };

  return (
    <div className="mt-3 flex items-center justify-between border-t border-gray-200 bg-white p-2 md:px-3 md:py-3">
      <div className="flex flex-1 justify-between sm:hidden">
        {currentPage > 1 ? (
          <div
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => handlePageNum(currentPage - 1)}
          >
            Previous
          </div>
        ) : (
          <span></span>
        )}
        {currentPage < totalPages ? (
          <div
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => handlePageNum(currentPage + 1)}
          >
            Next
          </div>
        ) : (
          <span></span>
        )}
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
              onClick={() => handlePageNum(currentPage - 1)}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {[...Array(totalPages)].map((_, index) => (
              <div
                key={index + 1}
                className={`relative inline-flex cursor-pointer items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-amber-600 hover:text-white focus:z-20 focus:outline-offset-0 ${currentPage === index + 1 ? "bg-orange text-white" : ""}`}
                onClick={() => handlePageNum(index + 1)}
              >
                {index + 1}
              </div>
            ))}

            <div
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${totalPages === currentPage ? "cursor-not-allowed" : "cursor-pointer"}`}
              onClick={() => handlePageNum(currentPage + 1)}
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
