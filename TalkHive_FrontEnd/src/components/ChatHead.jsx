// ChatHead.jsx
import { motion } from "framer-motion";

const ChatHead = () => {
  return (
    <motion.div
      className="fixed top-0 right-0 left-[320px] bg-slate-800 p-4 border-b border-slate-700 flex items-center gap-4 z-10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="avatar">
        <div className="w-12 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div>
        <h2 className="text-slate-200 font-bold">Group Chat</h2>
        <p className="text-sm text-slate-400">Online (9 participants)</p>
      </div>
    </motion.div>
  );
};

export default ChatHead;
