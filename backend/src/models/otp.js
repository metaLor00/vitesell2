import mongoose from "mongoose";

const { Schema, model } = mongoose;

const otpSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: false },
  mobile: { type: String, required: true, index: true },
  codeHash: { type: String, required: true },
  attempts: { type: Number, default: 0 },
  consumed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
});

// TTL index to automatically remove expired OTP documents
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OTP = model("OTP", otpSchema);

export { OTP };
