const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const connectDatabase = require("./database/db");
const routes = require("./routes/index");
const errorMiddleware = require("./utils/globalErrorHandler");
const asyncErrorHandler = require("./utils/asyncErrorHandler");
require("dotenv").config();

// Create an Express application
const app = express();

// Define the port number, using the environment variable PORT if available, otherwise default to 3001
const port = process.env.PORT || 3001;

// Middleware setup
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    // Allow requests from specified origin(s)
    origin: [process.env.FRONTEND_URL, "http://localhost:3032"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  })
);

// database connection
// Database connection
try {
  connectDatabase();
} catch (error) {
  console.error("Failed to connect to the database:", error.message);
}

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/", routes);

app.use("/uploads", express.static("uploads"));

// Define a route to get the image
app.get("/api/image/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(`${__dirname}/uploads/${imageName}`);
});
// Test Route
app.get(
  "/",
  asyncErrorHandler(async (req, res, next) => {
    res.send("Server Is Running");
  })
);
// error handler
app.use(errorMiddleware);
