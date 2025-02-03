// ChatRoom.jsx
import { motion } from "framer-motion";
import Aside from "../components/Aside";
import ChatHead from "../components/ChatHead";
import MessageInput from "../components/MessageInput";

const ChatRoom = () => {
  return (
    <div className="relative h-screen bg-slate-900 flex">
      {/* Fixed Aside */}
      <Aside />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col ml-[320px]">
        {" "}
        {/* Adjust width to match your aside */}
        {/* Fixed Chat Header */}
        <ChatHead />
        {/* Scrollable Chat Body */}
        <motion.div
          className="flex-1 overflow-y-auto p-4 pb-20 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Chat messages will go here */}
          <div className="space-y-4">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className={`chat ${i % 2 === 0 ? "chat-start" : "chat-end"}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full bg-slate-700">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div className="chat-bubble bg-slate-800 text-slate-100">
                  Message {i + 1} - Lorem ipsum dolor sit amet consectetur
                  adipisicing elit.
                  <div className="text-xs opacity-70 mt-1">10:45 AM</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Fixed Message Input */}
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatRoom;
