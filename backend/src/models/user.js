import Joi from "joi";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";

const { Schema, model } = mongoose;

export const userSchema = new Schema({
  mobile: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 1024,
    required: true,
  },
  roles: {
    type: [String],
    enum: ["user", "admin"],
    default: ["user"],
  },
  needsPassword: {
    type: Boolean,
    default: false,
  },
});
///information expert principle
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, roles: this.roles },
    config.get("jwtPrivateKey")
  );
};
const User = model("User", userSchema);

const userValidationSchemas = {
  body: Joi.object({
    mobile: Joi.string().min(3).required().messages({
      "string.base": "Mobile must be a string",
      "string.empty": "Mobile cannot be empty",
      "string.min": "Mobile must be at least 3 characters long",
      "any.required": "Mobile is required",
    }),
    password: Joi.string().min(8).max(255).required().messages({
      "string.base": "Password must be a string",
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least 8 characters long",
      "any.required": "Password is required",
    }),
  }),
};

export { User, userValidationSchemas };
