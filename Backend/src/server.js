import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import cors from "cors";
import { connectDb } from "./lib/db.js";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config()

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: "https://chat-application-61p2v0v36-yashwanths-projects-18cdfc80.vercel.app/", // update later
  credentials: true
}));

app.use(express.json());
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoute)

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.listen(process.env.PORT,()=>{
    console.log(`Server Running On Port ${process.env.PORT}`)
    connectDb()
})

