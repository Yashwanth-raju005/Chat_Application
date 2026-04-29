import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config()

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoute)

// make ready for deployment

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../Frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../Frontend/dist/index.html"));
    });
}

app.listen(process.env.PORT,()=>{
    console.log("Server Running On Port 3000")
})

