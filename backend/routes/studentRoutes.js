const express = require("express");
const { body } = require("express-validator");
const {
  getMyProfile,
  updateMyProfile,
  changeMyPassword,
  getAllStudents,
  searchStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getSummary,
} = require("../controllers/studentController");
const { protect, requireRole } = require("../middleware/auth");

const router = express.Router();

// ---- Student self-service ----
router.get("/me", protect, requireRole("student"), getMyProfile);

router.put(
  "/me",
  protect,
  requireRole("student"),
  [
    body("name").optional().trim().notEmpty().withMessage("Name cannot be empty."),
    body("yearOfStudy").optional().isInt({ min: 1, max: 6 }).withMessage("Year of study must be between 1 and 6."),
  ],
  updateMyProfile
);

router.put("/me/password", protect, requireRole("student"), changeMyPassword);

// ---- Admin management (order matters: specific paths before /:id) ----
router.get("/stats/summary", protect, requireRole("admin"), getSummary);
router.get("/search", protect, requireRole("admin"), searchStudents);
router.get("/", protect, requireRole("admin"), getAllStudents);
router.get("/:id", protect, requireRole("admin"), getStudentById);
router.put("/:id", protect, requireRole("admin"), updateStudent);
router.delete("/:id", protect, requireRole("admin"), deleteStudent);

module.exports = router;
