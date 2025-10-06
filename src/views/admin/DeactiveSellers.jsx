import React, { useMemo } from "react";
import DataTable from "../../components/DataTable";
import {
  BoldTextCell,
  TextCell,
  DateCell,
  AvatarCell,
} from "../../components/TableCells";
import ActionButtons from "../../components/ActionButtons";

const DeactivatedSellers = () => {
  // Mock data for deactivated sellers
  const data = useMemo(
    () => [
      {
        _id: "SEL-003",
        name: "Charlie Brown",
        image: null,
        email: "charlie.b@example.com",
        storeName: "Gadget World",
        joinDate: "2025-03-10",
        deactivationDate: "2025-09-25",
        reason: "Multiple Policy Violations",
      },
      {
        _id: "SEL-008",
        name: "Hannah Wilson",
        image: null,
        email: "hannah.w@example.com",
        storeName: "Vintage Threads",
        joinDate: "2024-10-01",
        deactivationDate: "2025-08-15",
        reason: "Account Closed by User",
      },
      {
        _id: "SEL-009",
        name: "Ian Thompson",
        image: null,
        email: "ian.t@example.com",
        storeName: "Book Nook",
        joinDate: "2025-01-05",
        deactivationDate: "2025-07-30",
        reason: "Fraudulent Activity Detected",
      },
      {
        _id: "SEL-010",
        name: "Jane Clark",
        image: null,
        email: "jane.c@example.com",
        storeName: "Jane's Jewels",
        joinDate: "2024-05-12",
        deactivationDate: "2025-06-20",
        reason: "Account Closed by User",
      },
      {
        _id: "SEL-011",
        name: "Kevin Lewis",
        image: null,
        email: "kevin.l@example.com",
        storeName: "Pro Sports Gear",
        joinDate: "2025-02-18",
        deactivationDate: "2025-10-01",
        reason: "Failure to Fulfill Orders",
      },
    ],
    []
  );

  // Define columns for the deactivated sellers table
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
        cell: (info) => <TextCell value={info.getValue()} />,
      },
      {
        accessorKey: "reason",
        header: "Reason for Deactivation",
        cell: (info) => <BoldTextCell value={info.getValue()} />,
      },
      {
        accessorKey: "deactivationDate",
        header: "Deactivated On",
        cell: (info) => <DateCell value={info.getValue()} format="long" />,
      },
      {
        accessorKey: "joinDate",
        header: "Originally Joined",
        cell: (info) => <DateCell value={info.getValue()} format="short" />,
      },
      {
        id: "action",
        header: "Actions",
        meta: { sticky: true },
        cell: (info) => (
          <ActionButtons
            onReactivate={() =>
              alert(`Reactivate seller: ${info.row.original._id}`)
            }
            onDelete={() =>
              alert(`Permanently delete seller: ${info.row.original._id}`)
            }
            viewLink={`/admin/dashboard/seller/history/${info.row.original._id}`} // Link to a history/details page
            canReactivate={true}
            canDelete={true} // Be cautious with this in a real app
            canView={true}
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
        title="Deactivated Sellers"
        searchPlaceholder="Search by seller, store, reason..."
        pageSize={10}
        showPagination={true}
        showSearch={true}
      />
    </div>
  );
};

export default DeactivatedSellers;
