const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    const url = process.env.MONGO_URL;

    await mongoose.connect(url);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("DB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectToDb;
