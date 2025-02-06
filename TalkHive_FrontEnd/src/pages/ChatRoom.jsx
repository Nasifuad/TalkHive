// ChatRoom.jsx
import Aside from "../components/Aside";
import ChatHead from "../components/ChatHead";
import MessageInput from "../components/MessageInput";
import ChatContainer from "../components/ChatContainer";

const ChatRoom = () => {
  return (
    <div className="relative b h-screen flex overflow-hidden">
      {" "}
      {/* Retro background gradient */}
      <Aside />
      <div className="flex-1 flex flex-col md:ml-[320px]">
        <ChatHead />
        <ChatContainer />
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatRoom;
// <motion.div
//   key={i}
//   className={`chat ${i % 2 ? "chat-start" : "chat-end"}`}
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
// >
//   <div className="chat-image avatar">
//     <div className="w-10 rounded-full bg-slate-700">
//       <img src={selectedUser?.avatar} />
//     </div>
//   </div>
//   <div className="chat-bubble bg-slate-800 text-slate-100">
//     Message {i + 1} - Lorem ipsum dolor sit amet consectetur
//     adipisicing elit.
//     <div className="text-xs opacity-70 mt-1">10:45 AM</div>
//   </div>
// </motion.div>
