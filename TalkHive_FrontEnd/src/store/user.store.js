import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const url_loacl = "http://localhost:5050";

const useUserStore = create((set) => {
  return {
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    users: [],
    selectedUser: null,
    setSelectedUser: (selectedUser) => set({ selectedUser }),
    checkAuth: async () => {
      try {
        const res = await axios.get(
          "http://localhost:5050/api/v1/user/check-user",
          {
            withCredentials: true,
          }
        );
        console.log("Checking Auth", res.data.userInfo);
        set({ authUser: res.data.userInfo });
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
        //set a promise for 1 sec delay

        const res = await axios.post(
          "http://localhost:5050/api/v1/user/login",
          {
            username,
            password,
          },
          {
            withCredentials: true,
          }
        );
        toast.success("Login successful");
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
          "http://localhost:5050/api/v1/user/signup",
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
        const res = await axios.get(`${url_loacl}/api/v1/user/logout`, {
          withCredentials: true,
        });
        console.log(res);
        toast.success("Logout successful");
        set({ authUser: null });
      } catch (error) {
        console.log(error);
        toast.error(error.response.statusText);
      }
    },
    getUsers: async () => {
      try {
        set({ isUserLoading: true });
        const res = await axios.get(
          "http://localhost:5050/api/v1/chat/get-users",
          {
            withCredentials: true,
          }
        );
        console.log("Users available", res.data);
        // console.log(res.data);
        set({ users: res.data });
      } catch (error) {
        console.log(error);
        // toast.error("error getting users");
      } finally {
        set({ isUserLoading: false });
      }
    },
  };
});

export default useUserStore;
