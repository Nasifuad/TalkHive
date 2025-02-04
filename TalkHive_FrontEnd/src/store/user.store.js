import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const useUserStore = create((set) => {
  return {
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    setUser: (user) => set({ user }),
    checkAuth: async () => {
      try {
        const res = await axios.get(
          "https://talk-hive-backend.vercel.app//api/v1/user/check-user"
        );
        console.log("🚀 :", res);
        set({ authUser: res.data.userInfo });
      } catch (error) {
        console.log("errrrr", error.message);
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
          "https://talk-hive-backend.vercel.app//api/v1/user/login",
          {
            username,
            password,
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
          "https://talk-hive-backend.vercel.app/api/v1/user/signup",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
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
        const res = await axios.get(
          "https://talk-hive-backend.vercel.app//api/v1/user/logout"
        );
        console.log(res);
        toast.success("Logout successful");
        set({ authUser: null });
      } catch (error) {
        console.log(error);
        toast.error(error.response.statusText);
      }
    },
  };
});

export default useUserStore;
