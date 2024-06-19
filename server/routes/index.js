const express = require("express");
const {
  userCreate,
  loadUser,
  userLogin,
  logout,
} = require("../controller/user/userController");
const {
  blogCreate,
  blogUpdate,
  getAllBlogs,
  deleteBlog,
  getBlog,
} = require("../controller/blog/blogController");
const { imageUpload } = require("../middleware/imageUpload");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

// User Routes
// Register a new user
router.post("/api/register", userCreate);
// Authenticate user and return a JWT token
router.post("/api/login", userLogin);
// Get the authenticated user's details
router.get("/api/user", isAuthenticatedUser, loadUser);
//  Logout the Loggedin User
router.get("/api/logout", logout);

// Post Routes
// Retrieve all blog posts.
router.get("/api/posts", getAllBlogs);
// Retrieve a specific blog post by ID.
router.get("/api/posts/:id", getBlog);
// Create a new blog post
router.post("/api/posts", isAuthenticatedUser, imageUpload, blogCreate);
// Update a blog post by ID
router.put("/api/posts/:id", isAuthenticatedUser, blogUpdate);
// Delete a blog post by ID
router.delete("/api/posts/:id", isAuthenticatedUser, deleteBlog);
module.exports = router;
