import { useState, useEffect } from "react";
import { FaImages, FaRegEdit } from "react-icons/fa";
import { PropagateLoader } from "react-spinners";
import {
  useGetProfile,
  useUploadProfileImage,
  useUpdateShopInfo,
  useChangePassword,
} from "../../hooks/useProfile";

const Profile = () => {
  // Fetch profile data
  const { data: profileData, isLoading: profileLoading } = useGetProfile();
  const uploadImageMutation = useUploadProfileImage();
  const updateShopInfoMutation = useUpdateShopInfo();
  const changePasswordMutation = useChangePassword();

  const userInfo = profileData?.userInfo || null;

  const [state, setState] = useState({
    shopName: "",
    division: "",
    district: "",
    sub_district: "",
  });

  const [passwordData, setPasswordData] = useState({
    email: "",
    old_password: "",
    new_password: "",
  });

  const [isEditingShopInfo, setIsEditingShopInfo] = useState(false);

  // Populate form with existing shop info
  useEffect(() => {
    if (userInfo?.shopInfo) {
      setState({
        shopName: userInfo.shopInfo.shopName || "",
        division: userInfo.shopInfo.division || "",
        district: userInfo.shopInfo.district || "",
        sub_district: userInfo.shopInfo.sub_district || "",
      });
    }
  }, [userInfo]);

  // Toggle edit mode for shop info
  const handleEditShopInfo = () => {
    setIsEditingShopInfo(true);
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    // Reset to original values
    if (userInfo?.shopInfo) {
      setState({
        shopName: userInfo.shopInfo.shopName || "",
        division: userInfo.shopInfo.division || "",
        district: userInfo.shopInfo.district || "",
        sub_district: userInfo.shopInfo.sub_district || "",
      });
    }
    setIsEditingShopInfo(false);
  };

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const pinputHandle = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const add_image = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImageMutation.mutate(file);
    }
  };

  const add = (e) => {
    e.preventDefault();
    updateShopInfoMutation.mutate(state, {
      onSuccess: () => {
        // Exit edit mode after successful update
        setIsEditingShopInfo(false);
      },
    });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    changePasswordMutation.mutate(passwordData, {
      onSuccess: () => {
        // Reset password form
        setPasswordData({
          email: "",
          old_password: "",
          new_password: "",
        });
      },
    });
  };

  const create_stripe_connect_account = () => {
    console.log("Create Stripe account");
    // TODO: Create Stripe connect account
  };

  const overrideStyle = {
    display: "flex",
    margin: "0 auto",
    height: "24px",
    justifyContent: "center",
    alignItems: "center",
  };

  // Show loading state while fetching profile
  if (profileLoading) {
    return (
      <div className="p-3">
        <div className="bg-white rounded-md shadow-lg p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-slate-600">Loading profile...</div>
          </div>
        </div>
      </div>
    );
  }

  // Check if shop info exists
  const hasShopInfo =
    userInfo?.shopInfo?.shopName ||
    userInfo?.shopInfo?.division ||
    userInfo?.shopInfo?.district ||
    userInfo?.shopInfo?.sub_district;

  return (
    <div className="p-3">
      <div className="w-full flex flex-wrap gap-3">
        {/* Left Column - Profile & Shop Info */}
        <div className="w-full md:w-[calc(50%-6px)]">
          <div className="w-full bg-white rounded-md shadow-lg p-6">
            {/* Profile Image */}
            <div className="flex justify-start items-center py-3 mb-6">
              {userInfo?.image ? (
                <label
                  htmlFor="img"
                  className="h-[150px] w-[200px] relative cursor-pointer overflow-hidden border-2 border-slate-200 hover:border-blue-500 transition-colors"
                >
                  <img
                    src={userInfo.image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  {uploadImageMutation.isPending && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <PropagateLoader color="#fff" />
                    </div>
                  )}
                </label>
              ) : (
                <label
                  className="flex justify-center items-center flex-col h-[150px] w-[200px] cursor-pointer border-2 border-dashed border-slate-300 hover:border-blue-500 transition-colors relative bg-slate-50"
                  htmlFor="img"
                >
                  <FaImages className="text-4xl text-slate-400 mb-2" />
                  <span className="text-sm text-slate-600 font-medium">
                    Select Image
                  </span>
                  {uploadImageMutation.isPending && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <PropagateLoader color="#fff" />
                    </div>
                  )}
                </label>
              )}
              <input
                onChange={add_image}
                type="file"
                className="hidden"
                id="img"
                accept="image/*"
              />
            </div>

            {/* User Info */}
            <div className="mb-6">
              <div className="flex justify-between text-sm flex-col gap-3 p-5 bg-slate-50 border border-slate-200 relative">
                <div className="flex gap-2">
                  <span className="font-semibold text-slate-700">Name:</span>
                  <span className="text-slate-600">{userInfo.name}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold text-slate-700">Email:</span>
                  <span className="text-slate-600">{userInfo.email}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold text-slate-700">Role:</span>
                  <span className="text-slate-600">{userInfo.role}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold text-slate-700">Status:</span>
                  <span className="text-slate-600">{userInfo.status}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold text-slate-700">
                    Payment Account:
                  </span>
                  <p>
                    {userInfo.payment === "active" ? (
                      <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1">
                        {userInfo.payment}
                      </span>
                    ) : (
                      <span
                        onClick={create_stripe_connect_account}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs cursor-pointer font-semibold px-3 py-1 transition-colors"
                      >
                        Click Active
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Shop Info */}
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-4">
                Shop Information
              </h2>
              {!hasShopInfo || isEditingShopInfo ? (
                <form onSubmit={add}>
                  <div className="flex flex-col w-full gap-2 mb-4">
                    <label
                      htmlFor="Shop"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Shop Name
                    </label>
                    <input
                      value={state.shopName}
                      onChange={inputHandle}
                      className="px-3 py-2.5 border border-slate-300 outline-none bg-white text-slate-700 placeholder:text-slate-400 focus:border-blue-500 transition-colors"
                      type="text"
                      name="shopName"
                      id="Shop"
                      placeholder="Shop Name"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-2 mb-4">
                    <label
                      htmlFor="division"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Division Name
                    </label>
                    <input
                      value={state.division}
                      onChange={inputHandle}
                      className="px-3 py-2.5 border border-slate-300 outline-none bg-white text-slate-700 placeholder:text-slate-400 focus:border-blue-500 transition-colors"
                      type="text"
                      name="division"
                      id="division"
                      placeholder="Division Name"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-2 mb-4">
                    <label
                      htmlFor="district"
                      className="text-sm font-semibold text-slate-700"
                    >
                      District Name
                    </label>
                    <input
                      value={state.district}
                      onChange={inputHandle}
                      className="px-3 py-2.5 border border-slate-300 outline-none bg-white text-slate-700 placeholder:text-slate-400 focus:border-blue-500 transition-colors"
                      type="text"
                      name="district"
                      id="district"
                      placeholder="District Name"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-2 mb-4">
                    <label
                      htmlFor="sub"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Sub District Name
                    </label>
                    <input
                      value={state.sub_district}
                      onChange={inputHandle}
                      className="px-3 py-2.5 border border-slate-300 outline-none bg-white text-slate-700 placeholder:text-slate-400 focus:border-blue-500 transition-colors"
                      type="text"
                      name="sub_district"
                      id="sub"
                      placeholder="Sub District Name"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      disabled={updateShopInfoMutation.isPending}
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-7 py-2.5 font-medium transition-colors min-w-[150px]"
                    >
                      {updateShopInfoMutation.isPending ? (
                        <PropagateLoader
                          color="#fff"
                          cssOverride={overrideStyle}
                        />
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                    {isEditingShopInfo && (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        disabled={updateShopInfoMutation.isPending}
                        className="bg-slate-200 hover:bg-slate-300 disabled:bg-slate-100 text-slate-700 px-7 py-2.5 font-medium transition-colors min-w-[150px]"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              ) : (
                <div className="flex justify-between text-sm flex-col gap-3 p-5 bg-slate-50 border border-slate-200 relative">
                  <span
                    onClick={handleEditShopInfo}
                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white absolute right-2 top-2 cursor-pointer transition-colors"
                  >
                    <FaRegEdit size={14} />
                  </span>
                  <div className="flex gap-2">
                    <span className="font-semibold text-slate-700">
                      Shop Name:
                    </span>
                    <span className="text-slate-600">
                      {userInfo.shopInfo?.shopName}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-slate-700">
                      Division:
                    </span>
                    <span className="text-slate-600">
                      {userInfo.shopInfo?.division}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-slate-700">
                      District:
                    </span>
                    <span className="text-slate-600">
                      {userInfo.shopInfo?.district}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-slate-700">
                      Sub District:
                    </span>
                    <span className="text-slate-600">
                      {userInfo.shopInfo?.sub_district}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Change Password */}
        <div className="w-full md:w-[calc(50%-6px)]">
          <div className="bg-white rounded-md shadow-lg p-6">
            <h1 className="text-lg font-bold text-slate-800 mb-6">
              Change Password
            </h1>

            <form onSubmit={handlePasswordChange}>
              <div className="flex flex-col w-full gap-2 mb-4">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-700"
                >
                  Email
                </label>
                <input
                  className="px-3 py-2.5 border border-slate-300 outline-none bg-white text-slate-700 placeholder:text-slate-400 focus:border-blue-500 transition-colors"
                  type="email"
                  name="email"
                  id="email"
                  value={passwordData.email}
                  onChange={pinputHandle}
                  placeholder="Email"
                />
              </div>

              <div className="flex flex-col w-full gap-2 mb-4">
                <label
                  htmlFor="o_password"
                  className="text-sm font-semibold text-slate-700"
                >
                  Old Password
                </label>
                <input
                  className="px-3 py-2.5 border border-slate-300 outline-none bg-white text-slate-700 placeholder:text-slate-400 focus:border-blue-500 transition-colors"
                  type="password"
                  name="old_password"
                  id="o_password"
                  value={passwordData.old_password}
                  onChange={pinputHandle}
                  placeholder="Old Password"
                />
              </div>

              <div className="flex flex-col w-full gap-2 mb-6">
                <label
                  htmlFor="n_password"
                  className="text-sm font-semibold text-slate-700"
                >
                  New Password
                </label>
                <input
                  className="px-3 py-2.5 border border-slate-300 outline-none bg-white text-slate-700 placeholder:text-slate-400 focus:border-blue-500 transition-colors"
                  type="password"
                  name="new_password"
                  id="n_password"
                  value={passwordData.new_password}
                  onChange={pinputHandle}
                  placeholder="New Password"
                />
              </div>

              <button
                disabled={changePasswordMutation.isPending}
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-7 py-2.5 font-medium transition-colors min-w-[200px]"
              >
                {changePasswordMutation.isPending ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  "Save Changes"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
