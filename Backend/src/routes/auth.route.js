const express = require("express");

const router = express.Router()


router.get("/signup",(req,res)=>{
    res.send("Signup Endpoint")
})

router.get("/login",(req,res)=>{
    res.send("Login Endpoint")
})

router.get("/logout",(req,res)=>{
    res.send("Logout Endpoint")
})



module.exports = router
