const express = require("express")

const router = express.Router()

router.get("/send",(req,res)=>{
    res.send("Send Message EndPoint")
})

router.get('/recieve',(req,res)=>{
    res.send("Recieve Message Endpoint")
})


module.exports = router