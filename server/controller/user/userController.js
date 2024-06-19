const ErrorHandler = require("../../utils/errorHandler");
const asyncErrorHandler = require("../../utils/asyncErrorHandler");
var jwt = require("jsonwebtoken");
const User = require("../../models/userModel");

exports.userLogin = asyncErrorHandler(async (req, res, next) => {
  // Retrieve email and password from request body
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(new ErrorHandler(400, "Please provide email and password"));
  }
  // Find the user with the provided email and populate the role
  const user = await User.findOne({ email }).select("+password");
  // Check if user with the provided email exists
  if (!user) {
    return next(new ErrorHandler(401, "Invalid credentials"));
  }

  let FetchedUser = user;

  // Compare the provided password with the hashed password using the schema method
  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) {
    return next(new ErrorHandler(401, "Invalid credentials"));
  }

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  const userIDpayLoad = {
    id: FetchedUser._id,
  };

  const AuthToken = jwt.sign(userIDpayLoad, process.env.JWT_SECRET);
  res.status(200).cookie("AuthToken", AuthToken, cookieOptions).json({
    success: true,
    user: FetchedUser,
    accessToken: AuthToken,
  });
});

exports.logout = asyncErrorHandler(async (req, res, next) => {
  // clear the cookie of the user
  res.cookie("AuthToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: "User Logout Successfully" });
});

exports.userCreate = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validation: Check if required fields are provided
  if (!name || !email || !password) {
    return next(new ErrorHandler(400, "Please provide all required fields"));
  }

  // Check if the email already exists
  const existingUser = await User.exists({ email });
  if (existingUser) {
    // Email already exists, return an error
    return next(new ErrorHandler(400, "Email already exists"));
  }
  // Create the new user
  const newUser = new User({
    name,
    email,
    password,
  });

  // Save the new user to the database
  const savedUser = await newUser.save();
  res.status(201).json({
    success: true,
    message: "User created successfully",
    user: savedUser,
  });
});

exports.loadUser = asyncErrorHandler(async (req, res, next) => {
  const userId = req.userId;
  if (!userId) {
    return res
      .status(404)
      .json({ success: false, message: "User ID not provided" });
  }

  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({ success: true, user });
});
