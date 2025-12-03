import express from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import validate from "../utils/validate.js";
import Joi from "joi";
import { createUserAdmin } from "../services/admin.service.js";
import winston from "winston";
import { userValidationSchemas } from "../models/user.js";

const adminRouter = express.Router();

// admin only middleware
function adminOnly(req, res, next) {
  const roles = req.user && req.user.roles ? req.user.roles : [];
  if (roles.includes("admin")) return next();
  return res.status(403).json({ message: "Forbidden" });
}

adminRouter.post(
  "/create-user",
  authMiddleware,
  adminOnly,
  validate(userValidationSchemas),
  async (req, res) => {
    const { mobile, password, roles } = req.validatedBody;
    try {
      const user = await createUserAdmin({ mobile, password, roles });
      return res
        .status(201)
        .json({ _id: user._id, mobile: user.mobile, roles: user.roles });
    } catch (err) {
      winston.warn("admin.create-user error: " + (err.message || err));

      // Handle duplicate key error (mobile already exists)
      if (err.code === "EEXIST" || err.code === 11000) {
        return res.status(409).json({
          status: "error",
          message: "Mobile already exists",
          errors: { mobile: ["This mobile number is already registered"] },
        });
      }

      // Generic server error
      return res.status(500).json({
        status: "error",
        message: "Server error",
        errors: { server: ["Failed to create user"] },
      });
    }
  }
);

export default adminRouter;
