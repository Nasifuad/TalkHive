// SignUpPage.jsx
import { motion } from "framer-motion";
import { Terminal, Lock, User, Mail, Image } from "lucide-react";
import { useState } from "react";
import useUserStore from "../store/user.store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const SignUpPage = () => {
  const navigate = useNavigate();
  const { isSigninUp, checkSignup } = useUserStore();
  const [fileSelected, setFileSelected] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { checkAuth } = useUserStore();
  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileSelected(true);
    } else {
      setFileSelected(false);
    }
    setAvatar(event.target.files[0]);
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateInfo()) {
      return;
    }
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);
    console.log(formData);
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFileSelected(false);

    const res = await checkSignup(formData);
    if (res) {
      checkAuth();
      navigate("/");
    }
  };
  const validateInfo = () => {
    if (username.length < 4) {
      toast.error("Username must be at least 5 characters long");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (!fileSelected) {
      toast.error("Please select an avatar");
      return false;
    }
    return true;
  };
  return (
    <div
      className="relative min-h-screen container 
    mx-auto bg-black text-green-400 font-mono p-8"
    >
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
        className="max-w-md mx-auto mt-10 border-2 border-cyan-400 p-8 bg-black bg-opacity-80 relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-8 border-b border-magenta-400 pb-4">
          <Terminal size={32} className="text-yellow-400" />
          <h1 className="text-3xl font-bold">ACCOUNT INITIALIZATION</h1>
        </div>

        <form className="space-y-6" onSubmit={(e) => handleSignup(e)}>
          {/* Username Input */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label className=" mb-2 flex items-center gap-2">
              <User size={20} className="text-cyan-400" />
              <span>USERNAME</span>
            </label>
            <input
              type="text"
              className="w-full bg-black border-2 border-green-400 p-3 focus:border-yellow-400 outline-none transition-all"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </motion.div>

          {/* Email Input */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className=" mb-2 flex items-center gap-2">
              <Mail size={20} className="text-magenta-400" />
              <span>EMAIL</span>
            </label>
            <input
              type="email"
              className="w-full bg-black border-2 border-green-400 p-3 focus:border-cyan-400 outline-none transition-all"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>

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
              className="w-full bg-black border-2 border-green-400 p-3 focus:border-yellow-400 outline-none transition-all"
              placeholder="Enter your password +++"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </motion.div>

          {/* Confirm Password Input */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label className=" mb-2 flex items-center gap-2">
              <Lock size={20} className="text-cyan-400" />
              <span>CONFIRM PASSWORD</span>
            </label>
            <input
              type="password"
              className="w-full bg-black border-2 border-green-400 p-3 focus:border-magenta-400 outline-none transition-all"
              placeholder="Confirm your password +++"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label className=" mb-2 flex items-center gap-2 text-cyan-400">
              <Image size={20} />
              <span>UPLOAD AVATAR</span>
            </label>
            <motion.input
              type="file"
              accept="image/*"
              className="w-full text-green-400 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-green-400 file:text-black hover:file:bg-magenta-400"
              onChange={handleFileChange}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
            {fileSelected && (
              <motion.p
                className="mt-2 text-sm text-green-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                File selected successfully!
              </motion.p>
            )}
          </motion.div>
          {/* Submit Button */}
          <motion.button
            className={`w-full py-3 border-2 border-cyan-400 hover:border-yellow-400 text-cyan-400 hover:text-yellow-400 relative ${
              isSigninUp ? "pointer-events-none" : ""
            }  overflow-hidden group`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">
              {isSigninUp ? (
                <span className="loading loading-dots loading-sm"></span>
              ) : (
                "SIGN UP"
              )}
            </span>
            <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-10 transition-opacity" />
          </motion.button>

          {/* Login Link */}
          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-cyan-300">Existing user? </span>
            <a
              href="/login"
              className="text-yellow-400 hover:text-magenta-400 underline"
            >
              ACCESS TERMINAL
            </a>
          </motion.div>
        </form>

        {/* Floating Nodes */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
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

export default SignUpPage;
