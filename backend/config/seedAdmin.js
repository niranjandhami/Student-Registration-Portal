require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./db");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

(async () => {
  await connectDB();

  const username = process.env.SEED_ADMIN_USERNAME || "admin";
  const email = process.env.SEED_ADMIN_EMAIL || "admin@example.com";
  const password = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";

  let admin = await Admin.findOne({ email }).select("+password");

  if (!admin) {
    admin = await Admin.create({
      username,
      email,
      password,
    });

    console.log("[seed] Admin created.");
  } else {
    admin.username = username;
    admin.password = password; // will be hashed by the model pre-save hook
    await admin.save();

    console.log("[seed] Admin password reset.");
  }

  await mongoose.disconnect();
  process.exit(0);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});