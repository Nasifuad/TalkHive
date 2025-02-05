import { Router } from "express";
import { authVerify } from "../utils/auth.verify.js";
import {
  getMessages,
  sendMessages,
  getUsers,
} from "../controllers/chat.controller.js";
import { upload } from "../utils/multer.utils.js";

const Chatrouter = Router();

Chatrouter.route("/get-messages/:id").get(authVerify, getMessages);
Chatrouter.route("/send-messages").post(
  authVerify,
  upload.single("image"),
  sendMessages
);
Chatrouter.route("/get-users").get(authVerify, getUsers);

export { Chatrouter };
