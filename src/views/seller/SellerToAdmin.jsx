import { useState, useRef, useEffect } from "react";
import { FiSend, FiUser } from "react-icons/fi";

const SellerToAdmin = () => {
  const [text, setText] = useState("");
  const scrollRef = useRef();

  // Mock messages between seller and admin
  const messages = [
    {
      _id: "1",
      senderId: "seller",
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
      senderId: "seller",
      message: "I'm having trouble uploading product images.",
      createdAt: new Date(),
    },
    {
      _id: "4",
      senderId: "admin",
      message: "Let me guide you through the image upload process. First, make sure your images are in JPG or PNG format.",
      createdAt: new Date(),
    },
    {
      _id: "5",
      senderId: "seller",
      message: "Thank you! That worked perfectly.",
      createdAt: new Date(),
    },
  ];

  const send = (e) => {
    e.preventDefault();
    console.log("Message sent:", text);
    setText("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="p-3">
      <div className="bg-white rounded-md shadow-lg h-[calc(100vh-100px)] overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Chat Header */}
          <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-md bg-blue-600 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">AD</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Admin Support</h3>
                <p className="text-xs text-slate-500">Always available</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-slate-600">Online</span>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto bg-slate-50 p-4">
            <div className="space-y-4">
              {messages.map((m, i) => {
                if (m.senderId === "seller") {
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
                        <FiUser className="text-white" />
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={i}
                      ref={scrollRef}
                      className="flex justify-start items-start gap-2"
                    >
                      <div className="w-8 h-8 rounded-md bg-slate-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-xs">AD</span>
                      </div>
                      <div className="bg-white border border-slate-200 rounded-md px-4 py-2 max-w-[70%] shadow-sm">
                        <p className="text-sm text-slate-800">{m.message}</p>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white border-t border-slate-200">
            <form onSubmit={send} className="flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 px-3 py-2.5 border border-slate-300 outline-none bg-white text-slate-700 placeholder:text-slate-400 focus:border-blue-500 transition-colors"
                type="text"
                placeholder="Type your message..."
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors flex items-center gap-2"
              >
                <FiSend size={16} />
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerToAdmin;
