import { motion, AnimatePresence } from "framer-motion";
import useUserStore from "../store/user.store";
import useChatStore from "../store/chat.store";
import { useEffect, useRef, useLayoutEffect } from "react";
import { formatMessageTime } from "../util.js/time";
import { Send } from "lucide-react";

const ChatContainer = () => {
  const { selectedUser, authUser } = useUserStore();
  const { getMessages, messages, subscribeToMessages, unSubscribeToMessages } =
    useChatStore();
  const messageContainerRef = useRef(null); // Ref for the message container

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
      return () => unSubscribeToMessages();
    }
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unSubscribeToMessages,
  ]);

  // Function to scroll the chat container to the bottom
  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  // Scroll to bottom when messages change or user selects a chat
  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages, selectedUser?._id]); // Trigger when messages or selectedUser changes

  return (
    <div
      className="flex-1 overflow-y-auto p-4 pb-20 relative"
      ref={messageContainerRef}
    >
      {selectedUser ? (
        <div className="mt-10 space-y-4">
          <AnimatePresence mode="popLayout">
            {messages
              .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt))
              .map((data, index) => {
                const isUserMessage = data.senderId === selectedUser._id;
                return (
                  <motion.div
                    key={data._id}
                    initial={{ opacity: 0, x: isUserMessage ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 15 }}
                    className={`flex ${
                      isUserMessage ? "justify-start" : "justify-end"
                    } items-start gap-3`}
                  >
                    {isUserMessage && (
                      <div className="relative w-10 h-10">
                        <img
                          alt="User avatar"
                          src={selectedUser?.avatar}
                          className="w-10 h-10 rounded-full object-cover relative z-10 border-2 border-white/20"
                        />
                      </div>
                    )}
                    <div
                      className={`p-4 rounded-2xl max-w-[70%] ${
                        isUserMessage
                          ? "bg-white/10 text-white"
                          : "bg-gradient-to-br from-cyan-500 to-blue-500"
                      }`}
                    >
                      {data?.text && <p className="text-lg">{data.text}</p>}
                      {data?.image && (
                        <img
                          src={data.image}
                          alt="Message"
                          className="rounded-xl"
                        />
                      )}
                      <div className="flex items-center justify-end">
                        <time className="text-xs opacity-70">
                          {formatMessageTime(data?.updatedAt)}
                        </time>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-2xl text-gray-500">
            Select a user to start chatting
          </p>
        </div>
      )}

      {/* Button to scroll manually to the bottom */}
      {messages.length > 0 && (
        <motion.button
          onClick={scrollToBottom}
          className="fixed bottom-8 right-8 rounded-full p-4 bg-blue-500 shadow-xl"
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <Send className="w-6 h-6 text-white" />
        </motion.button>
      )}
    </div>
  );
};

export default ChatContainer;
