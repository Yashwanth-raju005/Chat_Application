import User from "../models/User.js";
import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "../email/emailHandler.js";
import "dotenv/config";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All Field are required!" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be above 6 character" });
    }

    // check if email is valid or not

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid Email Format" });
    }

    const user = await User.findOne({ email });

    if (user)
      return res
        .status(400)
        .json({ message: "User With This Mail Already Exist" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });

      try {
        await sendWelcomeEmail(
          savedUser.email,
          savedUser.fullName,
          process.env.CLIENT_URL,
        );
      } catch (error) {}
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in SignUp Controller");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password)

    if(!isPasswordCorrect){
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    generateToken(user._id,res)

    res.status(200).json({
      _id:user._id,
      fullName:user.fullName,
      email:user.email,
      profilePic:user.profilePic,
    })

  } catch (error) {
    console.log("Error In Login Controller")
    res.status(500).json({message:"Internal Server Error"})
  }
};

export const logout = (req, res) => {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logged Out Successfully"})
};
