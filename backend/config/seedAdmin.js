// One-time script to create the first Admin account.
// Run with: npm run seed:admin
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./db");
const Admin = require("../models/Admin");

(async () => {
  await connectDB();

  const username = process.env.SEED_ADMIN_USERNAME || "admin";
  const email = process.env.SEED_ADMIN_EMAIL || "admin@example.com";
  const password = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";

  const existing = await Admin.findOne({ $or: [{ email }, { username }] });
  if (existing) {
    console.log(`[seed] Admin already exists (${existing.email}). Nothing to do.`);
    await mongoose.disconnect();
    process.exit(0);
  }

  const admin = await Admin.create({ username, email, password });
  console.log(`[seed] Admin created: ${admin.email} / (password as set in .env)`);

  await mongoose.disconnect();
  process.exit(0);
})().catch((err) => {
  console.error("[seed] Failed:", err.message);
  process.exit(1);
});
