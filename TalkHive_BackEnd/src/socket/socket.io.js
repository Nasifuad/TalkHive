import { Server } from "socket.io";
import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "../routes/auth.route.js";
import { Chatrouter } from "../routes/chat.route.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
export const app = express();

app.use(
  cors({
    origin: "https://talk-hive-live.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "https://talk-hive-live.vercel.app",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};

export function getReceiverId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User connected:", userId, socket.id);

  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log("Updated userSocketMap:", userSocketMap);
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }

  socket.on("disconnect", () => {
    console.log("User disconnected:", userId, socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

app.use("/api/v1/user", router);
app.use("/api/v1/chat", Chatrouter);
app.use("/", (req, res) => {
  res.send("Server is running");
});

// Server (sendMessages in chat.controller.js or wherever it is defined)
// const sendMessages = AsyncHandler(async (req, res) => {
//   // ... (Existing code for message creation)

//   const receiverSocketId = getReceiverId(receiverId);
//   console.log("Receiver Socket ID:", receiverSocketId, receiverId); // Debug log

//   if (receiverSocketId) {
//     io.to(receiverSocketId).emit("newMessage", message); // Emit to the specific socket
//     res.status(200).json(message);
//   } else {
//     console.log("Receiver is offline or not connected."); // Handle offline case
//     res.status(200).json(message); // You can still save the message
//     // Or you could send a different status code if you want to indicate that the message was not delivered in real-time.
//   }
// });
