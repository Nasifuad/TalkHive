import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../model/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.utils.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
//
// Here is the part where controllers are written
//
//
// const options = {
//   httpOnly: true,
//   maxAge: 24 * 60 * 60 * 1000,
//   secure: true,
// };
const generateAccessToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });

  return token;
};

const register = AsyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
        data: { username, email, password },
      });
    }
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      throw new ApiError(400, "User already exist");
    }

    const avatarLocalPath = req.file.buffer;
    console.log(avatarLocalPath);
    const avatarFile = await uploadToCloudinary(avatarLocalPath);
    console.log("avatarFile", avatarFile);
    const user = await User.create({
      username,
      email,
      password,
      avatar: avatarFile.url,
    });

    if (user) {
      const token = generateAccessToken(user._id);

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
      });
      return res.status(201).json(new ApiResponse(201, "User created", user));
    }
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

const login = AsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  console.log("req.body", req.body);
  const user = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (!user) {
    // throw new ApiError(400, "User does not exist");
    res.status(400).json({ success: false, message: "Invalid Credintials" });
  }
  const isMatch = await user.checkPassword(password.toString());
  console.log("isMatch", isMatch);
  if (!isMatch) {
    // throw new ApiError(400, "Incorrect password");
    res.status(400).json({ success: false, message: "Invalid Credintials" });
  }
  const token = generateAccessToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,
  });
  return res.status(200).json(new ApiResponse(200, "User logged in", user));
});
const logout = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user);
  if (!user) {
    throw new ApiError(400, "User does not exist");
  }
  res.clearCookie("token");
  return res.status(200).json(new ApiResponse(200, "User logged out"));
});

const checkUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user);
  if (!user) {
    throw new ApiError(400, "User does not exist");
  }
  return res.status(200).json({
    success: true,
    message: "User found",
    userInfo: {
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    },
  });
});

const updateAvatar = AsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      throw new ApiError(400, "User does not exist");
    }
    const avatarLocalPath = req.file.path;
    if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar not found");
    }
    const avatarFile = await uploadToCloudinary(avatarLocalPath);

    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      { avatar: avatarFile.url },
      { new: true }
    );
    if (!updatedUser) {
      throw new ApiError(400, "User does not exist");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Avatar updated", updatedUser));
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

export { register, login, logout, updateAvatar, checkUser };
