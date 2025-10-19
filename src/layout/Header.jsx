import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";

const Header = ({ showSidebar, setShowSidebar }) => {
  const navigate = useNavigate();
  const { userInfo, role } = useSelector((state) => state.auth);
  const [showDropdown, setShowDropdown] = useState(false);

  const logout = () => {
    // Clear token from localStorage
    localStorage.removeItem("accessToken");
    // Navigate to login page based on role
    if (role === "admin") {
      navigate("/admin/login");
    } else {
      navigate("/login");
    }
    // Reload to clear Redux state
    window.location.reload();
  };

  // Get first letter of name for avatar fallback
  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  // Capitalize role for display
  const displayRole = role
    ? role.charAt(0).toUpperCase() + role.slice(1)
    : "User";

  return (
    <div className="fixed top-0 left-0 w-full z-60">
      <div className="ml-0 lg:ml-[260px] h-[70px] flex justify-between items-center bg-white border-l border-l-slate-200 px-6 transition-all">
        <div
          className="w-[40px] flex lg:hidden h-[40px] rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg hover:shadow-indigo-500/50
          justify-center items-center cursor-pointer text-white transition-all"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <span>
            <FaList />
          </span>
        </div>
        <div className="hidden md:block">
          {/* Search input - can be enabled later */}
        </div>
        <div className="flex justify-center items-center gap-8 relative">
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-3 relative">
              <div className="flex justify-center items-center flex-col text-end">
                <h2 className="text-md font-bold text-slate-800">
                  {userInfo?.name || "User"}
                </h2>
                <span className="text-sm w-full font-medium text-slate-500">
                  {displayRole}
                </span>
              </div>

              {/* User Avatar with Dropdown */}
              <div className="relative">
                <div
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="cursor-pointer"
                >
                  {userInfo?.image ? (
                    <img
                      className="w-[35px] h-[35px] rounded-full overflow-hidden ring-2 ring-indigo-100 object-cover"
                      src={userInfo.image}
                      alt={userInfo?.name || "User"}
                    />
                  ) : (
                    <div className="w-[35px] h-[35px] rounded-full overflow-hidden ring-2 ring-indigo-100 bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                      {getInitials(userInfo?.name)}
                    </div>
                  )}
                </div>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 top-[55px] w-[200px] bg-white rounded-md shadow-lg border border-slate-200 py-2 z-50">
                    <button
                      onClick={logout}
                      className="w-full px-2 py-1 text-left hover:bg-slate-50 transition-colors flex items-center gap-3 text-slate-700"
                    >
                      <BiLogOutCircle size={18} className="text-red-600" />
                      <span className="font-medium text-base">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop to close dropdown when clicking outside */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        ></div>
      )}
    </div>
  );
};

export default Header;
