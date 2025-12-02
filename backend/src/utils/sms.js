// Simple SMS service wrapper (stub)
// Replace with real SMS provider implementation (Twilio, etc.)
import winston from "winston";

export async function sendSms(mobile, message) {
  // Only log the plaintext OTP in development or when DEBUG_OTP is set
  const debugOtp =
    (process.env.DEBUG_OTP || "").toLowerCase() === "true" ||
    process.env.NODE_ENV !== "production";
  if (debugOtp) {
    winston.info(`sendSms to ${mobile}: ${message}`);
  } else {
    // Mask digits in the message for production logging
    const masked = String(message).replace(/\d/g, "*");
    winston.info(`sendSms to ${mobile}: ${masked}`);
  }
  // TODO: integrate with provider; throw on error
  return true;
}
