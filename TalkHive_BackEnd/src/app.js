// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import { router } from "./routes/auth.route.js";
// import { Chatrouter } from "./routes/chat.route.js";
// import { app } from "./socket/socket.io.js";

// // middlewares

// app.use(
//   express.json({
//     limit: "50mb",
//   })
// );
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

// // app.use(
// //   cors({
// //     origin: "http://localhost:5173", // Allow frontend origin
// //     credentials: true, // Allow cookies and authentication headers
// //     methods: ["GET", "POST", "PUT", "DELETE"], // Allow common methods
// //     allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
// //   })
// // );

// // app.use(
// //   cors({
// //     origin: "https://talk-hive-live.vercel.app",
// //     credentials: true,
// //   })
// // );
// // app.use((req, res, next) => {
// //   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
// //   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
// //   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
// //   res.header("Access-Control-Allow-Credentials", "true");
// //   next();
// // });

// // routes
// app.use("/api/v1/user", router);
// app.use("/api/v1/chat", Chatrouter);
// app.use("/a", (req, res) => {
//   res.send("hello from another app");
// });
//sockets
