import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useGetSeller, useUpdateSellerStatus } from "../../hooks/useSeller";
import Dropdown from "../../components/Dropdown";

const SellerRequestDetail = () => {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("");

  const { data: sellerData, isLoading, isError } = useGetSeller(sellerId);

  const updateStatusMutation = useUpdateSellerStatus();

  const handleStatusUpdate = () => {
    if (!selectedStatus) return;

    updateStatusMutation.mutate(
      { id: sellerId, status: selectedStatus },
      {
        onSuccess: () => {
          navigate("/admin/dashboard/sellers-request");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="p-3">
        <div className="bg-white rounded-md shadow-lg p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-slate-600">Loading seller details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !sellerData?.seller) {
    return (
      <div className="p-3">
        <div className="bg-white rounded-md shadow-lg p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-red-600">
              Failed to load seller details. Please try again.
            </div>
          </div>
        </div>
      </div>
    );
  }

  const seller = sellerData.seller;

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    active: "bg-green-100 text-green-800",
    deactive: "bg-red-100 text-red-800",
  };

  return (
    <div className="p-3">
      <div className="bg-white rounded-md shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center pb-6 border-b border-slate-200">
          <h1 className="text-xl font-bold text-slate-800">
            Seller Request Details
          </h1>
          <Link
            to="/admin/dashboard/sellers-request"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-all font-medium"
          >
            <FiArrowLeft className="text-sm" />
            <span>Back to Requests</span>
          </Link>
        </div>

        <div className="mt-6">
          {/* Seller Image */}
          {seller.image && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-slate-700 mb-3">
                Profile Picture
              </h2>
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-200">
                <img
                  src={seller.image}
                  alt={seller.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Seller Information Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-md">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  Applicant Name
                </label>
                <p className="text-base font-medium text-slate-800 mt-1">
                  {seller.name}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-md">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  Email Address
                </label>
                <p className="text-base font-medium text-slate-800 mt-1">
                  {seller.email}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-md">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  Current Status
                </label>
                <p
                  className={`w-fit block px-3 py-1 rounded-full text-sm font-semibold mt-2 ${
                    statusColors[seller.status] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {seller.status.charAt(0).toUpperCase() +
                    seller.status.slice(1)}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-md">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  Role
                </label>
                <p className="text-base font-medium text-slate-800 mt-1">
                  {seller.role?.charAt(0).toUpperCase() +
                    seller.role?.slice(1) || "Seller"}
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-md">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  Shop Name
                </label>
                <p className="text-base font-medium text-slate-800 mt-1">
                  {seller.shopInfo?.shopName || "Not provided"}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-md">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  Division
                </label>
                <p className="text-base font-medium text-slate-800 mt-1">
                  {seller.shopInfo?.division || "Not provided"}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-md">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  District
                </label>
                <p className="text-base font-medium text-slate-800 mt-1">
                  {seller.shopInfo?.district || "Not provided"}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-md">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  Sub District
                </label>
                <p className="text-base font-medium text-slate-800 mt-1">
                  {seller.shopInfo?.sub_district || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Status Update Section */}
          <div className="mt-6">
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-md">
              <h2 className="text-base font-semibold text-slate-800 mb-4">
                Update Seller Status
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-64">
                  <Dropdown
                    value={selectedStatus}
                    onChange={setSelectedStatus}
                    options={[
                      { label: "Pending", value: "pending" },
                      { label: "Active", value: "active" },
                      { label: "Deactive", value: "deactive" },
                    ]}
                    placeholder="Select status..."
                  />
                </div>
                <button
                  onClick={handleStatusUpdate}
                  disabled={!selectedStatus || updateStatusMutation.isPending}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-all disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  {updateStatusMutation.isPending
                    ? "Updating..."
                    : "Update Status"}
                </button>
              </div>
              <p className="text-sm text-slate-600 mt-3">
                Change the seller's account status. Active sellers can list
                products and receive orders.
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-slate-50 p-4 rounded-md">
              <label className="text-xs font-semibold text-slate-500 uppercase">
                Seller ID
              </label>
              <p className="text-sm font-mono text-slate-600 mt-1">
                {seller._id}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-md">
              <label className="text-xs font-semibold text-slate-500 uppercase">
                Payment Status
              </label>
              <p className="text-sm text-slate-600 mt-1">
                {seller.payment || "Not configured"}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-md">
              <label className="text-xs font-semibold text-slate-500 uppercase">
                Requested On
              </label>
              <p className="text-sm text-slate-600 mt-1">
                {new Date(seller.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-md">
              <label className="text-xs font-semibold text-slate-500 uppercase">
                Last Updated
              </label>
              <p className="text-sm text-slate-600 mt-1">
                {new Date(seller.updatedAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-slate-200">
            <Link
              to="/admin/dashboard/sellers-request"
              className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md font-medium transition-all"
            >
              Close
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerRequestDetail;
