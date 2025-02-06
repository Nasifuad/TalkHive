import { configDotenv } from "dotenv";
configDotenv({
  path: "./.env",
});
import { server } from "./socket/socket.io.js";
import { connectDB } from "./DB/connectDB.js";
connectDB()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to DB", error);
  });
