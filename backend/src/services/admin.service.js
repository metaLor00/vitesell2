import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import winston from "winston";

export async function createUserAdmin({ mobile, password , role }) {
  // Check existence
  let user = await User.findOne({ mobile });
  if (user) {
    const e = new Error("mobile already exists");
    e.code = "EEXIST";
    throw e;
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  user = new User({ mobile,role, password: hash, needsPassword: false });
  try {
    await user.save();
  } catch (err) {
    winston.error("createUserAdmin failed: " + (err.message || err));
    throw err;
  }
  return user;
}
