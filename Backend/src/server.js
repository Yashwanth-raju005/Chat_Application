require("dotenv").config()

const express = require("express")
const authRoutes = require("./routes/auth.route.js")
const messageRoute = require("./routes/message.route.js")
const app = express();

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoute)

app.listen(process.env.PORT,()=>{
    console.log("Server Running On Port 3000")
})