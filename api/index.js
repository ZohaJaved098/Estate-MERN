import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";

import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000!");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

app.use(express.json());
app.use(cookieParser());

// app.listen(3000, () => {
//   console.log("Server is running on port 3000!");
// });

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
//middleware for handling errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
