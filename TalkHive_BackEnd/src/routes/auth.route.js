import { Router } from "express";
import { upload } from "../utils/multer.utils.js";
import { authVerify } from "../utils/auth.verify.js";
import {
  register,
  login,
  logout,
  updateAvatar,
  checkUser,
} from "../controllers/auth.controller.js";

const router = Router();
router.route("/").get((req, res) => {
  res.send("Auth route");
});
router.route("/signup").post(upload.single("avatar"), register);
router.route("/login").post(login);
router.route("/logout").get(authVerify, logout);
router
  .route("/update-avatar")
  .post(authVerify, upload.single("avatar"), updateAvatar);
router.route("/check-user").get(authVerify, checkUser);
//test route

router.route("/test").get(authVerify, (req, res) => {
  res.status(200).json({ message: "You are logged in" });
});

export { router };
