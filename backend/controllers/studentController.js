const { validationResult } = require("express-validator");
const Student = require("../models/Student");

const handleValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ success: false, message: errors.array()[0].msg, errors: errors.array() });
    return true;
  }
  return false;
};

// GET /api/students/me  (student, own profile)
exports.getMyProfile = async (req, res, next) => {
  try {
    const student = await Student.findById(req.user.id);
    if (!student) return res.status(404).json({ success: false, message: "Profile not found." });
    res.json({ success: true, student: student.toSafeObject() });
  } catch (err) {
    next(err);
  }
};

// PUT /api/students/me  (student, own profile)
const EDITABLE_FIELDS = ["name", "phone", "course", "department", "yearOfStudy", "dob", "address"];

exports.updateMyProfile = async (req, res, next) => {
  try {
    if (handleValidation(req, res)) return;

    const updates = {};
    for (const field of EDITABLE_FIELDS) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }

    const student = await Student.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!student) return res.status(404).json({ success: false, message: "Profile not found." });

    res.json({ success: true, message: "Profile updated.", student: student.toSafeObject() });
  } catch (err) {
    next(err);
  }
};

// PUT /api/students/me/password
exports.changeMyPassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword || newPassword.length < 6) {
      return res.status(422).json({ success: false, message: "Provide your current password and a new password of at least 6 characters." });
    }

    const student = await Student.findById(req.user.id).select("+password");
    if (!student || !(await student.comparePassword(currentPassword))) {
      return res.status(401).json({ success: false, message: "Current password is incorrect." });
    }

    student.password = newPassword;
    await student.save();

    res.json({ success: true, message: "Password updated." });
  } catch (err) {
    next(err);
  }
};

// ---------- Admin-only endpoints ----------

// GET /api/students  (admin) - list with pagination
exports.getAllStudents = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
    const skip = (page - 1) * limit;

    const [students, total] = await Promise.all([
      Student.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Student.countDocuments(),
    ]);

    res.json({
      success: true,
      students,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/students/search?q=...  (admin)
exports.searchStudents = async (req, res, next) => {
  try {
    const q = (req.query.q || "").trim();
    if (!q) {
      return res.json({ success: true, students: [] });
    }

    const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

    const students = await Student.find({
      $or: [{ name: regex }, { email: regex }, { rollNumber: regex }, { course: regex }, { department: regex }],
    }).limit(50);

    res.json({ success: true, students });
  } catch (err) {
    next(err);
  }
};

// GET /api/students/:id  (admin)
exports.getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: "Student not found." });
    res.json({ success: true, student });
  } catch (err) {
    next(err);
  }
};

// PUT /api/students/:id  (admin) - full update, including status
const ADMIN_EDITABLE_FIELDS = [...EDITABLE_FIELDS, "email", "rollNumber", "status"];

exports.updateStudent = async (req, res, next) => {
  try {
    const updates = {};
    for (const field of ADMIN_EDITABLE_FIELDS) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }

    const student = await Student.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!student) return res.status(404).json({ success: false, message: "Student not found." });

    res.json({ success: true, message: "Student updated.", student });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/students/:id  (admin)
exports.deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: "Student not found." });
    res.json({ success: true, message: "Student removed." });
  } catch (err) {
    next(err);
  }
};

// GET /api/students/stats/summary (admin) - small dashboard summary
exports.getSummary = async (req, res, next) => {
  try {
    const [total, active, suspended, graduated] = await Promise.all([
      Student.countDocuments(),
      Student.countDocuments({ status: "active" }),
      Student.countDocuments({ status: "suspended" }),
      Student.countDocuments({ status: "graduated" }),
    ]);

    res.json({ success: true, summary: { total, active, suspended, graduated } });
  } catch (err) {
    next(err);
  }
};
