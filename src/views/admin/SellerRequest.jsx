import React, { useMemo } from "react";
import DataTable from "../../components/DataTable";
import {
  BoldTextCell,
  TextCell,
  DateCell,
  AvatarCell,
} from "../../components/TableCells";
import ActionButtons from "../../components/ActionButtons";

const SellerRequests = () => {
  // Mock data for new seller requests
  const data = useMemo(() => [
    {
      _id: "REQ-201",
      applicantName: "Ethan Davis",
      image: null,
      email: "ethan.d@example.com",
      storeName: "Home & Hearth",
      businessInfo: "Specializing in handmade home decor and kitchenware.",
      requestDate: "2025-10-06",
      status: "Pending Review",
    },
    {
      _id: "REQ-202",
      applicantName: "Olivia Martinez",
      image: null,
      email: "olivia.m@example.com",
      storeName: "Olivia's Organics",
      businessInfo: "Organic skincare and beauty products.",
      requestDate: "2025-10-05",
      status: "Pending Review",
    },
    {
      _id: "REQ-203",
      applicantName: "Liam Wilson",
      image: null,
      email: "liam.w@example.com",
      storeName: "LW Tech Hub",
      businessInfo: "Selling refurbished computer parts and accessories.",
      requestDate: "2025-10-05",
      status: "Pending Review",
    },
    {
      _id: "REQ-204",
      applicantName: "Sophia Taylor",
      image: null,
      email: "sophia.t@example.com",
      storeName: "The Artful Corner",
      businessInfo: "Custom portraits and landscape paintings.",
      requestDate: "2025-10-04",
      status: "Pending Review",
    },
    {
      _id: "REQ-205",
      applicantName: "Noah Anderson",
      image: null,
      email: "noah.a@example.com",
      storeName: "Retro Gaming Den",
      businessInfo: "A collection of classic video games and consoles.",
      requestDate: "2025-10-03",
      status: "Pending Review",
    },
  ]);

  // Define columns for the seller requests table
  const columns = useMemo(
    () => [
      {
        accessorKey: "applicantName",
        header: "Applicant",
        cell: (info) => (
          <AvatarCell name={info.getValue()} image={info.row.original.image} />
        ),
      },
      {
        accessorKey: "storeName",
        header: "Proposed Store",
        cell: (info) => <BoldTextCell value={info.getValue()} />,
      },
      {
        accessorKey: "email",
        header: "Contact Email",
        cell: (info) => <TextCell value={info.getValue()} />,
      },
      {
        accessorKey: "businessInfo",
        header: "Business Info",
        cell: (info) => <TextCell value={info.getValue()} truncate={true} />,
      },
      {
        accessorKey: "requestDate",
        header: "Requested On",
        cell: (info) => <DateCell value={info.getValue()} format="long" />,
      },
      {
        id: "action",
        header: "Actions",
        meta: { sticky: true },
        cell: (info) => (
          <ActionButtons
            onApprove={() => alert(`Approve request: ${info.row.original._id}`)}
            onReject={() => alert(`Reject request: ${info.row.original._id}`)}
            viewLink={`/admin/dashboard/seller-requests/${info.row.original._id}`} // Link to the full application
            canView={true}
            showApproveReject={true}
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
        title="Seller Requests"
        searchPlaceholder="Search by applicant, store name..."
        pageSize={10}
        showPagination={true}
        showSearch={true}
      />
    </div>
  );
};

export default SellerRequests;
