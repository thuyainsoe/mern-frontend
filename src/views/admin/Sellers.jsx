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

const Sellers = () => {
  // Mock data for sellers
  const data = useMemo(
    () => [
      {
        _id: "SEL-001",
        name: "Alice Johnson",
        image: null,
        email: "alice.j@example.com",
        storeName: "Alice's Emporium",
        productCount: 120,
        rating: 4.8,
        status: "Active",
        joinDate: "2025-01-15",
      },
      {
        _id: "SEL-002",
        name: "Bob Williams",
        image: null,
        email: "bob.w@example.com",
        storeName: "Bob's Bargains",
        productCount: 75,
        rating: 4.5,
        status: "Active",
        joinDate: "2024-11-20",
      },
      {
        _id: "SEL-003",
        name: "Charlie Brown",
        image: null,
        email: "charlie.b@example.com",
        storeName: "Gadget World",
        productCount: 350,
        rating: 4.9,
        status: "Suspended",
        joinDate: "2025-03-10",
      },
      {
        _id: "SEL-004",
        name: "Diana Miller",
        image: null,
        email: "diana.m@example.com",
        storeName: "Fashion Forward",
        productCount: 210,
        rating: 4.7,
        status: "Active",
        joinDate: "2025-02-28",
      },
      {
        _id: "SEL-005",
        name: "Ethan Davis",
        image: null,
        email: "ethan.d@example.com",
        storeName: "Home & Hearth",
        productCount: 88,
        rating: 4.6,
        status: "Pending Approval",
        joinDate: "2025-09-18",
      },
      {
        _id: "SEL-006",
        name: "Fiona Garcia",
        image: null,
        email: "fiona.g@example.com",
        storeName: "Fiona's Finds",
        productCount: 150,
        rating: 5.0,
        status: "Active",
        joinDate: "2024-08-05",
      },
      {
        _id: "SEL-007",
        name: "George Rodriguez",
        image: null,
        email: "george.r@example.com",
        storeName: "Tech Trove",
        productCount: 420,
        rating: 4.8,
        status: "Active",
        joinDate: "2025-05-22",
      },
    ],
    []
  );

  // Define columns for the sellers table
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Seller",
        cell: (info) => (
          <AvatarCell name={info.getValue()} image={info.row.original.image} />
        ),
      },
      {
        accessorKey: "storeName",
        header: "Store Name",
        cell: (info) => <BoldTextCell value={info.getValue()} />,
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: (info) => <TextCell value={info.getValue()} />,
      },
      {
        accessorKey: "productCount",
        header: "Products",
        cell: (info) => <BadgeCell value={info.getValue()} variant="primary" />,
      },
      {
        accessorKey: "rating",
        header: "Rating",
        cell: (info) => (
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span>{info.getValue().toFixed(1)}</span>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => <StatusCell value={info.getValue()} type="seller" />,
      },
      {
        accessorKey: "joinDate",
        header: "Joined On",
        cell: (info) => <DateCell value={info.getValue()} format="short" />,
      },
      {
        id: "action",
        header: "Actions",
        meta: { sticky: true },
        cell: (info) => (
          <ActionButtons
            viewLink={`/admin/dashboard/sellers/details/${info.row.original._id}`}
            onEdit={() => alert(`Edit seller: ${info.row.original._id}`)}
            onDelete={() => alert(`Delete seller: ${info.row.original._id}`)}
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
        title="Sellers Management"
        searchPlaceholder="Search by seller, store, email..."
        pageSize={10}
        showPagination={true}
        showSearch={true}
      />
    </div>
  );
};

export default Sellers;
