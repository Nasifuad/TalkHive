import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useUserStore from "../store/user.store";
import { Camera, Save, X, User, Mail, Verified } from "lucide-react";

const Profile = () => {
  const { authUser } = useUserStore();
  const [previewImage, setPreviewImage] = useState(authUser?.avatar);
  const [email, setEmail] = useState(authUser?.email);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) clearInterval(interval);
          return Math.min(prev + 10, 100);
        });
      }, 100);

      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
      setIsEditing(true);

      setTimeout(() => setUploadProgress(0), 2000);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add your save logic here
  };

  const handleCancel = () => {
    setPreviewImage(authUser?.avatar);
    setEmail(authUser?.email);
    setIsEditing(false);
  };

  useEffect(() => {
    return () => {
      if (previewImage && previewImage !== authUser?.avatar) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage, authUser?.avatar]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-4 flex items-center justify-center container mx-auto">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0.1,
            }}
            animate={{
              x: ["0%", "100%", "0%"],
              y: ["0%", "100%", "0%"],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        className="w-full max-w-2xl backdrop-blur-lg bg-black/30 rounded-3xl p-8 shadow-2xl border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Header */}
        <div className="flex flex-col items-center relative mb-8">
          <motion.div className="relative group" whileHover={{ scale: 1.05 }}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <img
                src={previewImage}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full border-4 border-white/20 shadow-xl"
              />
              <motion.label
                className="absolute bottom-0 right-0 bg-black/80 p-2 rounded-full cursor-pointer border border-white/20 hover:bg-black transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <Camera size={20} className="text-white" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </motion.label>

              {/* Upload Progress */}
              <AnimatePresence>
                {uploadProgress > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full"
                  >
                    <div className="relative w-16 h-16">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="50%"
                          cy="50%"
                          r="30"
                          className="fill-none stroke-white/30 stroke-2"
                        />
                        <circle
                          cx="50%"
                          cy="50%"
                          r="30"
                          className="fill-none stroke-blue-500 stroke-2"
                          strokeDasharray={188.4}
                          strokeDashoffset={188.4 * (1 - uploadProgress / 100)}
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                        {uploadProgress}%
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="flex justify-center items-center mt-7 gap-2">
            <motion.h1
              className="text-4xl font-bold  bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent capitalize"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {authUser?.username || "Anonymous"}
            </motion.h1>
            <Verified className="text-blue-500" />
          </div>
          <p className="mt-2 text-sm text-gray-400">Joined 2025</p>
        </div>

        {/* Profile Details */}
        <div className="space-y-6">
          <motion.div
            className="group relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-4 bg-white/5 rounded-xl border border-white/10">
              <label className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                <Mail size={18} className="text-blue-400" />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-6 py-3  rounded-full bg-transparent text-lg focus:outline-none placeholder-gray-600"
                placeholder="name@example.com"
              />
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { label: "Posts", value: "1.2K", color: "bg-blue-500" },
              { label: "Following", value: "589", color: "bg-purple-500" },
              { label: "Followers", value: "2.4K", color: "bg-pink-500" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div
                  className={`w-10 h-10 ${stat.color} rounded-full flex items-center justify-center mb-2`}
                >
                  <User size={20} className="text-white" />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <AnimatePresence>
            {isEditing && (
              <motion.div
                className="flex gap-4 justify-end"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <motion.button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={18} />
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Save size={18} />
                  Save Changes
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
