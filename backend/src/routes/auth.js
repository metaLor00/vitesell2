import express from "express";
import { User } from "../models/user.js";
import validate from "../utils/validate.js";
import config from "config";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";
const authRouter = express.Router();
const authValidationSchema = {
  body: Joi.object({
    email: Joi.string().email().required().messages({
      "string.base": "Email must be a string",
      "string.email": "Email must be a valid email",
      "string.empty": "Email cannot be empty",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(8).required().messages({
      "string.base": "Password must be a string",
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least 8 characters long",
      "any.required": "Password is required",
    }),
  }),
};
authRouter.post("/", validate(authValidationSchema), async (req, res) => {
  const validatedBody = req.validatedBody;

  let user = await User.findOne({ email: validatedBody.email });
  if (!user) {
    res.status(400).json({ message: "invalid email or password" });
  }
  const isValidPassword = await bcrypt.compare(
    validatedBody.password,
    user.password
  );
  if (!isValidPassword) {
    res.status(400).json({ message: "invalid email or password" });
  }

  const token = user.generateAuthToken();
  res.status(200).json({ token });
});

export default authRouter;
