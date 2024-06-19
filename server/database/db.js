const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      serverSelectionTimeoutMS: 500000, // Increase timeout to 5000ms (5 seconds)
    })
    .then(() => {
      console.log("Connected to the database successfully");
    })
    .catch((error) => {
      console.error("Database connection error:", error.message);
      process.exit(1); // Exit the process with failure
    });

  mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose connection is disconnected.");
  });
};

module.exports = connectDatabase;
