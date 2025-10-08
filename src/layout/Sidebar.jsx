import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getNav } from "../navigation";
import { BiLogOutCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const [allNav, setAllNav] = useState([]);
  useEffect(() => {
    const navs = getNav(role);
    setAllNav(navs);
  }, [role]);

  return (
    <div>
      <div
        className={`fixed duration-200 ${
          !showSidebar ? "invisible" : "visible"
        } w-screen h-screen bg-slate-900/50 backdrop-blur-sm top-0 left-0 z-10`}
        onClick={() => {
          setShowSidebar(false);
        }}
      ></div>
      <div
        className={`w-[260px] fixed bg-white shadow-xl z-50 top-0 h-screen transition-all ${
          showSidebar ? "left-0" : "-left-[260px] lg:left-0"
        }`}
      >
        <div className="h-[70px] flex items-center px-6 border-b border-slate-100">
          <Link to={"/"} className="flex flex-col">
            <h1 className="text-xl font-extrabold text-slate-800 tracking-wide">
              ShopHub
            </h1>
            <span className="text-xs text-slate-500 font-medium tracking-wide">
              ADMIN PANEL
            </span>
          </Link>
        </div>

        <div className="px-4 py-4">
          <ul>
            {allNav.map((n, i) => (
              <li key={i}>
                <Link
                  to={n.path}
                  className={`${
                    pathname === n.path
                      ? "bg-slate-800 text-white"
                      : "text-slate-700 hover:bg-slate-50 font-semibold"
                  } px-4 py-3 rounded-md flex justify-start items-center gap-3 hover:pl-6 transition-all
                   w-full mb-2`}
                >
                  <span className="text-lg">{n.icon}</span>
                  <span className="text-sm">{n.title}</span>
                </Link>
              </li>
            ))}
            <li className="mt-4 pt-4 border-t border-slate-200">
              <button
                className="text-red-600 hover:bg-red-50 font-semibold
                   px-4 py-3 rounded-md flex justify-start items-center gap-3 hover:pl-6 transition-all
                   w-full mb-2"
              >
                <span className="text-lg">
                  <BiLogOutCircle />
                </span>
                <span className="text-sm">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
