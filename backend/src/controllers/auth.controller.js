import { createAndSendOtp, verifyOtp } from "../services/otp.service.js";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import winston from "winston";

export async function initiateAuth(req, res) {
  const { mobile, method } = req.validatedBody;
  try {
    if (method === "otp") {
      await createAndSendOtp(mobile);
      return res.status(200).json({ message: "OTP sent" });
    }
    // 'password' path: indicate to frontend that they can send credentials
    return res.status(200).json({ message: "Send password to login" });
  } catch (err) {
    winston.warn("initiateAuth error: " + (err.message || err));
    return res.status(400).json({ message: err.message });
  }
}

export async function verifyOtpController(req, res) {
  const { mobile, code } = req.validatedBody;
  try {
    const user = await verifyOtp(mobile, code);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const token = user.generateAuthToken();
    return res.status(200).json({ token });
  } catch (err) {
    winston.warn("verifyOtpController error: " + (err.message || err));
    return res.status(400).json({ message: err.message });
  }
}

export async function passwordLoginController(req, res) {
  const { mobile, password } = req.validatedBody;
  try {
    const user = await User.findOne({ mobile });
    if (!user)
      return res.status(400).json({ message: "Invalid mobile or password" });
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(400).json({ message: "Invalid mobile or password" });
    const token = user.generateAuthToken();
    return res.status(200).json({ token });
  } catch (err) {
    winston.warn("passwordLoginController error: " + (err.message || err));
    return res.status(500).json({ message: "Server error" });
  }
}
