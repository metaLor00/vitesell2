import bcrypt from "bcrypt";
import crypto from "crypto";
import { OTP } from "../models/otp.js";
import { User } from "../models/user.js";
import { sendSms } from "../utils/sms.js";
import winston from "winston";

const OTP_TTL_MINUTES = 5; // OTP validity
const OTP_RESEND_COOLDOWN_MS = 60 * 1000; // 60s cooldown between sends
const OTP_LENGTH = 6;

function generateCode() {
  // return 6-digit code padded
  const val = crypto.randomInt(0, 1000000);
  return String(val).padStart(OTP_LENGTH, "0");
}

export async function createAndSendOtp(mobile) {
  // Find or create user (create with random password if absent)
  let user = await User.findOne({ mobile });
  if (!user) {
    // Create a placeholder user with a random password
    const tempPassword = crypto.randomBytes(32).toString("hex");
    const bcryptHash = await bcrypt.hash(tempPassword, 10);
    user = new User({ mobile, password: bcryptHash, needsPassword: true });
    try {
      await user.save();
    } catch (err) {
      // Handle duplicate key errors gracefully (e.g., unique index on email created earlier)
      // If a unique index on a non-provided field (like email) exists, an insert will fail with E11000.
      // In that case, try to find an existing user by mobile and continue.
      if (err && err.code === 11000) {
        winston.warn(
          "Duplicate key on user insert; attempting to find existing user by mobile"
        );
        const existing = await User.findOne({ mobile });
        if (existing) user = existing;
        else throw err; // rethrow if we can't recover
      } else {
        throw err;
      }
    }
  }

  // Don't send if last OTP was created too recently (cooldown)
  const lastOtp = await OTP.findOne({ mobile }).sort({ createdAt: -1 });
  if (
    lastOtp &&
    Date.now() - lastOtp.createdAt.getTime() < OTP_RESEND_COOLDOWN_MS
  ) {
    throw new Error(
      "Too many requests. Please wait before requesting another OTP."
    );
  }

  const code = generateCode();
  const codeHash = await bcrypt.hash(code, 10);
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);
  const otpDoc = new OTP({ user: user._id, mobile, codeHash, expiresAt });
  await otpDoc.save();

  // Log OTP generation (masked in production)
  const debugOtp =
    (process.env.DEBUG_OTP || "").toLowerCase() === "true" ||
    process.env.NODE_ENV !== "production";
  if (debugOtp) {
    winston.info(`OTP created for ${mobile}: ${code}`);
  } else {
    winston.info(`OTP created for ${mobile}`);
  }

  // send SMS (non-blocking) and log (in production use real provider)
  try {
    await sendSms(mobile, `Your verification code is ${code}`);
  } catch (err) {
    winston.warn(
      "Failed to send SMS, but OTP is still stored: " + (err.message || err)
    );
  }

  return { mobile, expiresAt };
}

export async function verifyOtp(mobile, code) {
  const otpDoc = await OTP.findOne({ mobile, consumed: false }).sort({
    createdAt: -1,
  });
  if (!otpDoc) {
    throw new Error("OTP not found or already consumed/expired");
  }
  if (otpDoc.expiresAt < new Date()) {
    throw new Error("OTP expired");
  }
  if (otpDoc.attempts >= 5) {
    throw new Error("Too many verification attempts");
  }
  const ok = await bcrypt.compare(code, otpDoc.codeHash);
  otpDoc.attempts++;
  if (!ok) {
    await otpDoc.save();
    throw new Error("Invalid OTP");
  }

  // Mark consumed and return the user
  otpDoc.consumed = true;
  await otpDoc.save();
  const user = await User.findOne({ mobile });
  return user;
}
