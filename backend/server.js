import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import questionRoutes from "./routes/question.route.js";
import authRoutes from "./routes/auth.route.js";
import { connectToDb } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);

app.listen(PORT, () => {
  console.log("SERVER IS RUNNING ON PORT", PORT);
  connectToDb();
});
