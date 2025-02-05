import { motion } from "framer-motion";
import { Image, Send, X } from "lucide-react";
import { useRef, useState } from "react";
import useChatStore from "../store/chat.store";
import useUserStore from "../store/user.store";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);
  const { selectedUser } = useUserStore();
  const { sendMessages } = useChatStore();

  // Handle file selection and preview the image using URL.createObjectURL
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setAvatar(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Message:", message);
    console.log("Selected file preview URL:", previewUrl);
    console.log("Selected User in chat container", selectedUser);
    const formData = new FormData();
    formData.append("receiverId", selectedUser._id);
    formData.append("text", message);
    setMessage("");
    setPreviewUrl("");
    if (avatar) formData.append("image", avatar);
    sendMessages(formData);
  };

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 xl:left-[320px] bg-slate-800 p-4 border-t border-slate-700"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
    >
      <div className="flex items-center gap-2 relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-slate-700 rounded-lg px-4 py-3 text-slate-200 outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="file"
          hidden
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-cyan-600 rounded-lg text-white"
          onClick={() => fileInputRef.current.click()}
        >
          <Image size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-cyan-600 rounded-lg text-white"
          onClick={handleSubmit}
        >
          <Send size={20} />
        </motion.button>
      </div>

      {/* Preview Selected Image */}
      {previewUrl && (
        <div className=" absolute -top-40 xl:right-30 ">
          <img
            src={previewUrl}
            alt="Preview"
            className="  max-h-40 object-contain rounded-lg border border-slate-600"
          />
          <X
            size={20}
            className="absolute top-1 right-2 text-slate-200 bg-slate-500 rounded-full cursor-pointer"
            onClick={() => setPreviewUrl(null)}
          />
        </div>
      )}
    </motion.div>
  );
};

export default MessageInput;
