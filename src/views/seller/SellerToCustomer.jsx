import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { FiSend, FiUser } from "react-icons/fi";

const SellerToCustomer = () => {
  const { customerId } = useParams();
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const scrollRef = useRef();

  // Mock customers data
  const customers = [
    {
      _id: "CUS-001",
      name: "John Smith",
      image: null,
      email: "john@example.com",
      isActive: true,
    },
    {
      _id: "CUS-002",
      name: "Sarah Davis",
      image: null,
      email: "sarah@example.com",
      isActive: false,
    },
    {
      _id: "CUS-003",
      name: "Mike Johnson",
      image: null,
      email: "mike@example.com",
      isActive: true,
    },
    {
      _id: "CUS-004",
      name: "Emily Brown",
      image: null,
      email: "emily@example.com",
      isActive: true,
    },
  ];

  // Mock active customers
  const activeCustomer = [
    { customerId: "CUS-001" },
    { customerId: "CUS-003" },
    { customerId: "CUS-004" },
  ];

  // Mock messages - organized by customer
  const allMessages = {
    "CUS-001": [
      {
        _id: "1",
        senderId: "CUS-001",
        message: "Hi, I'd like to know more about this product.",
        createdAt: new Date(),
      },
      {
        _id: "2",
        senderId: "seller",
        message:
          "Hello! I'd be happy to help. Which product are you interested in?",
        createdAt: new Date(),
      },
      {
        _id: "3",
        senderId: "CUS-001",
        message: "The wireless headphones. Are they in stock?",
        createdAt: new Date(),
      },
      {
        _id: "4",
        senderId: "seller",
        message:
          "Yes, we have them in stock. They're available in black and white.",
        createdAt: new Date(),
      },
    ],
    "CUS-002": [
      {
        _id: "5",
        senderId: "CUS-002",
        message: "When will my order be delivered?",
        createdAt: new Date(),
      },
      {
        _id: "6",
        senderId: "seller",
        message:
          "Your order has been shipped and will arrive in 2-3 business days.",
        createdAt: new Date(),
      },
    ],
    "CUS-003": [
      {
        _id: "7",
        senderId: "CUS-003",
        message: "Do you offer bulk discounts?",
        createdAt: new Date(),
      },
      {
        _id: "8",
        senderId: "seller",
        message:
          "Yes, we offer discounts for orders of 10+ items. Would you like more details?",
        createdAt: new Date(),
      },
    ],
    "CUS-004": [
      {
        _id: "9",
        senderId: "CUS-004",
        message: "Thank you for the quick delivery!",
        createdAt: new Date(),
      },
      {
        _id: "10",
        senderId: "seller",
        message:
          "You're welcome! We're glad you're satisfied. Let us know if you need anything else.",
        createdAt: new Date(),
      },
    ],
  };

  const customer_seller_message = customerId
    ? allMessages[customerId] || []
    : [];

  const currentCustomer = customers.find((c) => c._id === customerId);

  const send = (e) => {
    e.preventDefault();
    console.log("Message sent:", text);
    setText("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [customer_seller_message]);

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="p-3">
      <div className="bg-white rounded-md shadow-lg h-[calc(100vh-100px)] overflow-hidden">
        <div className="flex w-full h-full relative">
          {/* Customers Sidebar */}
          <div
            className={`w-[280px] h-full absolute z-10 ${
              show ? "left-0" : "-left-[280px]"
            } md:left-0 md:relative transition-all bg-white border-r border-slate-200`}
          >
            <div className="w-full h-full flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-800">Customers</h2>
                <button
                  onClick={() => setShow(!show)}
                  className="md:hidden text-slate-600 hover:text-slate-800"
                >
                  <IoMdClose size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {customers.map((c) => (
                  <Link
                    key={c._id}
                    to={`/seller/dashboard/chat-customer/${c._id}`}
                    className={`flex items-center gap-3 p-3 border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                      customerId === c._id ? "bg-slate-100" : ""
                    }`}
                  >
                    <div className="relative">
                      {c.image ? (
                        <img
                          className="w-11 h-11 rounded-md object-cover"
                          src={c.image}
                          alt={c.name}
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-md bg-slate-200 flex items-center justify-center">
                          <span className="text-slate-600 font-semibold text-sm">
                            {getInitials(c.name)}
                          </span>
                        </div>
                      )}
                      {activeCustomer.some((a) => a.customerId === c._id) && (
                        <div className="w-3 h-3 bg-green-500 rounded-full absolute -right-1 -bottom-1 border-2 border-white"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-slate-800 truncate">
                        {c.name}
                      </h3>
                      <p className="text-xs text-slate-500 truncate">
                        {c.email}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col h-full">
            {/* Chat Header */}
            <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-white">
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => setShow(!show)}
                  className="md:hidden w-9 h-9 rounded-md bg-slate-600 hover:bg-slate-700 flex items-center justify-center text-white transition-all flex-shrink-0"
                >
                  <FaList />
                </button>

                {customerId && currentCustomer ? (
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {currentCustomer.image ? (
                        <img
                          className="w-11 h-11 rounded-md object-cover"
                          src={currentCustomer.image}
                          alt={currentCustomer.name}
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-md bg-slate-200 flex items-center justify-center">
                          <span className="text-slate-600 font-semibold text-sm">
                            {getInitials(currentCustomer.name)}
                          </span>
                        </div>
                      )}
                      {activeCustomer.some(
                        (a) => a.customerId === currentCustomer._id
                      ) && (
                        <div className="w-3 h-3 bg-green-500 rounded-full absolute -right-1 -bottom-1 border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800">
                        {currentCustomer.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {currentCustomer.email}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-600">
                    Select a customer to chat
                  </div>
                )}
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto bg-slate-50 p-4">
              {customerId ? (
                <div className="space-y-4">
                  {customer_seller_message.map((m, i) => {
                    if (m.senderId === customerId) {
                      return (
                        <div
                          key={i}
                          ref={scrollRef}
                          className="flex justify-start items-start gap-2"
                        >
                          <div className="w-8 h-8 rounded-md bg-slate-200 flex items-center justify-center flex-shrink-0">
                            <FiUser className="text-slate-600" />
                          </div>
                          <div className="bg-white border border-slate-200 rounded-md px-4 py-2 max-w-[70%] shadow-sm">
                            <p className="text-sm text-slate-800">
                              {m.message}
                            </p>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={i}
                          ref={scrollRef}
                          className="flex justify-end items-start gap-2"
                        >
                          <div className="bg-blue-600 rounded-md px-4 py-2 max-w-[70%] shadow-sm">
                            <p className="text-sm text-white">{m.message}</p>
                          </div>
                          <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-semibold text-xs">
                              ME
                            </span>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                  <FiUser size={48} className="mb-2" />
                  <p className="text-sm">Select a customer to start chatting</p>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-slate-200">
              <form onSubmit={send} className="flex gap-2">
                <input
                  readOnly={!customerId}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="flex-1 px-3 py-2.5 border border-slate-300 outline-none bg-white text-slate-700 placeholder:text-slate-400 focus:border-blue-500 transition-colors disabled:bg-slate-50 disabled:cursor-not-allowed"
                  type="text"
                  placeholder={
                    customerId
                      ? "Type your message..."
                      : "Select a customer first"
                  }
                />
                <button
                  disabled={!customerId}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium transition-colors flex items-center gap-2"
                >
                  <FiSend size={16} />
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerToCustomer;
