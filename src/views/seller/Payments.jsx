import { useState } from "react";
import { MdCurrencyExchange } from "react-icons/md";
import moment from "moment";

// Mock data
const mockPendingWithdraws = [
  { _id: "1", amount: 500, status: "pending", createdAt: new Date("2024-01-15") },
  { _id: "2", amount: 750, status: "pending", createdAt: new Date("2024-01-20") },
  { _id: "3", amount: 300, status: "pending", createdAt: new Date("2024-02-05") },
  { _id: "4", amount: 1200, status: "pending", createdAt: new Date("2024-02-10") },
  { _id: "5", amount: 450, status: "pending", createdAt: new Date("2024-02-15") },
];

const mockSuccessWithdraws = [
  { _id: "1", amount: 1000, status: "success", createdAt: new Date("2024-01-10") },
  { _id: "2", amount: 2500, status: "success", createdAt: new Date("2024-01-25") },
  { _id: "3", amount: 800, status: "success", createdAt: new Date("2024-02-01") },
  { _id: "4", amount: 1500, status: "success", createdAt: new Date("2024-02-08") },
  { _id: "5", amount: 950, status: "success", createdAt: new Date("2024-02-12") },
];

const Payments = () => {
  const [amount, setAmount] = useState("");
  const [loader, setLoader] = useState(false);

  // Mock stats
  const totalAmount = 25000;
  const availableAmount = 5000;
  const withdrowAmount = 6750;
  const pendingAmount = 3200;

  const pendingWithdrows = mockPendingWithdraws;
  const successWithdrows = mockSuccessWithdraws;

  const sendRequest = (e) => {
    e.preventDefault();
    console.log("Send withdrawal request:", amount);
    setAmount("");
  };

  return (
    <div className="p-3">
      {/* Stats Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <div className="flex justify-between items-center p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 gap-3">
          <div className="flex flex-col justify-start items-start text-white text-left">
            <h2 className="text-3xl font-bold">${totalAmount}</h2>
            <span className="text-sm font-medium opacity-90">Total Sales</span>
          </div>
          <div className="w-[50px] h-[50px] rounded-full bg-white/20 backdrop-blur-sm flex justify-center items-center text-2xl text-white">
            <MdCurrencyExchange />
          </div>
        </div>

        <div className="flex justify-between items-center p-6 bg-gradient-to-br from-green-500 to-green-600 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 gap-3">
          <div className="flex flex-col justify-start items-start text-white text-left">
            <h2 className="text-3xl font-bold">${availableAmount}</h2>
            <span className="text-sm font-medium opacity-90">Available Amount</span>
          </div>
          <div className="w-[50px] h-[50px] rounded-full bg-white/20 backdrop-blur-sm flex justify-center items-center text-2xl text-white">
            <MdCurrencyExchange />
          </div>
        </div>

        <div className="flex justify-between items-center p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 gap-3">
          <div className="flex flex-col justify-start items-start text-white text-left">
            <h2 className="text-3xl font-bold">${withdrowAmount}</h2>
            <span className="text-sm font-medium opacity-90">Withdrawal Amount</span>
          </div>
          <div className="w-[50px] h-[50px] rounded-full bg-white/20 backdrop-blur-sm flex justify-center items-center text-2xl text-white">
            <MdCurrencyExchange />
          </div>
        </div>

        <div className="flex justify-between items-center p-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 gap-3">
          <div className="flex flex-col justify-start items-start text-white text-left">
            <h2 className="text-3xl font-bold">${pendingAmount}</h2>
            <span className="text-sm font-medium opacity-90">Pending Amount</span>
          </div>
          <div className="w-[50px] h-[50px] rounded-full bg-white/20 backdrop-blur-sm flex justify-center items-center text-2xl text-white">
            <MdCurrencyExchange />
          </div>
        </div>
      </div>

      {/* Withdrawal Section */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Send Request & Pending */}
        <div className="bg-white rounded-md shadow-lg p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Send Request</h2>
          <form onSubmit={sendRequest}>
            <div className="flex gap-3 flex-wrap mb-6">
              <input
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                min="0"
                type="number"
                className="flex-1 min-w-[200px] px-3 py-2.5 border border-slate-300 outline-none bg-white text-slate-700 placeholder:text-slate-400 focus:border-blue-500 transition-colors"
                name="amount"
                placeholder="Enter amount"
              />
              <button
                disabled={loader}
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-7 py-2.5 font-medium transition-colors"
              >
                {loader ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>

          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4">Pending Requests</h2>

            <div className="w-full overflow-x-auto">
              <div className="flex bg-slate-100 uppercase text-xs font-semibold text-slate-700 min-w-[340px] border-b-2 border-slate-200">
                <div className="w-[25%] py-3 px-4">No</div>
                <div className="w-[25%] py-3 px-4">Amount</div>
                <div className="w-[25%] py-3 px-4">Status</div>
                <div className="w-[25%] py-3 px-4">Date</div>
              </div>
              <div className="max-h-[300px] overflow-y-auto" style={{ minWidth: "340px" }}>
                {pendingWithdrows.map((item, index) => (
                  <div key={item._id} className="flex text-sm text-slate-700 border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <div className="w-[25%] py-3 px-4 whitespace-nowrap font-medium">{index + 1}</div>
                    <div className="w-[25%] py-3 px-4 whitespace-nowrap font-semibold">${item.amount}</div>
                    <div className="w-[25%] py-3 px-4 whitespace-nowrap">
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold">
                        {item.status}
                      </span>
                    </div>
                    <div className="w-[25%] py-3 px-4 whitespace-nowrap text-slate-600">
                      {moment(item.createdAt).format("LL")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Success Withdrawal */}
        <div className="bg-white rounded-md shadow-lg p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Success Withdrawals</h2>

          <div className="w-full overflow-x-auto">
            <div className="flex bg-slate-100 uppercase text-xs font-semibold text-slate-700 min-w-[340px] border-b-2 border-slate-200">
              <div className="w-[25%] py-3 px-4">No</div>
              <div className="w-[25%] py-3 px-4">Amount</div>
              <div className="w-[25%] py-3 px-4">Status</div>
              <div className="w-[25%] py-3 px-4">Date</div>
            </div>
            <div className="max-h-[450px] overflow-y-auto" style={{ minWidth: "340px" }}>
              {successWithdrows.map((item, index) => (
                <div key={item._id} className="flex text-sm text-slate-700 border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="w-[25%] py-3 px-4 whitespace-nowrap font-medium">{index + 1}</div>
                  <div className="w-[25%] py-3 px-4 whitespace-nowrap font-semibold">${item.amount}</div>
                  <div className="w-[25%] py-3 px-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold">
                      {item.status}
                    </span>
                  </div>
                  <div className="w-[25%] py-3 px-4 whitespace-nowrap text-slate-600">
                    {moment(item.createdAt).format("LL")}
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

export default Payments;
