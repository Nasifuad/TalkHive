import { ApiError } from "./ApiError.js";
import jwt from "jsonwebtoken";
const authVerify = (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log("token", token);
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("decoded", decoded);
      req.user = decoded.userId;

      next();
    } else {
      throw new ApiError(401, "Unauthorized");
    }
  } catch (error) {
    next(error);
  }
};

export { authVerify };
