// MessageInput.jsx (completed)
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Image, Send, X } from "lucide-react";
import useChatStore from "../store/chat.store";
import useUserStore from "../store/user.store";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const { selectedUser } = useUserStore();
  const { sendMessages } = useChatStore();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser) return;

    const formData = new FormData();
    formData.append("receiverId", selectedUser._id);
    formData.append("text", message);
    if (file) {
      formData.append("image", file);
    }
    setMessage("");
    setPreviewUrl(null);
    setFile(null);
    try {
      await sendMessages(formData);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle error (e.g., display a toast message)
    }
  };

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 xl:left-[320px] bg-[#161522] p-4 border-t border-[#282737]"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
    >
      <div className="flex items-center gap-2 relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="ml-auto w-full xl:w-full md:w-1/2 bg-[#282737] rounded-lg px-4 py-3 text-gray-300 outline-none focus:ring-2 focus:ring-[#6750a4] border border-[#282737]"
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
          className="p-3 bg-[#6750a4] rounded-lg text-white"
          onClick={() => fileInputRef.current.click()}
        >
          <Image size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-[#6750a4] rounded-lg text-white"
          onClick={handleSubmit}
        >
          <Send size={20} />
        </motion.button>
      </div>

      {previewUrl && (
        <div className="absolute -top-40 right-40 z-50">
          <img
            src={previewUrl}
            alt="Preview"
            className="max-h-40 rounded-lg border border-[#282737]"
          />
          <X
            size={20}
            className="absolute top-1 right-2 text-gray-300 bg-[#282737] rounded-full cursor-pointer hover:bg-gray-400"
            onClick={() => {
              setPreviewUrl(null);
              setFile(null); // Clear the file state when closing preview
              if (fileInputRef.current) {
                fileInputRef.current.value = ""; // Clear the input
              }
            }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default MessageInput;
