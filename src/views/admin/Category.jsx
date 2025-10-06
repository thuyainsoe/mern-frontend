import React, { useMemo } from "react";
import DataTable from "../../components/DataTable";
import {
  BoldTextCell,
  TextCell,
  StatusCell,
  DateCell,
  AvatarCell,
  BadgeCell,
} from "../../components/TableCells";
import ActionButtons from "../../components/ActionButtons";

const Categories = () => {
  // Mock data for categories
  const data = useMemo(
    () => [
      {
        _id: "CAT101",
        name: "Electronics",
        image: null,
        description: "Devices and gadgets, from TVs to smartphones.",
        productCount: 150,
        status: "Active",
        created_at: "2025-09-15",
      },
      {
        _id: "CAT102",
        name: "Books & Media",
        image: null,
        description: "Printed books, e-books, movies, and music.",
        productCount: 1250,
        status: "Active",
        created_at: "2025-08-22",
      },
      {
        _id: "CAT103",
        name: "Clothing & Apparel",
        image: null,
        description: "Men's, women's, and children's clothing.",
        productCount: 780,
        status: "Active",
        created_at: "2025-07-01",
      },
      {
        _id: "CAT104",
        name: "Home & Garden",
        image: null,
        description: "Furniture, decor, and gardening supplies.",
        productCount: 420,
        status: "Inactive",
        created_at: "2025-06-18",
      },
      {
        _id: "CAT105",
        name: "Sports & Outdoors",
        image: null,
        description: "Equipment for sports and outdoor activities.",
        productCount: 315,
        status: "Active",
        created_at: "2025-09-05",
      },
      {
        _id: "CAT106",
        name: "Toys & Games",
        image: null,
        description: "Fun and educational toys for all ages.",
        productCount: 650,
        status: "Active",
        created_at: "2025-08-11",
      },
      {
        _id: "CAT107",
        name: "Health & Beauty",
        image: null,
        description: "Skincare, makeup, and wellness products.",
        productCount: 940,
        status: "Active",
        created_at: "2025-09-28",
      },
    ],
    []
  );

  // Define columns for the categories table
  const columns = useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "Category ID",
        cell: (info) => <BoldTextCell value={info.getValue()} />,
      },
      {
        accessorKey: "name",
        header: "Category Name",
        cell: (info) => (
          <AvatarCell name={info.getValue()} image={info.row.original.image} />
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: (info) => <TextCell value={info.getValue()} truncate={true} />,
      },
      {
        accessorKey: "productCount",
        header: "Products",
        cell: (info) => (
          <BadgeCell value={info.getValue()} variant="secondary" />
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => <StatusCell value={info.getValue()} type="category" />,
      },
      {
        accessorKey: "created_at",
        header: "Date Created",
        cell: (info) => <DateCell value={info.getValue()} format="long" />,
      },
      {
        id: "action",
        header: "Actions",
        meta: { sticky: true },
        cell: (info) => (
          <ActionButtons
            viewLink={`/admin/dashboard/category/details/${info.row.original._id}`}
            onEdit={() => alert(`Edit category: ${info.row.original._id}`)}
            onDelete={() => alert(`Delete category: ${info.row.original._id}`)}
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
        title="Categories Management"
        searchPlaceholder="Search by category ID, name..."
        pageSize={10}
        showPagination={true}
        showSearch={true}
      />
    </div>
  );
};

export default Categories;
