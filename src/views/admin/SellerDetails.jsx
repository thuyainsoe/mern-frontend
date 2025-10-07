import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";
import Dropdown from "../../components/Dropdown";

const SellerDetails = () => {
  const { sellerId } = useParams();

  // Mock seller data
  const seller = {
    _id: sellerId,
    name: "Alice Johnson",
    email: "alice.j@example.com",
    role: "seller",
    status: "active",
    payment: "active",
    image: null,
    shopInfo: {
      shopName: "Alice's Emporium",
      division: "California",
      district: "San Francisco",
      sub_district: "Downtown",
    },
  };

  const [status, setStatus] = useState(seller.status);

  const submit = (e) => {
    e.preventDefault();
    toast.success("Status updated successfully!");
    console.log("Updated status:", status, "for seller:", sellerId);
  };

  return (
    <div className="p-3">
      {/* Header */}

      <div className="bg-white rounded-md shadow-lg p-3">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800">Seller Details</h1>
          <Link
            to="/admin/dashboard/sellers"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-all font-medium"
          >
            <FiArrowLeft className="text-sm" />
            <span>Back to Sellers</span>
          </Link>
        </div>

        <div className="w-full my-3 h-[1px] bg-slate-200"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Image Section */}
          <div className="flex justify-center items-center">
            <div className="w-full">
              {seller?.image ? (
                <img
                  className="w-full h-[230px] object-cover rounded-md"
                  src={seller.image}
                  alt="Seller"
                />
              ) : (
                <div className="w-full h-[230px] bg-slate-100 rounded-md flex items-center justify-center">
                  <span className="text-slate-500 font-medium">
                    Image Not Uploaded
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Basic Info Section */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-3">
              Basic Info
            </h2>
            <div className="bg-slate-50 rounded-md p-4 space-y-2.5 text-sm">
              <div className="flex gap-2">
                <span className="text-slate-600 font-semibold">Name:</span>
                <span className="text-slate-800 font-medium">
                  {seller?.name || "N/A"}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-slate-600 font-semibold">Email:</span>
                <span className="text-slate-800 font-medium">
                  {seller?.email || "N/A"}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-slate-600 font-semibold">Role:</span>
                <span className="text-slate-800 font-medium">
                  {seller?.role || "N/A"}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-slate-600 font-semibold">Status:</span>
                <span className="text-slate-800 font-medium">
                  {seller?.status || "N/A"}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-slate-600 font-semibold">
                  Payment Status:
                </span>
                <span className="text-slate-800 font-medium">
                  {seller?.payment || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-3">Address</h2>
            <div className="bg-slate-50 rounded-md p-4 space-y-2.5 text-sm">
              <div className="flex gap-2">
                <span className="text-slate-600 font-semibold">Shop Name:</span>
                <span className="text-slate-800 font-medium">
                  {seller?.shopInfo?.shopName || "N/A"}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-slate-600 font-semibold">Division:</span>
                <span className="text-slate-800 font-medium">
                  {seller?.shopInfo?.division || "N/A"}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-slate-600 font-semibold">District:</span>
                <span className="text-slate-800 font-medium">
                  {seller?.shopInfo?.district || "N/A"}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-slate-600 font-semibold">State:</span>
                <span className="text-slate-800 font-medium">
                  {seller?.shopInfo?.sub_district || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Update Form */}
        <div className="border-t border-slate-200 pt-4">
          <form onSubmit={submit}>
            <div className="flex gap-3 items-center">
              <Dropdown
                value={status}
                onChange={setStatus}
                options={[
                  { label: "--Select Status--", value: "" },
                  { label: "Active", value: "active" },
                  { label: "Deactive", value: "deactive" },
                ]}
                placeholder="--Select Status--"
                className="w-64"
                required
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-7 py-2 font-medium transition-all">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;
