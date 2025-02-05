import { useState, useEffect } from "react";
import { ArrowLeftCircle, Search, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useUserStore from "../store/user.store";

const Aside = () => {
  const navigate = useNavigate();
  const { users, setSelectedUser, getUsers, selectedUser } = useUserStore();
  const [isAsideVisible, setIsAsideVisible] = useState(
    window.innerWidth >= 768
  );

  // Handle window resize to toggle sidebar visibility on larger screens
  useEffect(() => {
    getUsers();

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsAsideVisible(true);
      } else {
        setIsAsideVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getUsers]);

  // Toggle sidebar visibility on mobile
  const toggleSidebar = () => {
    setIsAsideVisible((prev) => !prev);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <>
      {/* Toggle button for mobile view */}
      <div className="fixed top-4 left-4 z-30 md:hidden">
        <Menu
          size={32}
          className="text-cyan-500 cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {isAsideVisible && (
          <motion.div
            key="aside"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-0 bottom-0 w-64 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 flex flex-col shadow-2xl z-40 overflow-auto"
          >
            {/* Header */}
            <div>
              <div className="p-4 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="cursor-pointer"
                      onClick={() => navigate("/")}
                    >
                      <ArrowLeftCircle size={28} className="text-cyan-500" />
                    </motion.div>
                    <h1 className="text-2xl font-bold text-cyan-500">
                      ChatRoom
                    </h1>
                  </div>
                  {/* Close button for mobile view */}
                  <div className="md:hidden">
                    <button onClick={toggleSidebar}>
                      <X
                        size={24}
                        className="text-red-700 bg-white rounded-full"
                      />
                    </button>
                  </div>
                </div>

                {/* Search */}
                <div className="mt-6 flex items-center gap-3 bg-slate-700 rounded-full px-4 py-2 shadow-inner">
                  <Search size={20} className="text-cyan-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full border-none bg-transparent outline-none text-cyan-200 placeholder-cyan-500"
                  />
                </div>

                {/* Online Indicator */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-500 opacity-75 animate-ping"></span>
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                    </div>
                    <span className="text-cyan-200 font-medium">Online</span>
                  </div>
                  <div className="bg-cyan-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {users.length}
                  </div>
                </div>
              </div>

              {/* User List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {users.map((user) => (
                  <motion.div
                    key={user._id}
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors shadow-md ${
                      selectedUser?._id === user._id
                        ? "bg-slate-700 border-l-4 border-cyan-500"
                        : "hover:bg-slate-700"
                    }`}
                    onClick={() => handleUserClick(user)}
                  >
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-500">
                        <img
                          src={user.avatar}
                          alt={user.username}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-cyan-200 font-semibold">
                        {user.username}
                      </p>
                      <p className="text-xs text-cyan-400">
                        Last active 2h ago
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Aside;
