import { Message } from "../model/chat.model.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { getReceiverId, io } from "../socket/socket.io.js";
import { uploadToCloudinary } from "../utils/cloudinary.utils.js";

const getMessages = AsyncHandler(async (req, res) => {
  const userId = req.user;
  const { id: senderId } = req.params;
  const message = await Message.find({
    $or: [
      { senderId: userId, receiverId: senderId },
      { senderId: senderId, receiverId: userId },
    ],
  }).sort({ createdAt: -1 });
  res.send(message);
});

const sendMessages = AsyncHandler(async (req, res) => {
  const { receiverId, text } = req.body;
  const senderId = req.user;
  console.log("receiverId", receiverId);
  const imageBuffer = req.file?.buffer;

  let image = null;
  if (imageBuffer) {
    image = await uploadToCloudinary(imageBuffer);
  }

  const message = await Message.create({
    senderId,
    receiverId,
    text: text ? text : "",
    image: image ? image.url : "",
  });
  const receiverSocketId = getReceiverId(receiverId);
  console.log("Receiver id", receiverSocketId);
  if (receiverSocketId) {
    console.log("Receiver id", receiverSocketId);
    io.to(receiverSocketId).emit("newMessages", message);
    res.status(200).json(message);
  }
});
const getUsers = AsyncHandler(async (req, res) => {
  //dont get the user whihc is already logged in
  const users = await User.find({
    _id: { $ne: req.user },
  }).select("-password -email -__v");
  res.status(200).json(users);
});

export { getMessages, sendMessages, getUsers };
