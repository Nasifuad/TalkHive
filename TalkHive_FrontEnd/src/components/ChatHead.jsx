// ChatHead.jsx
import { motion } from "framer-motion";
import useUserStore from "../store/user.store";

const ChatHead = () => {
  const { authUser, selectedUser } = useUserStore();

  return (
    <motion.div
      className="md:left-[300px] xl:left-[320px] bg-transparent p-4 border-b border-slate-700 flex items-center gap-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="flex xl:justify-between justify-between pl-20 md:pl-0 flex-1 items-center">
        {selectedUser && (
          <div className="flex flex-col justify-center items-center">
            <img
              src={selectedUser.avatar}
              alt={`${selectedUser.username}'s avatar`}
              className="w-15 h-15 rounded-full"
            />
            <h2 className="text-slate-200 capitalize font-bold">
              {selectedUser.username || "ChatRoom"}
            </h2>
          </div>
        )}
        <h1 className="md:hidden text-4xl text-cyan-500 font-mono font-bold">
          Retro-Chat
        </h1>
        <div className="flex items-center gap-2 flex-col">
          <img
            src={
              authUser?.avatar ||
              "https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
            }
            alt="profile pic"
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-slate-200 capitalize underline underline-offset-4">
            {authUser?.username}
          </h1>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatHead;
