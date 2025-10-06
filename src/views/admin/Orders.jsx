import React, { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Orders = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mock data for orders
  const data = useMemo(
    () => [
      {
        _id: "ORD12345",
        price: 245.5,
        payment_status: "Paid",
        delivery_status: "Delivered",
      },
      {
        _id: "ORD12344",
        price: 89.99,
        payment_status: "Pending",
        delivery_status: "Processing",
      },
      {
        _id: "ORD12343",
        price: 156.0,
        payment_status: "Paid",
        delivery_status: "Shipped",
      },
      {
        _id: "ORD12342",
        price: 320.75,
        payment_status: "Paid",
        delivery_status: "Delivered",
      },
      {
        _id: "ORD12341",
        price: 67.25,
        payment_status: "Failed",
        delivery_status: "Cancelled",
      },
      {
        _id: "ORD12340",
        price: 199.99,
        payment_status: "Paid",
        delivery_status: "Processing",
      },
      {
        _id: "ORD12339",
        price: 445.0,
        payment_status: "Pending",
        delivery_status: "Processing",
      },
      {
        _id: "ORD12338",
        price: 78.5,
        payment_status: "Paid",
        delivery_status: "Shipped",
      },
    ],
    []
  );

  // Define columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "Order ID",
        cell: (info) => (
          <span className="font-semibold text-slate-800">
            #{info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: (info) => (
          <span className="text-slate-700">${info.getValue().toFixed(2)}</span>
        ),
      },
      {
        accessorKey: "payment_status",
        header: "Payment Status",
        cell: (info) => {
          const status = info.getValue();
          return (
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                status === "Paid"
                  ? "bg-emerald-100 text-emerald-700"
                  : status === "Pending"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: "delivery_status",
        header: "Delivery Status",
        cell: (info) => {
          const status = info.getValue();
          return (
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                status === "Delivered"
                  ? "bg-emerald-100 text-emerald-700"
                  : status === "Shipped"
                  ? "bg-blue-100 text-blue-700"
                  : status === "Processing"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {status}
            </span>
          );
        },
      },
      {
        id: "action",
        header: "Action",
        cell: (info) => (
          <Link
            to={`/admin/dashboard/order/details/${info.row.original._id}`}
            className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            View Details
          </Link>
        ),
      },
    ],
    []
  );

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
        pageSize: 5,
      },
    },
  });

  return (
    <div className="px-4 md:px-6 py-6">
      <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header with Search */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">Orders</h2>
            <input
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="px-4 py-2 w-64 outline-none border border-slate-300 rounded-lg text-slate-700 placeholder:text-slate-400 text-sm focus:border-indigo-500 transition-all"
              placeholder="Search orders..."
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="bg-slate-50 border-b border-slate-200"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-100">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <span className="text-sm text-slate-400">|</span>
            <span className="text-sm text-slate-600">
              {table.getFilteredRowModel().rows.length} total orders
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Custom Minimalist Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-all outline-none flex items-center gap-2 min-w-[80px] justify-between"
              >
                <span>{table.getState().pagination.pageSize}</span>
                <FiChevronDown className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute bottom-full mb-1 right-0 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden z-10 min-w-[80px]">
                  {[5, 10, 20].map((pageSize) => (
                    <button
                      key={pageSize}
                      onClick={() => {
                        table.setPageSize(pageSize);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-sm text-left hover:bg-indigo-50 transition-colors ${
                        table.getState().pagination.pageSize === pageSize
                          ? 'bg-indigo-50 text-indigo-600 font-semibold'
                          : 'text-slate-700'
                      }`}
                    >
                      {pageSize}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-1">
              <button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                First
              </button>
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <FiChevronUp className="rotate-[-90deg]" />
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <FiChevronDown className="rotate-[-90deg]" />
              </button>
              <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Last
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
