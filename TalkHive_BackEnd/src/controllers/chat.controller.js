import { Message } from "../model/chat.model.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { uploadToCloudinary } from "../utils/cloudinary.utils.js";

const getMessages = AsyncHandler(async (req, res) => {
  const userId = req.user;
  const { id: senderId } = req.params;

  // console.log("senderId", senderId);
  // console.log("userId", userId);
  const message = await Message.find({
    $or: [
      { senderId: userId, receiverId: senderId },
      { senderId: senderId, receiverId: userId },
    ],
  }).sort({ createdAt: -1 });
  // console.log("wtf is this", message);
  res.send(message);
});

const sendMessages = AsyncHandler(async (req, res) => {
  const { receiverId, text } = req.body;
  const senderId = req.user;
  console.log("senderId", senderId, "receiverId", receiverId, "text", text);
  const imageBuffer = req.file?.buffer;
  console.log("imageBuffer", imageBuffer);
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
  res.status(200).json(message);
});

const getUsers = AsyncHandler(async (req, res) => {
  //dont get the user whihc is already logged in
  const users = await User.find({
    _id: { $ne: req.user },
  }).select("-password -email -__v");
  res.status(200).json(users);
});

export { getMessages, sendMessages, getUsers };
