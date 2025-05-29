"use client";
import React, { useState } from "react";
import { Select, MenuItem as SelectItem, useMediaQuery } from "@mui/material";
import PrimaryBottun from "./PrimaryButtun";
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
  modalHandler,
  buttonText,
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
      <div className="mb-4 flex justify-between items-center gap-2">
        <div className=" lg:flex gap-4">
          {buttonText && (
            <PrimaryBottun width="w-fit" clickHandler={modalHandler} px="px-8">
              {buttonText}
            </PrimaryBottun>
          )}
          {haveViewToggle && (
            <SecondaryBottun
              width="w-fit"
              borderColor="border-black border-2"
              px={"px-4"}
              onClick={toggleHandler}
            >
              {isTableView ? "Card" : "List"}
            </SecondaryBottun>
          )}
        </div>
      </div>

      {isTableView && !isMobile ? (
        <table className="min-w-full table-auto bg-white shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              {columns?.map((column, index) => (
                <th
                  key={index}
                  className={`py-4 text-right font-semibold text-sm ${
                    index === 0 ? "rounded-tr-lg pr-3" : ""
                  } ${index === columns.length - 1 ? "rounded-tl-lg" : ""}`}
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
        <div className="flex justify-end items-center mt-4 gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-6 py-2 bg-gray-200 text-gray-600 rounded-md disabled:bg-gray-100"
          >
            Previous
          </button>
          <Select
            value={currentPage}
            onChange={(e) => setCurrentPage(e.target.value)}
            className="mx-4 max-h-[40px]"
          >
            {Array.from({ length: totalPages }, (_, index) => (
              <SelectItem key={index + 1} value={index + 1}>
                Page {index + 1}
              </SelectItem>
            ))}
          </Select>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-6 py-2 bg-gray-200 text-gray-600 rounded-md disabled:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
