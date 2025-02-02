import { configDotenv } from "dotenv";
configDotenv({
  path: "./.env",
});
import { app } from "./app.js";
import { connectDB } from "./DB/connectDB.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to DB", error);
  });
