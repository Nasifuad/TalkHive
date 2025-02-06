import { useState, useEffect } from "react";
import { ArrowLeftCircle, Search, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useUserStore from "../store/user.store";

const Aside = () => {
  const navigate = useNavigate();
  const { users, setSelectedUser, getUsers, selectedUser, onlineUsers } =
    useUserStore();
  const [isAsideVisible, setIsAsideVisible] = useState(
    window.innerWidth >= 768
  );

  useEffect(() => {
    getUsers();

    const handleResize = () => {
      setIsAsideVisible(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getUsers]);

  const toggleSidebar = () => {
    setIsAsideVisible((prev) => !prev);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <div className="fixed top-4 left-4 z-30 md:hidden">
        <Menu
          size={32}
          className="text-gray-400 hover:text-white cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>

      <AnimatePresence>
        {isAsideVisible && (
          <motion.div
            key="aside"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed z-50 left-0 top-0 bottom-0 w-64 bg-[#161522] border-r border-[#282737] flex flex-col shadow-2xl overflow-auto"
          >
            <div className="p-4 border-b border-[#282737]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="cursor-pointer"
                    onClick={() => navigate("/")}
                  >
                    <ArrowLeftCircle
                      size={28}
                      className="text-gray-400 hover:text-white"
                    />
                  </motion.div>
                  <h1 className="text-2xl font-bold text-gray-300">ChatRoom</h1>
                </div>
                <div className="md:hidden">
                  <button onClick={toggleSidebar}>
                    <X size={24} className="text-gray-400 hover:text-white" />
                  </button>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 bg-[#282737] rounded-full px-4 py-2 shadow-inner">
                <Search size={20} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full border-none bg-transparent outline-none text-gray-300 placeholder-gray-500"
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-gray-300 font-medium">Online</span>
                </div>
                <div className="bg-[#403f53] text-white text-xs font-bold px-2 py-1 rounded-full">
                  {onlineUsers.length}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {users.map((user) => (
                <motion.div
                  key={user._id}
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedUser?._id === user._id
                      ? "bg-[#282737] border-l-4 border-[#6750a4]"
                      : "hover:bg-[#282737]"
                  }`}
                  onClick={() => handleUserClick(user)}
                >
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#6750a4]">
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-300 font-semibold">
                      {user.username}
                    </p>
                    {onlineUsers.includes(user._id) ? (
                      <div className="flex items-center gap-2">
                        <span className="text-green-500 text-xs font-medium">
                          Online
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-500 text-xs font-medium">
                        Offline
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Aside;
