// import { create } from "zustand";
// // import { useUserStore } from "./user.store";
// import axios from "axios";
// import toast from "react-hot-toast";

// const useChatStore = create((get, set) => {
//   return {
//     messages: [],
//     selectedUser: null,
//     isUserLoading: false,
//     isMessageLoading: false,
//     setMessages: (message) => set(message),
//     getUsers: async () => {
//       try {
//         set({ isUserLoading: true });
//         const res = await axios.get(
//           "http://localhost:5050/api/v1/chat/get-users",
//           {
//             withCredentials: true,
//           }
//         );
//         set({ messages: res.data });
//       } catch (error) {
//         console.log(error);
//         toast.error(error.response.data);
//       } finally {
//         set({ isUserLoading: false });
//       }
//     },
//     // getMessages: async (senderId) => {
//     //   try {
//     //     console.log("Sender ID", senderId);
//     //     set({ isMessageLoading: true });
//     //     const res = await axios.get(
//     //       `http://localhost:5050/api/v1/chat/get-messages/${senderId}`,
//     //       { withCredentials: true }
//     //     );
//     //     console.log("The user has sent u", res.data);
//     //     set({ messages: res.data });
//     //   } catch (error) {
//     //     toast.error(error.res);
//     //   } finally {
//     //     set({ isMessageLoading: false });
//     //   }
//     // },
//     getMessages: async (senderId) => {
//       try {
//         set({ isMessageLoading: true });
//         const res = await axios.get(
//           `http://localhost:5050/api/v1/chat/get-messages/${senderId}`,
//           { withCredentials: true }
//         );
//         // Ensure res.data is an array before setting
//         set({ messages: Array.isArray(res.data) ? res.data : [res.data] });
//         return res.data;
//       } catch (error) {
//         toast.error(error.response?.data || "Error fetching messages");
//       } finally {
//         set({ isMessageLoading: false });
//       }
//     },
//   };
// });

// export default useChatStore;
// In useChatStore.js
import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const useChatStore = create((set) => ({
  messages: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getMessages: async (senderId) => {
    if (!senderId) return;
    try {
      set({ isMessageLoading: true });
      const res = await axios.get(
        `https://talk-hive-backend.vercel.app/api/v1/chat/get-messages/${senderId}`,
        { withCredentials: true }
      );
      // Assuming res.data is either an array or an object
      // If it’s an object, wrap it in an array:
      const newMessages = Array.isArray(res.data) ? res.data : [res.data];
      set({ messages: newMessages });
      // Optionally, return the messages if you want to chain or log:
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
        "https://talk-hive-backend.vercel.app/api/v1/chat/send-messages",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("res", res);
    } catch (error) {
      toast.error(error.response?.data || "Error sending message");
    }
  },
}));

export default useChatStore;
