import { FaList } from "react-icons/fa";

const Header = ({ showSidebar, setShowSidebar }) => {
  return (
    <div className="fixed top-0 left-0 w-full z-60">
      <div className="ml-0 lg:ml-[260px] h-[70px] flex justify-between items-center bg-white shadow-xs px-6 transition-all">
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
          <input
            className="px-4 py-2.5 outline-none border bg-slate-50 border-slate-300 rounded-lg text-slate-700 placeholder:text-slate-400 text-sm focus:border-indigo-500 transition-all"
            name="search"
            placeholder="Search..."
            type="text"
          />
        </div>
        <div className="flex justify-center items-center gap-8 relative">
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-3">
              <div className="flex justify-center items-center flex-col text-end">
                <h2 className="text-md font-bold text-slate-800">
                  Thurein Soe
                </h2>
                <span className="text-sm w-full font-medium text-slate-500">
                  Admin
                </span>
              </div>
              <img
                className="w-[45px] h-[45px] rounded-full overflow-hidden ring-2 ring-indigo-100"
                src="/images/admin.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
