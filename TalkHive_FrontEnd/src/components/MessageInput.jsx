// MessageInput.jsx
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  return (
    <motion.div
      className="fixed bottom-0 right-0 left-[320px] bg-slate-800 p-4 border-t border-slate-700"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
    >
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-slate-700 rounded-lg px-4 py-3 text-slate-200 outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-cyan-600 rounded-lg text-white"
        >
          <Send size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MessageInput;
