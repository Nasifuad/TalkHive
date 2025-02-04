import { configDotenv } from "dotenv";
configDotenv({ path: "./.env" });
import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "../utils/ApiError.js";
import streamifier from "streamifier";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// const uploadStream = () => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.v2.uploader.upload_stream(
//       { folder: "uploads" },
//       (error, result) => {
//         if (result) resolve(result);
//         else reject(error);
//       }
//     );
//     streamifier.createReadStream(req.file.buffer).pipe(stream);
//   });
// };

const uploadToCloudinary = async (buffer) => {
  try {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "uploads" },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );
      streamifier.createReadStream(buffer).pipe(stream);
    });
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};

// const uploadToCloudinary = async (file) => {
//   try {
//     if (!file) {
//       throw new ApiError(400, "File not found");
//     }
//     return await cloudinary.uploader.upload(file, {
//       folder: "avatars",
//       width: 150,
//       crop: "scale",
//     });
//   } catch (error) {
//     throw new ApiError(400, error.message);
//   }
// };

export { uploadToCloudinary };
