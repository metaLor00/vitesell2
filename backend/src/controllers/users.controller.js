import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import winston from "winston";

export async function setPasswordController(req, res) {
  // User must be authenticated
  const userId =
    req.user && req.user._id
      ? req.user._id
      : req.user && req.user.id
      ? req.user.id
      : null;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });
  const { password } = req.validatedBody;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    // Allow set if user.needsPassword or if they don't have a password
    if (!user.needsPassword) {
      return res
        .status(400)
        .json({ message: "Password already set. Use Change Password." });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.needsPassword = false;
    await user.save();
    return res.status(200).json({ message: "Password set successfully" });
  } catch (err) {
    winston.warn("setPasswordController error: " + (err.message || err));
    return res.status(500).json({ message: "Server error" });
  }
}

export async function changePasswordController(req, res) {
  const userId =
    req.user && req.user._id
      ? req.user._id
      : req.user && req.user.id
      ? req.user.id
      : null;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });
  const { currentPassword, newPassword } = req.validatedBody;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    // Verify current password
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match)
      return res.status(400).json({ message: "Current password is incorrect" });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.needsPassword = false;
    await user.save();
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    winston.warn("changePasswordController error: " + (err.message || err));
    return res.status(500).json({ message: "Server error" });
  }
}
