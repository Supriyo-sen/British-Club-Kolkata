const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.DATABASE_URI, {
      dbName: process.env.DATABASE_NAME,
    });

    console.log(
      `MongoDB Connected: ${db.connection.host}:${db.connection.port}/${db.connection.name}`
    );
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = { connectDB };
