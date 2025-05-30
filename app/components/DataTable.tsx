"use client";
import React, { useState } from "react";
import { useMediaQuery } from "@mui/material";
import SecondaryBottun from "./SecondaryButton";

type DataTableProps<T> = {
  data: T[];
  modalHandler?: () => void;
  buttonText?: string;
  columns?: string[];
  renderRow: (
    row: T,
    index: number,
    itemHandler?: (id: number) => void
  ) => React.ReactNode;
  renderCard: (
    row: T,
    index: number,
    itemHandler?: (id: number) => void
  ) => React.ReactNode;
  isTableView?: boolean;
  toggleHandler?: () => void;
  itemHandler?: (id: number) => void;
  haveViewToggle?: boolean;
  itemsPerPage?: number;
};

export default function DataTable<T>({
  data,
  columns,
  renderRow,
  renderCard,
  isTableView = true,
  toggleHandler,
  itemHandler,
  haveViewToggle = false,
  itemsPerPage = 8,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination logic
  const totalPages = Math.ceil(data?.length / itemsPerPage);
  const currentPageData = data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Check if we're in mobile view (enforce card view on small screens)
  const isMobile = useMediaQuery("(max-width:1024px)");

  return (
    <>
      {/* Header with Toggle Button */}
      {haveViewToggle && (
        <SecondaryBottun
          width="w-fit"
          textColor="text-gray-600 dark:text-gray-300 font-semibold mb-6 hidden lg:block"
          borderColor="border-black border-2"
          px={"px-4"}
          onClick={toggleHandler}
        >
          {isTableView ? "Card" : "List"}
        </SecondaryBottun>
      )}

      {isTableView && !isMobile ? (
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg dark:bg-gray-600">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
              {columns?.map((column, index) => (
                <th
                  key={index}
                  className={`py-4 text-center font-semibold text-sm ${
                    index === 0 ? "rounded-tl-lg pr-3" : ""
                  } ${index === columns.length - 1 ? "rounded-tr-lg" : ""}`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentPageData?.length > 0 ? (
              currentPageData?.map((row, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  {renderRow(row, index, itemHandler)}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns?.length || 1}
                  className="p-4 text-center text-gray-500"
                >
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPageData?.length > 0 ? (
            currentPageData?.map((row, index) => (
              <div key={index}>{renderCard(row, index, itemHandler)}</div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No data available.
            </div>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      {data?.length >= itemsPerPage && (
        <div className="flex flex-wrap justify-end items-center mt-4 gap-4 w-full max-w-full overflow-x-auto sm:justify-end sm:flex-nowrap">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md disabled:bg-gray-100"
          >
            Previous
          </button>
          <div className="flex flex-wrap gap-1">
            {/* First page button */}
            {currentPage > 3 && (
              <>
                <button
                  onClick={() => setCurrentPage(1)}
                  className={`px-3 py-2 rounded-md ${
                    currentPage === 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  1
                </button>
                {currentPage > 4 && (
                  <span className="px-2 py-2 text-gray-500">...</span>
                )}
              </>
            )}

            {/* Dynamic page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                if (totalPages <= 5) return true;
                if (currentPage <= 3) return page <= 4;
                if (currentPage >= totalPages - 2)
                  return page >= totalPages - 3;
                return Math.abs(page - currentPage) <= 1;
              })
              .map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-md ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              ))}

            {/* Last page button */}
            {currentPage < totalPages - 2 && totalPages > 5 && (
              <>
                {currentPage < totalPages - 3 && (
                  <span className="px-2 py-2 text-gray-500">...</span>
                )}
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`px-3 py-2 rounded-md ${
                    currentPage === totalPages
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md disabled:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
