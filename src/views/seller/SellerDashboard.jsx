import { BsCurrencyDollar } from "react-icons/bs";
import { FaShoppingCart, FaUsers } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import moment from "moment";

const SellerDashboard = () => {
  // Mock data for recent seller messages
  const mockMessages = [
    {
      _id: "1",
      senderName: "John Store",
      message: "Hello! I have a question about product inventory management.",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      senderId: "seller1",
    },
    {
      _id: "2",
      senderName: "Sarah Shop",
      message: "Can you help me with the shipping rates configuration?",
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      senderId: "seller2",
    },
    {
      _id: "3",
      senderName: "Mike Market",
      message: "Thank you for approving my store!",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      senderId: "seller3",
    },
  ];

  // Mock data for recent orders
  const mockOrders = [
    {
      _id: "ORD12345",
      price: 125.5,
      payment_status: "Paid",
      delivery_status: "Delivered",
    },
    {
      _id: "ORD12344",
      price: 89.99,
      payment_status: "Pending",
      delivery_status: "Processing",
    },
    {
      _id: "ORD12343",
      price: 245.0,
      payment_status: "Paid",
      delivery_status: "Shipped",
    },
    {
      _id: "ORD12342",
      price: 67.25,
      payment_status: "Paid",
      delivery_status: "Delivered",
    },
    {
      _id: "ORD12341",
      price: 156.8,
      payment_status: "Failed",
      delivery_status: "Cancelled",
    },
  ];

  const recentOrder = mockOrders;
  const state = {
    series: [
      {
        name: "Orders",
        data: [23, 34, 45, 56, 76, 34, 23, 76, 87, 78, 34, 45],
      },
      {
        name: "Revenue",
        data: [67, 39, 45, 56, 90, 56, 23, 56, 87, 78, 67, 78],
      },
      {
        name: "Sellers",
        data: [34, 39, 56, 56, 80, 67, 23, 56, 98, 78, 45, 56],
      },
    ],
    options: {
      color: ["#181ee8", "#181ee8"],
      plotOptions: {
        radius: 30,
      },
      chart: {
        background: "transparent",
        foreColor: "#d0d2d6",
      },
      dataLabels: {
        enabled: false,
      },
      strock: {
        show: true,
        curve: ["smooth", "straight", "stepline"],
        lineCap: "butt",
        colors: "#f0f0f0",
        width: 0.5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apl",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: {
        position: "top",
      },
      responsive: [
        {
          breakpoint: 565,
          yaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apl",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            chart: {
              height: "550px",
            },
          },
        },
      ],
    },
  };

  return (
    <div className="p-3">
      {/* Stats */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="flex justify-between items-center p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 gap-3">
          <div className="flex flex-col justify-start items-start text-white text-left">
            <h2 className="text-3xl font-bold">$3434</h2>
            <span className="text-sm font-medium opacity-90">Total Sale</span>
          </div>
          <div className="w-[50px] h-[50px] rounded-full bg-white/20 backdrop-blur-sm flex justify-center items-center text-2xl text-white">
            <BsCurrencyDollar />
          </div>
        </div>

        <div className="flex justify-between items-center p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 gap-3">
          <div className="flex flex-col justify-start items-start text-white text-left">
            <h2 className="text-3xl font-bold">50</h2>
            <span className="text-sm font-medium opacity-90">Products</span>
          </div>
          <div className="w-[50px] h-[50px] rounded-full bg-white/20 backdrop-blur-sm flex justify-center items-center text-2xl text-white">
            <MdProductionQuantityLimits />
          </div>
        </div>

        <div className="flex justify-between items-center p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 gap-3">
          <div className="flex flex-col justify-start items-start text-white text-left">
            <h2 className="text-3xl font-bold">10</h2>
            <span className="text-sm font-medium opacity-90">Sellers</span>
          </div>
          <div className="w-[50px] h-[50px] rounded-full bg-white/20 backdrop-blur-sm flex justify-center items-center text-2xl text-white">
            <FaUsers />
          </div>
        </div>

        <div className="flex justify-between items-center p-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 gap-3">
          <div className="flex flex-col justify-start items-start text-white text-left">
            <h2 className="text-3xl font-bold">$434</h2>
            <span className="text-sm font-medium opacity-90">Orders</span>
          </div>
          <div className="w-[50px] h-[50px] rounded-full bg-white/20 backdrop-blur-sm flex justify-center items-center text-2xl text-white">
            <FaShoppingCart />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="w-full flex flex-wrap mt-3">
        <div className="w-full lg:w-7/12 lg:pr-1">
          <div className="w-full bg-white p-6 rounded-xl shadow-lg">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>

        <div className="w-full lg:w-5/12 lg:pl-3 mt-6 lg:mt-0">
          <div className="w-full bg-white pb-6 rounded-xl shadow-lg lg:h-[413px] overflow-y-auto">
            <div className="p-6 flex justify-between items-center mb-6 sticky top-0 z-50 bg-white">
              <h2 className="font-bold text-lg text-slate-800">
                Recent Seller Messages
              </h2>
              <Link className="font-semibold text-sm text-indigo-600 hover:text-indigo-700 transition-colors">
                View All
              </Link>
            </div>

            <div className="flex flex-col gap-3 px-6">
              <ol className="relative border-l-2 border-slate-200 ml-3">
                {mockMessages.map((m, i) => (
                  <li key={m._id || i} className="mb-6 ml-6">
                    <div className="flex absolute -left-[21px] shadow-md justify-center items-center w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full z-10 ring-4 ring-white">
                      <span className="text-white text-xs font-bold">
                        {m.senderName.charAt(0)}
                      </span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center mb-2">
                        <Link className="text-sm font-semibold text-slate-800 hover:text-indigo-600 transition-colors">
                          {m.senderName}
                        </Link>
                        <time className="text-xs font-medium text-slate-500">
                          {moment(m.createdAt).startOf("hour").fromNow()}
                        </time>
                      </div>
                      <div className="text-sm text-slate-600 leading-relaxed">
                        {m.message}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="w-full bg-white p-6 rounded-xl shadow-lg mt-3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-lg text-slate-800">Recent Orders</h2>
            <Link className="font-semibold text-sm text-indigo-600 hover:text-indigo-700 transition-colors">
              View All
            </Link>
          </div>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-600 uppercase bg-slate-50 border-b-2 border-slate-200">
                <tr>
                  <th scope="col" className="py-4 px-6 font-semibold">
                    Order Id
                  </th>
                  <th scope="col" className="py-4 px-6 font-semibold">
                    Price
                  </th>
                  <th scope="col" className="py-4 px-6 font-semibold">
                    Payment Status
                  </th>
                  <th scope="col" className="py-4 px-6 font-semibold">
                    Order Status
                  </th>
                  <th scope="col" className="py-4 px-6 font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {recentOrder.map((d, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-800 whitespace-nowrap">
                      #{d._id}
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-700 whitespace-nowrap">
                      ${d.price.toFixed(2)}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          d.payment_status === "Paid"
                            ? "bg-emerald-100 text-emerald-700"
                            : d.payment_status === "Pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {d.payment_status}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          d.delivery_status === "Delivered"
                            ? "bg-emerald-100 text-emerald-700"
                            : d.delivery_status === "Shipped"
                            ? "bg-blue-100 text-blue-700"
                            : d.delivery_status === "Processing"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {d.delivery_status}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <Link
                        to={`/admin/dashboard/order/details/${d._id}`}
                        className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
