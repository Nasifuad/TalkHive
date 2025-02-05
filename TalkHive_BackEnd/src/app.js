import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes/auth.route.js";
import { Chatrouter } from "./routes/chat.route.js";
const app = express();

// middlewares

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

// routes
app.use("/api/v1/user", router);
app.use("/api/v1/chat", Chatrouter);

export { app };
