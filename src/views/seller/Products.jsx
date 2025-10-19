import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/DataTable";
import {
  BoldTextCell,
  TextCell,
  PriceCell,
  StatusCell,
  DateCell,
  AvatarCell,
  BadgeCell,
} from "../../components/TableCells";
import ActionButtons from "../../components/ActionButtons";

const Products = () => {
  const navigate = useNavigate();
  // Mock data for products
  const data = useMemo(
    () => [
      {
        _id: "PROD-101",
        name: "Wireless Noise-Cancelling Headphones",
        image: null,
        category: "Electronics",
        seller: "Alice's Emporium",
        price: 249.99,
        stock: 85,
        status: "Published",
        dateAdded: "2025-09-20",
      },
      {
        _id: "PROD-102",
        name: "Organic Cotton T-Shirt",
        image: null,
        category: "Clothing & Apparel",
        seller: "Fashion Forward",
        price: 25.0,
        stock: 250,
        status: "Published",
        dateAdded: "2025-09-15",
      },
      {
        _id: "PROD-103",
        name: "Smart Home Hub - 3rd Gen",
        image: null,
        category: "Electronics",
        seller: "Gadget World",
        price: 99.99,
        stock: 0,
        status: "Out of Stock",
        dateAdded: "2025-08-30",
      },
      {
        _id: "PROD-104",
        name: "Stainless Steel Water Bottle",
        image: null,
        category: "Home & Garden",
        seller: "Home & Hearth",
        price: 19.95,
        stock: 150,
        status: "Published",
        dateAdded: "2025-09-22",
      },
      {
        _id: "PROD-105",
        name: "The Art of Programming (Hardcover)",
        image: null,
        category: "Books & Media",
        seller: "Book Nook",
        price: 59.5,
        stock: 45,
        status: "Published",
        dateAdded: "2025-08-10",
      },
      {
        _id: "PROD-106",
        name: "Professional Yoga Mat",
        image: null,
        category: "Sports & Outdoors",
        seller: "Pro Sports Gear",
        price: 45.0,
        stock: 110,
        status: "Published",
        dateAdded: "2025-09-28",
      },
      {
        _id: "PROD-107",
        name: "Handmade Leather Wallet (Draft)",
        image: null,
        category: "Clothing & Apparel",
        seller: "Fiona's Finds",
        price: 75.0,
        stock: 20,
        status: "Draft",
        dateAdded: "2025-10-02",
      },
    ],
    []
  );

  // Define columns for the products table
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
        accessorKey: "category",
        header: "Category",
        cell: (info) => <TextCell value={info.getValue()} />,
      },
      {
        accessorKey: "seller",
        header: "Seller",
        cell: (info) => <TextCell value={info.getValue()} />,
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: (info) => <PriceCell value={info.getValue()} />,
      },
      {
        accessorKey: "stock",
        header: "Stock",
        cell: (info) => <BoldTextCell value={info.getValue()} />,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => <StatusCell value={info.getValue()} type="product" />,
      },
      {
        id: "action",
        header: "Actions",
        meta: { sticky: true },
        cell: (info) => (
          <ActionButtons
            viewLink={`/seller/dashboard/products/${info.row.original._id}`}
            onEdit={() =>
              navigate(`/seller/dashboard/products/${info.row.original._id}`)
            }
            onDelete={() => alert(`Delete product: ${info.row.original._id}`)}
            canView={true}
            canEdit={true}
            canDelete={true}
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
        showSearch={true}
        showAddNew={true}
        onAddNew={() => {
          navigate(`/seller/dashboard/add-product`);
        }}
        title="Products Management"
        searchPlaceholder="Search by product, category, seller..."
        pageSize={10}
        showPagination={true}
      />
    </div>
  );
};

export default Products;
