import { BsCurrencyDollar } from "react-icons/bs";
import { FaShoppingCart, FaUsers } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";

const AdminDashboard = () => {
  return (
    <div className="px-2 md:px-7 py-5 z-100">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-3">
        <div className="flex justify-between items-center p-5 bg-blue-400 rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white text-left">
            <h2 className="text-2xl font-bold">$3434</h2>
            <span className="text-md font-medium">Total Sale</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-white flex justify-center items-center text-2xl">
            <BsCurrencyDollar />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-pink-400 rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white text-left">
            <h2 className="text-2xl font-bold">50</h2>
            <span className="text-md font-medium">Products</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-white flex justify-center items-center text-2xl">
            <MdProductionQuantityLimits />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-green-400 rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white text-left">
            <h2 className="text-2xl font-bold">10</h2>
            <span className="text-md font-medium">Sellers</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-white flex justify-center items-center text-2xl">
            <FaUsers />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-orange-400 rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white text-left">
            <h2 className="text-2xl font-bold">$434</h2>
            <span className="text-md font-medium">Orders</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-white flex justify-center items-center text-2xl">
            <FaShoppingCart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
