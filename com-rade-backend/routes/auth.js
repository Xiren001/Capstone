import express from "express";
import jwt from "jsonwebtoken";
import passport from "../config/passport.js";
import db from "../models/index.js";
const { User } = db;
import { hashPassword, comparePassword } from "../utils/auth.js";
import {
  passwordValidationMiddleware,
  getPasswordRequirements,
} from "../utils/passwordPolicy.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/signup", passwordValidationMiddleware, async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashed = await hashPassword(password);
    const user = await User.create({ username, password: hashed });

    // Include any password warnings in response
    const response = { id: user.id, username: user.username };
    if (req.passwordWarnings) {
      response.warnings = req.passwordWarnings;
    }

    res.json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create access token (short-lived)
    const accessToken = jwt.sign(
      { id: user.id, type: "access" },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m", // 15 minutes for security
      }
    );

    // Create refresh token (long-lived)
    const refreshToken = jwt.sign(
      { id: user.id, type: "refresh" },
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
      {
        expiresIn: "7d", // 7 days
      }
    );

    res.json({
      accessToken,
      refreshToken,
      expiresIn: 900, // 15 minutes in seconds
      tokenType: "Bearer",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ id: req.user.id, username: req.user.username });
  }
);

// Refresh token endpoint
router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token is required" });
    }

    // Verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
    );

    if (decoded.type !== "refresh") {
      return res.status(401).json({ message: "Invalid token type" });
    }

    // Check if user still exists
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Create new access token
    const accessToken = jwt.sign(
      { id: user.id, type: "access" },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    // Optionally create new refresh token (token rotation for enhanced security)
    const newRefreshToken = jwt.sign(
      { id: user.id, type: "refresh" },
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
      expiresIn: 900, // 15 minutes in seconds
      tokenType: "Bearer",
    });
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res
        .status(401)
        .json({ message: "Invalid or expired refresh token" });
    }
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Get password requirements endpoint
router.get("/password-requirements", (req, res) => {
  res.json({
    message: "Military-grade password requirements",
    requirements: getPasswordRequirements(),
    policy: {
      minLength: 12,
      maxLength: 128,
      requiresUppercase: true,
      requiresLowercase: true,
      requiresNumbers: true,
      requiresSpecialChars: true,
      minSpecialChars: 2,
      blocksCommonPasswords: true,
      blocksUsernameInclusion: true,
    },
  });
});

export default router;
