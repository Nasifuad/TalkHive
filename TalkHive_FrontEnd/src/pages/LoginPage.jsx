/* eslint-disable no-unused-vars */
// LoginPage.jsx
import { motion } from "framer-motion";
import { Terminal, Lock, User } from "lucide-react";
import { useState } from "react";
import useUserStore from "../store/user.store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isLoggingIn, checkLogin, checkAuth } = useUserStore();
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("This this working", username, password);
    if (username.length == 0 && password.length == 0) {
      toast.error("Please fill all the fields");
      return;
    }
    if (username.length < 4) {
      toast.error("Username must be at least 5 characters long");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    const res = await checkLogin(username, password);
    if (res) {
      checkAuth();
      navigate("/");
    }
  };
  return (
    <div className="relative min-h-screen container mx-auto bg-black text-green-400 font-mono p-8">
      {/* CRT Scanlines */}
      <div className="absolute inset-0 crt-effect z-40 pointer-events-none" />

      {/* Animated Grid Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <svg className="w-full h-full">
          <pattern
            id="smallGrid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(0,255,0,0.1)"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
      </div>

      <motion.div
        className="max-w-md mx-auto mt-20 border-2 border-magenta-400 p-8 bg-black bg-opacity-80 relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-8 border-b border-green-400 pb-4">
          <Terminal size={32} className="text-yellow-400" />
          <h1 className="text-3xl font-bold">USER LOGIN</h1>
        </div>

        <form className="space-y-6" onSubmit={(e) => handleLogin(e)}>
          {/* Email Input */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block mb-2 flex items-center gap-2">
              <User size={20} className="text-cyan-400" />
              <span>USERNAME</span>
            </label>
            <input
              type="text"
              className="w-full bg-black border-2 border-green-400 p-3 focus:border-yellow-400 outline-none transition-all"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </motion.div>

          {/* Password Input */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className=" mb-2 flex items-center gap-2">
              <Lock size={20} className="text-magenta-400" />
              <span>PASSWORD</span>
            </label>
            <input
              type="password"
              className="w-full bg-black border-2 border-green-400 p-3 focus:border-cyan-400 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            className={`w-full py-3 border-2 border-green-400 hover:border-yellow-400 text-green-400 hover:text-yellow-400 relative ${
              isLoggingIn ? "cursor-not-allowed pointer-events-none" : ""
            } overflow-hidden group`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">
              {isLoggingIn ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "LOGIN"
              )}
            </span>
            <div className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-10 transition-opacity" />
          </motion.button>

          {/* Signup Link */}
          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-cyan-300">New user? </span>
            <a
              href="/signup"
              className="text-yellow-400 hover:text-magenta-400 underline"
            >
              INITIALIZE ACCOUNT
            </a>
          </motion.div>
        </form>

        {/* Floating Nodes */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
