import { Router } from "express";
import { upload } from "../utils/multer.utils.js";
import { authVerify } from "../utils/auth.verify.js";
import {
  register,
  login,
  logout,
  updateAvatar,
} from "../controllers/auth.controller.js";

const router = Router();

router.route("/signup").post(upload.single("avatar"), register);
router.route("/login").post(login);
router.route("/logout").post(authVerify, logout);
router
  .route("/update-avatar")
  .post(authVerify, upload.single("avatar"), updateAvatar);

//test route

router.route("/test").get(authVerify, (req, res) => {
  res.status(200).json({ message: "You are logged in" });
});

export { router };
