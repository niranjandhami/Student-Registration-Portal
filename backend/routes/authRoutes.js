const express = require("express");
const { body } = require("express-validator");
const rateLimit = require("express-rate-limit");
const { registerStudent, loginStudent, loginAdmin, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: "Too many login attempts. Try again in a few minutes." },
});

router.post(
  "/register",
  [
    body("rollNumber").trim().notEmpty().withMessage("Roll number is required."),
    body("name").trim().notEmpty().withMessage("Name is required."),
    body("email").isEmail().withMessage("A valid email is required.").normalizeEmail(),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters."),
  ],
  registerStudent
);

router.post(
  "/login",
  loginLimiter,
  [
    body("email").isEmail().withMessage("A valid email is required.").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  loginStudent
);

router.post(
  "/admin/login",
  loginLimiter,
  [
    body("email").isEmail().withMessage("A valid email is required.").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  loginAdmin
);

router.get("/me", protect, getMe);

module.exports = router;
