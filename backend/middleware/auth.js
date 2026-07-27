const { verifyToken } = require("../config/jwt");

/**
 * Verifies the Bearer token and attaches { id, role } to req.user.
 */
const protect = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized. Please log in." });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Session expired or invalid. Please log in again." });
  }
};

/**
 * Restricts a route to one or more roles, e.g. requireRole("admin")
 */
const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: "You do not have permission to do that." });
  }
  next();
};

module.exports = { protect, requireRole };
