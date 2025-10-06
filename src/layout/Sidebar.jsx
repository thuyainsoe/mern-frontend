import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getNav } from "../navigation";
import { BiLogOutCircle } from "react-icons/bi";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { pathname } = useLocation();
  const [allNav, setAllNav] = useState([]);
  useEffect(() => {
    const navs = getNav("admin");
    setAllNav(navs);
  }, []);

  return (
    <div>
      <div
        className={`fixed duration-200 ${
          !showSidebar ? "invisible" : "visible"
        } w-screen h-screen bg-[#0080ef80] top-0 left-0 z-10`}
        onClick={() => {
          setShowSidebar(false);
        }}
      ></div>
      <div
        className={`w-[260px] fixed bg-slate-100 z-50 top-0 h-screen transition-all ${
          showSidebar ? "left-0" : "-left-[260px] lg:left-0"
        }`}
      >
        <div className="h-[70px] flex justify-center items-center">
          <Link to={"/"} className="w-[180px] h-[50px]">
            <img className="w-full h-full" src="/images/logo.png" alt="" />
          </Link>
        </div>

        <div className="px-[16px]">
          <ul>
            {allNav.map((n, i) => (
              <li key={i}>
                <Link
                  to={n.path}
                  className={`${
                    pathname === n.path
                      ? "bg-blue-600 shadow-indigo-500/50 text-white duration-500"
                      : "text-[#030811] font-bold duration-200"
                  } px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4  transition-all
                   w-full mb-1`}
                >
                  <span>{n.icon}</span>
                  <span>{n.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                className="text-[#030811] font-bold duration-200
                   px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4  transition-all
                   w-full mb-1"
              >
                <span>
                  <BiLogOutCircle />
                </span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
