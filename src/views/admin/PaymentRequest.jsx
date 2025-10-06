import React, { useMemo } from "react";
import DataTable from "../../components/DataTable";
import {
  BoldTextCell,
  PriceCell,
  StatusCell,
  DateCell,
  AvatarCell,
  TextCell,
} from "../../components/TableCells";
import ActionButtons from "../../components/ActionButtons"; // Assuming ActionButtons can be adapted or a new component is used

const PaymentRequests = () => {
  // Mock data for payment requests
  const data = useMemo(
    () => [
      {
        _id: "PAY-REQ-001",
        seller: { name: "Alice Johnson", image: null },
        amount: 1550.75,
        status: "Pending",
        paymentMethod: "Bank Transfer",
        requestDate: "2025-10-06",
        processedDate: null,
      },
      {
        _id: "PAY-REQ-002",
        seller: { name: "Bob Williams", image: null },
        amount: 875.0,
        status: "Approved",
        paymentMethod: "PayPal",
        requestDate: "2025-10-05",
        processedDate: "2025-10-06",
      },
      {
        _id: "PAY-REQ-003",
        seller: { name: "Fiona Garcia", image: null },
        amount: 2340.5,
        status: "Pending",
        paymentMethod: "Bank Transfer",
        requestDate: "2025-10-05",
        processedDate: null,
      },
      {
        _id: "PAY-REQ-004",
        seller: { name: "George Rodriguez", image: null },
        amount: 3120.0,
        status: "Rejected",
        paymentMethod: "Bank Transfer",
        requestDate: "2025-10-04",
        processedDate: "2025-10-05",
      },
      {
        _id: "PAY-REQ-005",
        seller: { name: "Diana Miller", image: null },
        amount: 950.25,
        status: "Approved",
        paymentMethod: "PayPal",
        requestDate: "2025-10-03",
        processedDate: "2025-10-04",
      },
      {
        _id: "PAY-REQ-006",
        seller: { name: "Charlie Brown", image: null },
        amount: 4500.0,
        status: "Pending",
        paymentMethod: "Bank Transfer",
        requestDate: "2025-10-06",
        processedDate: null,
      },
    ],
    []
  );

  // Define columns for the payment requests table
  const columns = useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "Request ID",
        cell: (info) => <BoldTextCell value={info.getValue()} />,
      },
      {
        accessorKey: "seller",
        header: "Seller",
        cell: (info) => (
          <AvatarCell
            name={info.getValue().name}
            image={info.getValue().image}
          />
        ),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: (info) => <PriceCell value={info.getValue()} />,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => (
          <StatusCell value={info.getValue()} type="paymentRequest" />
        ),
      },
      {
        accessorKey: "paymentMethod",
        header: "Method",
        cell: (info) => <TextCell value={info.getValue()} />,
      },
      {
        accessorKey: "requestDate",
        header: "Requested On",
        cell: (info) => <DateCell value={info.getValue()} format="short" />,
      },
      {
        accessorKey: "processedDate",
        header: "Processed On",
        cell: (info) => <DateCell value={info.getValue()} format="short" />,
      },
      {
        id: "action",
        header: "Actions",
        meta: { sticky: true },
        cell: (info) => (
          <ActionButtons
            onApprove={() => alert(`Approve request: ${info.row.original._id}`)}
            onReject={() => alert(`Reject request: ${info.row.original._id}`)}
            showApproveReject={info.row.original.status === "Pending"}
            canView={true}
            viewLink={`/admin/dashboard/seller/details/${info.row.original._id}`}
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
        title="Payment Requests"
        searchPlaceholder="Search by request ID, seller..."
        pageSize={10}
        showPagination={true}
        showSearch={false}
      />
    </div>
  );
};

export default PaymentRequests;
