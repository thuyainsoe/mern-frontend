import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Dropdown from "../../components/Dropdown";
import toast from "react-hot-toast";

const OrderDetails = () => {
  const { orderId } = useParams();

  // Mock order data
  const order = {
    _id: orderId || "ORD12345",
    date: "2025-10-07",
    price: 245.5,
    payment_status: "Paid",
    delivery_status: "Processing",
    shippingInfo: {
      name: "John Smith",
      address: "123 Main St",
      province: "New York",
      city: "New York",
      area: "Manhattan",
    },
    products: [
      {
        _id: "1",
        name: "Wireless Headphones Pro",
        brand: "AudioTech",
        quantity: 1,
        price: 89.99,
        images: ["https://via.placeholder.com/50"],
      },
      {
        _id: "2",
        name: "Smart Watch Series 5",
        brand: "TechWear",
        quantity: 1,
        price: 155.51,
        images: ["https://via.placeholder.com/50"],
      },
    ],
    suborder: [
      {
        _id: "SUB-001",
        seller: "Alice's Emporium",
        delivery_status: "Shipped",
        products: [
          {
            _id: "1",
            name: "Wireless Headphones Pro",
            brand: "AudioTech",
            quantity: 1,
            images: ["https://via.placeholder.com/50"],
          },
        ],
      },
      {
        _id: "SUB-002",
        seller: "Gadget World",
        delivery_status: "Processing",
        products: [
          {
            _id: "2",
            name: "Smart Watch Series 5",
            brand: "TechWear",
            quantity: 1,
            images: ["https://via.placeholder.com/50"],
          },
        ],
      },
    ],
  };

  const [status, setStatus] = useState(order.delivery_status.toLowerCase());

  const status_update = (value) => {
    setStatus(value);
    toast.success(`Order status updated to ${value}`);
    console.log("Status updated:", value);
  };

  return (
    <div className="p-3">
      {/* Header */}

      <div className="bg-white rounded-md shadow-lg p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800">Order Details</h1>
          <Link
            to="/admin/dashboard/orders"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-all font-medium"
          >
            <FiArrowLeft className="text-sm" />
            <span>Back to Orders</span>
          </Link>
        </div>
        <div className="w-full my-3 h-[1px] bg-slate-200"></div>
        {/* Order Header with Status Dropdown */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800">#{order._id}</h2>
              <p className="text-sm text-slate-600">{order.date}</p>
            </div>
          </div>
          <div className="w-48">
            <Dropdown
              value={status}
              onChange={status_update}
              options={[
                { label: "Pending", value: "pending" },
                { label: "Processing", value: "processing" },
                { label: "Warehouse", value: "warehouse" },
                { label: "Placed", value: "placed" },
                { label: "Cancelled", value: "cancelled" },
              ]}
              placeholder="Select Status"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column - Shipping & Products */}
          <div className="space-y-4">
            {/* Shipping Information */}
            <div>
              <h3 className="text-base font-bold text-slate-800 mb-2">
                Deliver To: {order.shippingInfo?.name}
              </h3>
              <p className="text-sm text-slate-600">
                {order.shippingInfo?.address}, {order.shippingInfo?.area},{" "}
                {order.shippingInfo?.city}, {order.shippingInfo?.province}
              </p>
            </div>

            {/* Payment Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Payment Status:
                </span>
                <span
                  className={`px-2 py-1 rounded-md text-xs font-semibold ${
                    order.payment_status === "Paid"
                      ? "bg-green-50 text-green-700"
                      : order.payment_status === "Pending"
                      ? "bg-orange-50 text-orange-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {order.payment_status}
                </span>
              </div>
              <div className="text-sm font-semibold text-slate-700">
                Total Price: ${order.price.toFixed(2)}
              </div>
            </div>

            {/* Products Summary */}
            <div className="bg-slate-50 rounded-md p-4">
              <h3 className="text-sm font-bold text-slate-800 mb-3">
                Order Products
              </h3>
              <div className="space-y-3">
                {order.products &&
                  order.products.map((p, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-12 h-12 bg-slate-200 rounded-md flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-slate-600">IMG</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-slate-800 truncate">
                          {p.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <span>Brand: {p.brand}</span>
                          <span>•</span>
                          <span>Qty: {p.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sub Orders */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-bold text-slate-800 mb-4">
              Seller Orders
            </h3>
            <div className="space-y-4">
              {order?.suborder?.map((o, i) => (
                <div
                  key={i}
                  className="bg-slate-50 rounded-md p-4 border border-slate-200"
                >
                  <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-200">
                    <h4 className="text-sm font-bold text-slate-800">
                      Seller {i + 1} Order
                    </h4>
                    <span
                      className={`px-3 py-1 rounded-md text-xs font-semibold ${
                        o.delivery_status === "Delivered"
                          ? "bg-green-50 text-green-700"
                          : o.delivery_status === "Shipped"
                          ? "bg-blue-50 text-blue-700"
                          : o.delivery_status === "Processing"
                          ? "bg-orange-50 text-orange-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {o.delivery_status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {o.products?.map((p, j) => (
                      <div key={j} className="flex gap-3 items-start">
                        <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center flex-shrink-0 border border-slate-200">
                          <span className="text-xs text-slate-600">IMG</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-semibold text-slate-800">
                            {p.name}
                          </h5>
                          <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
                            <span>Brand: {p.brand}</span>
                            <span>•</span>
                            <span>Quantity: {p.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
