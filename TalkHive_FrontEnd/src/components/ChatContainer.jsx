import { motion } from "framer-motion";
import useUserStore from "../store/user.store";
import useChatStore from "../store/chat.store";
import { useEffect, useState } from "react";
import { formatMessageTime } from "../util.js/time";
const ChatContainer = () => {
  const { selectedUser, authUser } = useUserStore();
  const { getMessages, messages } = useChatStore();
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    // Only fetch messages when a user is selected
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser?._id, getMessages]);
  console.log("The Messages", messages);

  return (
    <motion.div
      className="flex-1 overflow-y-auto p-4 pb-20 mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="space-y-4 mt-10">
        {messages
          .sort((b, a) => new Date(b.updatedAt) - new Date(a.updatedAt)) // Sort in descending order
          .map((data, i) => (
            <div key={i}>
              {data.senderId === selectedUser._id ? (
                //if the sender is the one I am chatting with
                <div className="chat chat-start">
                  <div className="flex justify-center items-center avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="User avatar"
                        src={
                          selectedUser?.avatar ||
                          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        }
                      />
                    </div>
                  </div>
                  <div className="chat-header text-lg text-blue-500 capitalize">
                    <p>{selectedUser?.username || "Obi-Wan Kenobi"}</p>
                  </div>
                  <div className="chat-bubble bg-slate-600">
                    <div className="flex flex-col gap-2">
                      {data?.text || "server"}
                      {data?.image && (
                        <img src={data.image} alt="Message" className="w-3/4" />
                      )}
                      <time className="text-xs opacity-50">
                        {formatMessageTime(data?.updatedAt)}
                      </time>
                    </div>
                  </div>
                  <div className="chat-footer opacity-50">Delivered</div>
                </div>
              ) : (
                // if the sender is Me
                <div className="chat chat-end">
                  <div className="flex justify-center items-center avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="User avatar"
                        src={
                          authUser?.avatar ||
                          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        }
                      />
                    </div>
                  </div>
                  <div className="chat-header text-lg text-blue-500 capitalize">
                    <p>{authUser?.username || "Obi-Wan Kenobi"}</p>
                  </div>
                  <div className="chat-bubble bg-slate-600">
                    <div className="flex flex-col gap-2">
                      {data?.text || "server"}
                      {data?.image && (
                        <img
                          src={data.image}
                          alt="Message"
                          onClick={() => setToggle(!toggle)}
                          className="xl:w-[400px]"
                        />
                      )}

                      <time className="text-xs opacity-50">
                        {formatMessageTime(data?.updatedAt)}
                      </time>
                    </div>
                  </div>
                  <div className="chat-footer opacity-50">Delivered</div>
                </div>
              )}
            </div>
          ))}
      </div>
    </motion.div>
  );
};

export default ChatContainer;
// import { motion } from "framer-motion";
// import useUserStore from "../store/user.store";
// import useChatStore from "../store/chat.store";
// import { useEffect, useState } from "react";
// const ChatContainer = () => {
//   // eslint-disable-next-line no-unused-vars
//   const { authUser, selectedUser } = useUserStore();
//   const { getMessages, messages } = useChatStore();
//   const [datas, setDatas] = useState([]);
//   const getData = async () => {
//     const data = await getMessages(selectedUser?._id);
//     console.log("Messages in get Data", data);
//     setDatas(data);
//     console.log("The f", data);
//   };

//   useEffect(() => {
//     console.log("chat container", selectedUser);
//     getMessages(selectedUser?._id);
//     getData();
//   }, [selectedUser?._id, getMessages]);
//   return (
//     <motion.div
//       className="flex-1 overflow-y-auto p-4 pb-20 mt-16"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//     >
//       {/* Chat messages will go here */}
//       <div className="space-y-4 mt-10">
//         {datas &&
//           datas?.map((data, i) => (
//             <div key={i}>
//               <div className="chat chat-start">
//                 <div className="flex justify-center items-center flex-start avatar">
//                   <div className="w-10 rounded-full">
//                     <img
//                       alt="Tailwind CSS chat bubble component"
//                       src={
//                         data?.image ||
//                         "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//                       }
//                     />
//                   </div>
//                 </div>
//                 <div className="chat-header text-lg text-blue-500 capitalize justify-center items-center">
//                   <p> {selectedUser?.username || "Obi-Wan Kenobi"}</p>
//                 </div>
//                 <div className="chat-bubble bg-slate-600">
//                   <div className="flex flex-col gap-2">
//                     {data?.text || "server"}
//                     <img src={data?.image} alt="" width={150} />
//                     <time className="text-xs opacity-50">12:45</time>
//                   </div>
//                 </div>

//                 <div className="chat-footer opacity-50">Delivered</div>
//               </div>
//               {/* <p>{data?.text || "server"}</p>
//                */}
//             </div>
//           ))}
//       </div>
//     </motion.div>
//   );
// };

// export default ChatContainer;
// ChatContainer.jsx
