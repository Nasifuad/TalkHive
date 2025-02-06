import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
// const url_local = "https://talk-hive-backend.vercel.app/";
const url_local = "https://talk-hive-backend.vercel.app/";

const useUserStore = create((set, get) => {
  return {
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    users: [],
    socket: null,
    onlineUsers: [],
    selectedUser: null,
    setSelectedUser: (selectedUser) => set({ selectedUser }),
    checkAuth: async () => {
      try {
        const res = await axios.get(`${url_local}api/v1/user/check-user`, {
          withCredentials: true,
        });
        console.log("Checking Auth", res.data.userInfo);
        set({ authUser: res.data.userInfo });
        get().connectSocket();
      } catch (error) {
        console.error(
          "Error checking auth:",
          error.response?.data || error.message
        );
        set({ authUser: null });
      } finally {
        set({ isCheckingAuth: false });
      }
    },
    checkLogin: async (username, password) => {
      try {
        set({ isLoggingIn: true });
        console.log("Login information", username, password);
        const res = await axios.post(
          `${url_local}api/v1/user/login`,
          {
            username,
            password,
          },
          {
            withCredentials: true,
          }
        );
        toast.success("Login successful");
        get().connectSocket();
        set({ authUser: res.data });
        return true;
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        return false;
      } finally {
        setTimeout(() => {
          set({ isLoggingIn: false });
        }, 3000);
      }
    },
    checkSignup: async (formData) => {
      try {
        set({ isSigninUp: true });
        const res = await axios.post(
          `${url_local}api/v1/user/signup`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        toast.success("Signup successful");
        set({ authUser: res.data });
        return true;
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        return false;
      } finally {
        set({ isSigninUp: false });
      }
    },
    logout: async () => {
      try {
        console.log("logging out");
        const res = await axios.get(`${url_local}api/v1/user/logout`, {
          withCredentials: true,
        });
        get;
        console.log(res);
        toast.success("Logout successful");
        get().disconnectSocket();
        set({ authUser: null });
      } catch (error) {
        console.log(error);
        toast.error(error.response.statusText);
      }
    },
    getUsers: async () => {
      try {
        set({ isUserLoading: true });
        const res = await axios.get(`${url_local}api/v1/chat/get-users`, {
          withCredentials: true,
        });
        set({ users: res.data });
      } catch (error) {
        console.log(error);
      } finally {
        set({ isUserLoading: false });
      }
    },
    // connectSocket: async () => {
    //   const { authUser } = get();
    //   if (!authUser || get().socket?.connected) return;

    //   console.log("Connecting socket...");

    //   const socket = io("http://localhost:5050", {
    //     // Use the full URL
    //     query: {
    //       userId: authUser.userId, // Make sure authUser.userId is correct!
    //     },
    //   });

    //   socket.on("connect", () => {
    //     // Listen for the 'connect' event
    //     console.log("Socket connected!");
    //     socket.emit("userConnected"); // Emit "userConnected" *after* connection
    //   });

    //   socket.on("connect_error", (err) => {
    //     console.error("Socket connection error:", err);
    //     toast.error("Failed to connect to chat server.");
    //   });

    //   socket.on("disconnect", () => {
    //     console.log("Socket disconnected.");
    //     set({ onlineUsers: [] });
    //     socket.emit("userDisconnected");
    //   });

    //   socket.on("getOnlineUsers", (userIds) => {
    //     console.log("Online users:", userIds);
    //     set({ onlineUsers: userIds });
    //   });

    //   socket.on("reconnect", () => {
    //     console.log("Reconnected to server");
    //   });

    //   set({ socket }); // Set the socket *after* attaching listeners
    // },
    // disconnectSocket: () => {
    //   const socket = get().socket;
    //   if (socket) {
    //     socket.disconnect();
    //     set({ socket: null, onlineUsers: [] }); // Clear state on disconnect
    //   }
    // },
    connectSocket: () => {
      const { authUser } = get();
      if (!authUser || get().socket?.connected) return;

      const socket = io("https://talk-hive-backend.vercel.app", {
        query: {
          userId: authUser.userId,
        },
      });
      socket.connect();

      set({ socket: socket });

      socket.on("getOnlineUsers", (userIds) => {
        set({ onlineUsers: userIds });
      });
    },
    disconnectSocket: () => {
      if (get().socket?.connected) get().socket.disconnect();
    },
  };
});

export default useUserStore;
