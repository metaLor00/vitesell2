import express from "express";
import Joi from "joi";
import validate from "../utils/validate.js";
import {
  initiateAuth,
  verifyOtpController,
  passwordLoginController,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

// Validation schemas
const initiateSchema = {
  body: Joi.object({
    mobile: Joi.string().min(3).required().messages({
      "string.base": "Mobile must be a string",
      "string.empty": "Mobile cannot be empty",
      "string.min": "Mobile must be at least 3 characters long",
      "any.required": "Mobile is required",
    }),
    method: Joi.string().valid("otp", "password").default("password"),
  }),
};

const verifyOtpSchema = {
  body: Joi.object({
    mobile: Joi.string().min(3).required(),
    code: Joi.string().length(6).required(),
  }),
};

const passwordSchema = {
  body: Joi.object({
    mobile: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
  }),
};

// Initiate login flow: choose OTP or password
authRouter.post("/initiate", validate(initiateSchema), initiateAuth);

// Verify OTP
authRouter.post("/verify-otp", validate(verifyOtpSchema), verifyOtpController);

// Password login
authRouter.post("/password", validate(passwordSchema), passwordLoginController);

export default authRouter;
