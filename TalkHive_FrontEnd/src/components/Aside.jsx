import { ArrowLeftCircle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useUserStore from "../store/user.store";
import { useEffect } from "react";

const Aside = () => {
  const navigate = useNavigate();
  const { users, setSelectedUser, getUsers, selectedUser } = useUserStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleClick = async (e, user) => {
    e.preventDefault();
    setSelectedUser(user);
    console.log("Selected user in aside", selectedUser._id);
  };

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="xl:w-[320px] md:w-[250px] hidden fixed left-0 top-0 bottom-0 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 md:flex flex-col shadow-2xl"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 15 }}
            className="cursor-pointer"
            onClick={() => navigate("/")}
          >
            <ArrowLeftCircle size={28} className="text-cyan-500" />
          </motion.div>
          <h1 className="text-2xl font-bold text-cyan-500">ChatRoom</h1>
        </div>

        {/* Search */}
        <div className="mt-6 flex items-center gap-3 bg-slate-700 rounded-full px-4 py-2 shadow-inner transition-all duration-300 focus-within:shadow-lg">
          <Search size={20} className="text-cyan-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full border-none bg-transparent outline-none text-cyan-200 placeholder-cyan-500"
          />
        </div>

        {/* Improved Online Indicator */}
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
        {users.map((user, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors shadow-md 
              ${
                selectedUser?._id === user._id
                  ? "bg-slate-700 border-l-4 border-cyan-500"
                  : "hover:bg-slate-700"
              }`}
            onClick={(e) => handleClick(e, user)}
          >
            <div className="avatar">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-500">
                <img
                  src={user?.avatar}
                  alt={user?.username}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div>
              <p className="text-cyan-200 font-semibold">{user?.username}</p>
              <p className="text-xs text-cyan-400">Last active 2h ago</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Aside;
