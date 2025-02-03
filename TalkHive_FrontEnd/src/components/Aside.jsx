// Aside.jsx
import { ArrowLeftCircle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Aside = () => {
  const navigate = useNavigate();
  const users = Array(10).fill({
    name: "Jhon Dane",
    image:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
  });

  return (
    <div className="w-[320px] fixed left-0 top-0 bottom-0 bg-slate-800 border-r border-slate-700 flex flex-col">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.1 }}>
            <ArrowLeftCircle
              size={28}
              className="text-slate-400 cursor-pointer"
              onClick={() => navigate("/")}
            />
          </motion.div>
          <h1 className="text-xl font-bold text-cyan-500">ChatRoom</h1>
        </div>

        <div className="mt-4 flex items-center gap-2 bg-slate-700 rounded-lg px-3 py-2">
          <Search size={20} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full bg-transparent outline-none text-slate-200 placeholder-slate-500"
          />
        </div>

        <div className="mt-4 flex items-center justify-between text-slate-400 text-sm">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-green-500 rounded-full"></span>
            <span>Online (9)</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {users.map((user, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700 cursor-pointer transition-colors"
            whileHover={{ x: 5 }}
          >
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={user.image} alt={user.name} />
              </div>
            </div>
            <div>
              <p className="text-slate-200 font-medium">{user.name}</p>
              <p className="text-xs text-slate-400">Last active 2h ago</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Aside;
