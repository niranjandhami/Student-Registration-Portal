require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const Admin = require("./models/Admin");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Student Registration Portal API is running.",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

app.use(notFound);
app.use(errorHandler);

async function startServer() {
  await connectDB();

  const username = process.env.SEED_ADMIN_USERNAME || "admin";
  const email = process.env.SEED_ADMIN_EMAIL || "admin@example.com";
  const password = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";

  const existing = await Admin.findOne({
    $or: [{ email }, { username }],
  }).select("+password");

  if (!existing) {
    await Admin.create({
      username,
      email,
      password,
    });

    console.log("✅ Default admin account created.");
  } else {
    console.log("✅ Admin account already exists.");
  }

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`[server] Listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error(err);
  process.exit(1);
});