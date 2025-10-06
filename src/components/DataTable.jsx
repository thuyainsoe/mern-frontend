import React, { useState, useRef, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  FiChevronDown,
  FiChevronUp,
  FiPlus,
  FiDownload,
  FiUpload,
  FiFilter,
} from "react-icons/fi";
import Dropdown from "./Dropdown";

const DataTable = ({
  data,
  columns,
  title = "Data Table",
  searchPlaceholder = "Search...",
  pageSize = 5,
  showPagination = true,
  showSearch = true,
  // Header Actions
  showAddNew = false,
  showImport = false,
  showExport = false,
  showFilter = false,
  onAddNew,
  onImport,
  onExport,
  filterOptions = [],
  onFilterChange,
}) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
  });

  return (
    <div className="w-full bg-white rounded-md shadow-lg overflow-hidden">
      {/* Header with Search and Actions */}
      {(title || showSearch || showAddNew || showImport || showExport || showFilter) && (
        <div className="p-4 md:py-4 md:p-6 border-b border-slate-200">
          <div className="flex flex-col gap-3">
            {/* Title and Search Row */}
            <div className="flex flex-col items-start md:flex-row justify-between gap-y-2 md:items-center">
              {title && (
                <h2 className="text-xl font-bold text-slate-800">{title}</h2>
              )}
              {showSearch && (
                <input
                  value={globalFilter ?? ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="px-4 py-2 w-64 outline-none border border-slate-300 rounded-md text-slate-700 placeholder:text-slate-400 text-sm focus:border-indigo-500 transition-all"
                  placeholder={searchPlaceholder}
                />
              )}
            </div>

            {/* Action Buttons Row */}
            {(showAddNew || showImport || showExport || showFilter) && (
              <div className="flex items-center gap-1">
                {showAddNew && (
                  <button
                    onClick={onAddNew}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all text-sm font-medium"
                  >
                    <FiPlus className="text-sm" />
                    <span>Add New</span>
                  </button>
                )}

                {showImport && (
                  <button
                    onClick={onImport}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-all text-sm font-medium"
                  >
                    <FiUpload className="text-sm" />
                    <span>Import</span>
                  </button>
                )}

                {showExport && (
                  <button
                    onClick={onExport}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-all text-sm font-medium"
                  >
                    <FiDownload className="text-sm" />
                    <span>Export</span>
                  </button>
                )}

                {showFilter && (
                  <div className="relative" ref={filterRef}>
                    <button
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-all text-sm font-medium"
                    >
                      <FiFilter className="text-sm" />
                      <span>Filter</span>
                    </button>

                    {isFilterOpen && filterOptions.length > 0 && (
                      <div className="absolute top-full mt-1 left-0 bg-white border border-slate-200 rounded-md shadow-lg overflow-hidden z-10 min-w-[180px]">
                        {filterOptions.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              onFilterChange && onFilterChange(option);
                              setIsFilterOpen(false);
                            }}
                            className="w-full px-4 py-2 text-sm text-left hover:bg-slate-50 transition-colors text-slate-700 whitespace-nowrap"
                          >
                            {option.label || option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="bg-slate-50 border-b border-slate-200"
              >
                {headerGroup.headers.map((header, index) => {
                  const isLastColumn = index === headerGroup.headers.length - 1;
                  const isSticky =
                    isLastColumn && header.column.columnDef.meta?.sticky;

                  return (
                    <th
                      key={header.id}
                      className={`px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide text-nowrap ${
                        isSticky
                          ? "sticky right-0 bg-slate-50 shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.05)]"
                          : ""
                      }`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-100">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                {row.getVisibleCells().map((cell, index) => {
                  const isLastColumn =
                    index === row.getVisibleCells().length - 1;
                  const isSticky =
                    isLastColumn && cell.column.columnDef.meta?.sticky;

                  return (
                    <td
                      key={cell.id}
                      className={`px-6 py-4 text-sm ${
                        isSticky
                          ? "sticky right-0 bg-white shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.05)]"
                          : ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {showPagination && (
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <span className="text-sm text-slate-400">|</span>
            <span className="text-sm text-slate-600">
              {table.getFilteredRowModel().rows.length} total items
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Page Size Dropdown */}
            <Dropdown
              value={table.getState().pagination.pageSize}
              onChange={(size) => table.setPageSize(size)}
              options={[
                { label: "5", value: 5 },
                { label: "10", value: 10 },
                { label: "20", value: 20 },
              ]}
              className="min-w-[80px]"
              position="top"
            />

            <div className="flex gap-1">
              <button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="px-3 py-1.5 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                First
              </button>
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-3 py-1.5 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <FiChevronUp className="rotate-[-90deg]" />
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-3 py-1.5 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <FiChevronDown className="rotate-[-90deg]" />
              </button>
              <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className="px-3 py-1.5 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Last
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
