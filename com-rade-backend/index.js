import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import passport from "./config/passport.js";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// CORS configuration for mobile apps
app.use(
  cors({
    origin: "*", // For development - restrict in production
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(passport.initialize());

// Rate limiting for authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    error: "Too many authentication attempts",
    message: "Please try again after 15 minutes",
    retryAfter: 15 * 60, // seconds
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    res.status(429).json({
      error: "Too many authentication attempts",
      message: "Please try again after 15 minutes",
      retryAfter: 15 * 60,
    });
  },
});

// General API rate limiting (more lenient)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests",
    message: "Please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply general rate limiting to all requests
app.use(generalLimiter);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Com-rade Backend API",
    version: "1.0.0",
    endpoints: {
      auth: {
        signup: "POST /api/auth/signup",
        signin: "POST /api/auth/signin",
        profile: "GET /api/auth/profile (requires JWT token)",
      },
    },
  });
});

// Apply strict rate limiting to auth endpoints
app.use("/api/auth/signin", authLimiter);
app.use("/api/auth/signup", authLimiter);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
