// ===========================
// controllers/auth.js (minimal version)
// ---------------------------
import User from "../models/user.model.js";
import nodemailer from "nodemailer";

// ---------------------------
// SIGN‑UP
// ---------------------------
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to create user" });
  }
};

// ---------------------------
// LOGIN (plain‑text password)
// ---------------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    res.status(200).json({ message: "User logged in successfully", email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ---------------------------
// SEND OTP (no hashing, no env vars)
// ---------------------------
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate 6‑digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Create a one‑off Ethereal test account & transporter
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // Send e‑mail
    const info = await transporter.sendMail({
      from: testAccount.user, // sender must match auth user on Ethereal
      to: email,
      subject: "OTP",
      text: String(otp),
      html: `<p>Your OTP is <strong>${otp}</strong>.</p>`,
    });

    // Store OTP in user record (plain text) if e‑mail sent
    if (info.messageId) {
      await User.updateOne({ email }, { otp });
      console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
      return res.status(200).json({ message: "OTP sent" });
    }

    res.status(500).json({ message: "Failed to send OTP" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------------------
// SUBMIT OTP (reset password)
// ---------------------------
export const submitOtp = async (req, res) => {
  try {
    const { otp, password } = req.body;
    const user = await User.findOne({ otp });
    if (!user) {
      return res.status(400).json({ message: "OTP is wrong" });
    }

    // Update password & clear stored OTP
    await User.updateOne({ email: user.email }, { password, otp: undefined });
    res.status(200).json({ message: "Password updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
