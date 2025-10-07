import React, { useMemo } from "react";
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

const Orders = () => {
  // Mock data with 10 columns
  const data = useMemo(
    () => [
      {
        _id: "ORD12345",
        customer: { name: "John Smith", image: null },
        email: "john@example.com",
        items: 3,
        price: 245.5,
        payment_status: "Paid",
        payment_method: "Credit Card",
        delivery_status: "Delivered",
        shipping_address: "123 Main St, New York",
        date: "2025-10-01",
      },
      {
        _id: "ORD12344",
        customer: { name: "Sarah Johnson", image: null },
        email: "sarah@example.com",
        items: 1,
        price: 89.99,
        payment_status: "Pending",
        payment_method: "PayPal",
        delivery_status: "Processing",
        shipping_address: "456 Oak Ave, Los Angeles",
        date: "2025-10-02",
      },
      {
        _id: "ORD12343",
        customer: { name: "Mike Wilson", image: null },
        email: "mike@example.com",
        items: 5,
        price: 156.0,
        payment_status: "Paid",
        payment_method: "Debit Card",
        delivery_status: "Shipped",
        shipping_address: "789 Pine Rd, Chicago",
        date: "2025-10-03",
      },
      {
        _id: "ORD12342",
        customer: { name: "Emily Davis", image: null },
        email: "emily@example.com",
        items: 2,
        price: 320.75,
        payment_status: "Paid",
        payment_method: "Credit Card",
        delivery_status: "Delivered",
        shipping_address: "321 Elm St, Houston",
        date: "2025-10-04",
      },
      {
        _id: "ORD12341",
        customer: { name: "David Brown", image: null },
        email: "david@example.com",
        items: 1,
        price: 67.25,
        payment_status: "Failed",
        payment_method: "Credit Card",
        delivery_status: "Cancelled",
        shipping_address: "654 Maple Dr, Phoenix",
        date: "2025-10-05",
      },
      {
        _id: "ORD12340",
        customer: { name: "Lisa Anderson", image: null },
        email: "lisa@example.com",
        items: 4,
        price: 199.99,
        payment_status: "Paid",
        payment_method: "PayPal",
        delivery_status: "Processing",
        shipping_address: "987 Cedar Ln, Philadelphia",
        date: "2025-10-06",
      },
      {
        _id: "ORD12339",
        customer: { name: "James Martinez", image: null },
        email: "james@example.com",
        items: 6,
        price: 445.0,
        payment_status: "Pending",
        payment_method: "Bank Transfer",
        delivery_status: "Processing",
        shipping_address: "147 Birch Ave, San Antonio",
        date: "2025-10-05",
      },
      {
        _id: "ORD12338",
        customer: { name: "Jennifer Taylor", image: null },
        email: "jennifer@example.com",
        items: 2,
        price: 78.5,
        payment_status: "Paid",
        payment_method: "Credit Card",
        delivery_status: "Shipped",
        shipping_address: "258 Walnut St, San Diego",
        date: "2025-10-04",
      },
      {
        _id: "ORD12337",
        customer: { name: "Robert Lee", image: null },
        email: "robert@example.com",
        items: 7,
        price: 523.99,
        payment_status: "Paid",
        payment_method: "Debit Card",
        delivery_status: "Delivered",
        shipping_address: "369 Spruce Rd, Dallas",
        date: "2025-10-03",
      },
      {
        _id: "ORD12336",
        customer: { name: "Amanda White", image: null },
        email: "amanda@example.com",
        items: 3,
        price: 187.25,
        payment_status: "Paid",
        payment_method: "PayPal",
        delivery_status: "Shipped",
        shipping_address: "741 Ash Blvd, San Jose",
        date: "2025-10-02",
      },
    ],
    []
  );

  // Define 10 columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "Order ID",
        cell: (info) => <BoldTextCell value={info.getValue()} prefix="#" />,
      },
      {
        accessorKey: "customer",
        header: "Customer",
        cell: (info) => (
          <AvatarCell
            name={info.getValue().name}
            image={info.getValue().image}
          />
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: (info) => <TextCell value={info.getValue()} />,
      },
      {
        accessorKey: "items",
        header: "Items",
        cell: (info) => <BadgeCell value={info.getValue()} variant="primary" />,
      },
      {
        accessorKey: "price",
        header: "Total",
        cell: (info) => <PriceCell value={info.getValue()} />,
      },
      {
        accessorKey: "payment_status",
        header: "Payment",
        cell: (info) => <StatusCell value={info.getValue()} type="payment" />,
      },
      {
        accessorKey: "payment_method",
        header: "Method",
        cell: (info) => <TextCell value={info.getValue()} />,
      },
      {
        accessorKey: "delivery_status",
        header: "Status",
        cell: (info) => <StatusCell value={info.getValue()} type="delivery" />,
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: (info) => <DateCell value={info.getValue()} format="short" />,
      },
      {
        id: "action",
        header: "Actions",
        meta: { sticky: true },
        cell: (info) => (
          <ActionButtons
            viewLink={`/admin/dashboard/order/details/${info.row.original._id}`}
            onEdit={() => alert(`Edit order: ${info.row.original._id}`)}
            onDelete={() => alert(`Delete order: ${info.row.original._id}`)}
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
        showAddNew={true}
        data={data}
        columns={columns}
        title="Orders Management"
        searchPlaceholder="Search by order ID, customer, email..."
        pageSize={10}
        showPagination={true}
        showSearch={true}
      />
    </div>
  );
};

export default Orders;
