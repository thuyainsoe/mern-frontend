import React, { useMemo } from "react";
import DataTable from "../../components/DataTable";
import {
  TextCell,
  PriceCell,
  DateCell,
  AvatarCell,
  BadgeCell,
} from "../../components/TableCells";
import ActionButtons from "../../components/ActionButtons";

const DiscountProducts = () => {
  // Mock data for discounted products
  const data = useMemo(
    () => [
      {
        _id: "PROD-101",
        name: "Wireless Noise-Cancelling Headphones",
        image: null,
        seller: "Alice's Emporium",
        originalPrice: 249.99,
        discountPrice: 199.99,
        discountPercentage: 20,
        stock: 85,
        endDate: "2025-10-15",
      },
      {
        _id: "PROD-105",
        name: "The Art of Programming (Hardcover)",
        image: null,
        seller: "Book Nook",
        originalPrice: 59.5,
        discountPrice: 49.95,
        discountPercentage: 16,
        stock: 45,
        endDate: "2025-10-20",
      },
      {
        _id: "PROD-106",
        name: "Professional Yoga Mat",
        image: null,
        seller: "Pro Sports Gear",
        originalPrice: 45.0,
        discountPrice: 35.0,
        discountPercentage: 22,
        stock: 110,
        endDate: "2025-11-01",
      },
      {
        _id: "PROD-102",
        name: "Organic Cotton T-Shirt",
        image: null,
        seller: "Fashion Forward",
        originalPrice: 25.0,
        discountPrice: 19.99,
        discountPercentage: 20,
        stock: 250,
        endDate: "2025-10-12",
      },
      {
        _id: "PROD-110",
        name: "Smart Watch Series 8",
        image: null,
        seller: "Gadget World",
        originalPrice: 399.0,
        discountPrice: 349.0,
        discountPercentage: 12,
        stock: 50,
        endDate: "2025-10-31",
      },
    ],
    []
  );

  // Define columns for the discounted products table
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Product",
        cell: (info) => (
          <AvatarCell name={info.getValue()} image={info.row.original.image} />
        ),
      },
      {
        accessorKey: "seller",
        header: "Seller",
        cell: (info) => <TextCell value={info.getValue()} />,
      },
      {
        accessorKey: "originalPrice",
        header: "Original Price",
        cell: (info) => (
          <span className="line-through text-gray-500">
            <PriceCell value={info.getValue()} />
          </span>
        ),
      },
      {
        accessorKey: "discountPrice",
        header: "Discount Price",
        cell: (info) => (
          <span className="font-bold text-emerald-600">
            <PriceCell value={info.getValue()} />
          </span>
        ),
      },
      {
        accessorKey: "discountPercentage",
        header: "Discount",
        cell: (info) => (
          <BadgeCell value={`-${info.getValue()}%`} variant="success" />
        ),
      },
      {
        accessorKey: "endDate",
        header: "Promotion Ends",
        cell: (info) => <DateCell value={info.getValue()} format="long" />,
      },
      {
        id: "action",
        header: "Actions",
        meta: { sticky: true },
        cell: (info) => (
          <ActionButtons
            onEdit={() => alert(`Edit discount for: ${info.row.original._id}`)}
            onEndPromotion={() =>
              alert(`End promotion for: ${info.row.original._id}`)
            }
            viewLink={`/admin/dashboard/product/details/${info.row.original._id}`}
            canView={true}
            canEdit={true}
            canEndPromotion={true}
          />
        ),
      },
    ],
    []
  );

  return (
    <div className="p-3">
      <DataTable
        data={data}
        columns={columns}
        title="Discounted Products"
        searchPlaceholder="Search by product, seller..."
        pageSize={10}
        showPagination={true}
        showSearch={true}
      />
    </div>
  );
};

export default DiscountProducts;
