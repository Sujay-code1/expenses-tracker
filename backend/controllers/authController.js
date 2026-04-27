import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Invalid data", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // true in production
        sameSite: "None",
      })
      .json({
        message: "User created successfully",
        success: true,
        user: { id: user._id, fullName, email }
      });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// LOGin

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Invalid data", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials", success: false });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(401).json({ message: "Invalid credentials", success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    const safeUser = {
      id: user._id,
      fullName: user.fullName,
      email: user.email
    };

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .json({
        message: `Welcome back ${user.fullName}`,
        success: true,
        user: safeUser
      });

  } catch (error) {
     console.log("🔥 LOGIN ERROR:", error);
  console.log("🔥 MESSAGE:", error.message);
  console.log("🔥 STACK:", error.stack);
  console.log("ENV KEYS:", Object.keys(process.env));
console.log("JWT:", process.env.JWT_SECRET);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//logout

export const Logout = async (req, res) => {
  return res
    .status(200)
    .cookie("token", "", { httpOnly: true, expires: new Date(0) })
    .json({ message: "Logged out successfully", success: true });
};
