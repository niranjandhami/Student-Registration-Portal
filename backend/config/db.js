const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    console.log("MONGO_URI loaded:", !!uri);

    if (!uri) {
      throw new Error("MONGO_URI is not set in the environment");
    }

    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(uri);

    console.log(
      `[db] MongoDB connected: ${conn.connection.host}/${conn.connection.name}`
    );

    mongoose.connection.on("disconnected", () => {
      console.warn("[db] MongoDB disconnected");
    });
  } catch (err) {
    console.error(`[db] Connection failed: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;