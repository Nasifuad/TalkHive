import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import useUserStore from "./user.store";

const url_loacl = "https://talkhive-ymcy.onrender.com/";
const useChatStore = create((set, get) => ({
  messages: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getMessages: async (senderId) => {
    if (!senderId) return;
    try {
      set({ isMessageLoading: true });
      const res = await axios.get(
        `${url_loacl}api/v1/chat/get-messages/${senderId}`,
        { withCredentials: true }
      );

      const newMessages = Array.isArray(res.data) ? res.data : [res.data];
      set({ messages: newMessages });

      return newMessages;
    } catch (error) {
      toast.error(error.response?.data || "Error fetching messages");
      return [];
    } finally {
      set({ isMessageLoading: false });
    }
  },
  sendMessages: async (formData) => {
    try {
      const res = await axios.post(
        `${url_loacl}api/v1/chat/send-messages`,
        formData,
        { withCredentials: true }
      );
      const newMessage = res.data; // Get the newly created message from the server response
      set((state) => ({ messages: [...state.messages, newMessage] })); // Update the sender's message list immediately
      console.log("res", res);
    } catch (error) {
      toast.error(error.response?.data || "Error sending message");
    }
  },
  subscribeToMessages: () => {
    const selectedUser = useUserStore.getState().selectedUser;
    const socket = useUserStore.getState().socket;

    if (!selectedUser || !socket) {
      console.log("No selected user or socket available for subscription");
      return;
    }

    console.log("Subscribing to messages for:", selectedUser._id);

    socket.on("newMessages", (newMessage) => {
      console.log("In the socket new message", newMessage);

      const authUser = useUserStore.getState().authUser; // your own user info
      const selectedUser = useUserStore.getState().selectedUser;

      // Check if the message is part of the conversation between you and the selected user:
      const isRelevantConversation =
        (newMessage.senderId === selectedUser._id &&
          newMessage.receiverId === authUser.userId) ||
        (newMessage.senderId === authUser.userId &&
          newMessage.receiverId === selectedUser._id);

      if (isRelevantConversation) {
        set({
          messages: [...get().messages, newMessage],
        });
      }
    });
  },
  unSubscribeToMessages: () => {
    const socket = useUserStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
    }
  },
}));

export default useChatStore;
