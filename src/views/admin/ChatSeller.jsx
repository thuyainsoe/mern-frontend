import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { FiSend, FiUser } from "react-icons/fi";

const ChatSeller = () => {
  const { sellerId } = useParams();
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const scrollRef = useRef();

  // Mock sellers data
  const sellers = [
    {
      _id: "SEL-001",
      name: "Alice Johnson",
      image: null,
      storeName: "Alice's Emporium",
      isActive: true,
    },
    {
      _id: "SEL-002",
      name: "Bob Williams",
      image: null,
      storeName: "Bob's Bargains",
      isActive: false,
    },
    {
      _id: "SEL-003",
      name: "Charlie Brown",
      image: null,
      storeName: "Gadget World",
      isActive: true,
    },
    {
      _id: "SEL-004",
      name: "Diana Miller",
      image: null,
      storeName: "Fashion Forward",
      isActive: true,
    },
  ];

  // Mock active sellers
  const activeSeller = [
    { sellerId: "SEL-001" },
    { sellerId: "SEL-003" },
    { sellerId: "SEL-004" },
  ];

  // Mock messages - organized by seller
  const allMessages = {
    "SEL-001": [
      {
        _id: "1",
        senderId: "SEL-001",
        message: "Hello! I need help with my product listings.",
        createdAt: new Date(),
      },
      {
        _id: "2",
        senderId: "admin",
        message: "Hi there! I'd be happy to help. What specifically do you need assistance with?",
        createdAt: new Date(),
      },
      {
        _id: "3",
        senderId: "SEL-001",
        message: "I'm having trouble uploading product images.",
        createdAt: new Date(),
      },
      {
        _id: "4",
        senderId: "admin",
        message: "Let me guide you through the image upload process.",
        createdAt: new Date(),
      },
    ],
    "SEL-002": [
      {
        _id: "5",
        senderId: "SEL-002",
        message: "Hi, when will my payment be processed?",
        createdAt: new Date(),
      },
      {
        _id: "6",
        senderId: "admin",
        message: "Payments are processed every Friday. Yours will be processed this week.",
        createdAt: new Date(),
      },
    ],
    "SEL-003": [
      {
        _id: "7",
        senderId: "SEL-003",
        message: "I have a question about shipping rates.",
        createdAt: new Date(),
      },
    ],
    "SEL-004": [
      {
        _id: "8",
        senderId: "SEL-004",
        message: "Thank you for your support!",
        createdAt: new Date(),
      },
      {
        _id: "9",
        senderId: "admin",
        message: "You're welcome! Let us know if you need anything else.",
        createdAt: new Date(),
      },
    ],
  };

  const seller_admin_message = sellerId ? (allMessages[sellerId] || []) : [];

  const currentSeller = sellers.find((s) => s._id === sellerId);

  const send = (e) => {
    e.preventDefault();
    console.log("Message sent:", text);
    setText("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [seller_admin_message]);

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="p-3">
      <div className="bg-white rounded-md shadow-lg h-[calc(100vh-100px)] overflow-hidden">
        <div className="flex w-full h-full relative">
          {/* Sellers Sidebar */}
          <div
            className={`w-[280px] h-full absolute z-10 ${
              show ? "left-0" : "-left-[280px]"
            } md:left-0 md:relative transition-all bg-white border-r border-slate-200`}
          >
            <div className="w-full h-full flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-800">Sellers</h2>
                <button
                  onClick={() => setShow(!show)}
                  className="md:hidden text-slate-600 hover:text-slate-800"
                >
                  <IoMdClose size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {sellers.map((s) => (
                  <Link
                    key={s._id}
                    to={`/admin/dashboard/chat-sellers/${s._id}`}
                    className={`flex items-center gap-3 p-3 border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                      sellerId === s._id ? "bg-slate-100" : ""
                    }`}
                  >
                    <div className="relative">
                      {s.image ? (
                        <img
                          className="w-11 h-11 rounded-md object-cover"
                          src={s.image}
                          alt={s.name}
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-md bg-slate-200 flex items-center justify-center">
                          <span className="text-slate-600 font-semibold text-sm">
                            {getInitials(s.name)}
                          </span>
                        </div>
                      )}
                      {activeSeller.some((a) => a.sellerId === s._id) && (
                        <div className="w-3 h-3 bg-green-500 rounded-full absolute -right-1 -bottom-1 border-2 border-white"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-slate-800 truncate">
                        {s.name}
                      </h3>
                      <p className="text-xs text-slate-500 truncate">
                        {s.storeName}
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

                {sellerId && currentSeller ? (
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {currentSeller.image ? (
                        <img
                          className="w-11 h-11 rounded-md object-cover"
                          src={currentSeller.image}
                          alt={currentSeller.name}
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-md bg-slate-200 flex items-center justify-center">
                          <span className="text-slate-600 font-semibold text-sm">
                            {getInitials(currentSeller.name)}
                          </span>
                        </div>
                      )}
                      {activeSeller.some((a) => a.sellerId === currentSeller._id) && (
                        <div className="w-3 h-3 bg-green-500 rounded-full absolute -right-1 -bottom-1 border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800">
                        {currentSeller.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {currentSeller.storeName}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-600">Select a seller to chat</div>
                )}
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto bg-slate-50 p-4">
              {sellerId ? (
                <div className="space-y-4">
                  {seller_admin_message.map((m, i) => {
                    if (m.senderId === sellerId) {
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
                            <p className="text-sm text-slate-800">{m.message}</p>
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
                              AD
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
                  <p className="text-sm">Select a seller to start chatting</p>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-slate-200">
              <form onSubmit={send} className="flex gap-2">
                <input
                  readOnly={!sellerId}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-md outline-none text-slate-700 placeholder:text-slate-400 focus:border-blue-500 transition-all disabled:bg-slate-50 disabled:cursor-not-allowed"
                  type="text"
                  placeholder={sellerId ? "Type your message..." : "Select a seller first"}
                />
                <button
                  disabled={!sellerId}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-md font-medium transition-all flex items-center gap-2"
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

export default ChatSeller;
