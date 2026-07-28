const { validationResult } = require("express-validator");
const Student = require("../models/Student");
const Admin = require("../models/Admin");
const { signToken } = require("../config/jwt");

const handleValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ success: false, message: errors.array()[0].msg, errors: errors.array() });
    return true;
  }
  return false;
};

// POST /api/auth/register
exports.registerStudent = async (req, res, next) => {
  try {
    if (handleValidation(req, res)) return;

    const { rollNumber, name, email, password, phone, course, department, yearOfStudy, dob, address } = req.body;

    const existing = await Student.findOne({ $or: [{ email }, { rollNumber }] });
    if (existing) {
      return res.status(409).json({ success: false, message: "A student with that email or roll number already exists." });
    }

    const student = await Student.create({
      rollNumber,
      name,
      email,
      password,
      phone,
      course,
      department,
      yearOfStudy,
      dob,
      address,
    });

    const token = signToken({ id: student._id, role: "student" });

    res.status(201).json({
      success: true,
      message: "Registration successful.",
      token,
      user: { ...student.toSafeObject(), role: "student" }, });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/login  (student)
exports.loginStudent = async (req, res, next) => {
  try {
    if (handleValidation(req, res)) return;

    const { email, password } = req.body;
    const student = await Student.findOne({ email }).select("+password");

    if (!student || !(await student.comparePassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    if (student.status === "suspended") {
      return res.status(403).json({ success: false, message: "This account has been suspended. Contact the registrar's office." });
    }

    const token = signToken({ id: student._id, role: "student" });

   res.json({
  success: true,
  message: "Login successful.",
  token,
  user: {
    ...student.toSafeObject(),
    role: "student",
  },
});;
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/admin/login
exports.loginAdmin = async (req, res, next) => {
  try {
    if (handleValidation(req, res)) return;

    const { email, password } = req.body;
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const token = signToken({ id: admin._id, role: "admin" });

    res.json({
      success: true,
      message: "Login successful.",
      token,
      user: { id: admin._id, username: admin.username, email: admin.email, role: admin.role },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/auth/me
exports.getMe = async (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      const admin = await Admin.findById(req.user.id);
      if (!admin) return res.status(404).json({ success: false, message: "Admin not found." });
      return res.json({ success: true, user: { id: admin._id, username: admin.username, email: admin.email, role: admin.role } });
    }

    const student = await Student.findById(req.user.id);
    if (!student) return res.status(404).json({ success: false, message: "Student not found." });
res.json({ success: true, user: { ...student.toSafeObject(), role: "student" } });  } catch (err) {
    next(err);
  }
};
