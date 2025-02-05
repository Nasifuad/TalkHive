// ChatHead.jsx
import { motion } from "framer-motion";
import useUserStore from "../store/user.store";

const ChatHead = () => {
  const { authUser, selectedUser } = useUserStore();
  return (
    <motion.div
      className="fixed top-0 right-0 left-0 md:left-[300px] xl:left-[320px] bg-slate-800 p-4 border-b border-slate-700 flex items-center gap-4 z-10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="avatar">
        <div className="w-12 rounded-full">
          <img
            src={
              selectedUser?.avatar ||
              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            }
          />
        </div>
      </div>
      <div className="flex justify-between flex-1 items-center">
        <div>
          <h2 className="text-slate-200 font-bold">
            {selectedUser?.username || "ChatRoom"}
          </h2>
          <p className="text-sm text-slate-400">Online</p>
        </div>
        <div className="flex items-center gap-2 flex-col">
          <img
            src={
              authUser?.avatar ||
              "https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
            }
            alt="profile pic"
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-slate-200 capitalize underline underline-offset-4 ">
            {authUser?.username}
          </h1>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatHead;
