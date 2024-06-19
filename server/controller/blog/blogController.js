const ErrorHandler = require("../../utils/errorHandler");
const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const Blog = require("../../models/blogModel");

exports.blogCreate = asyncErrorHandler(async (req, res, next) => {
  const { blogTitle, description } = req.body;
  const author = req.userId;
  const blog_photo = req.imagePath || null;
  // Validation: Check if required fields are provided
  if (!blogTitle || !description || !author) {
    return next(new ErrorHandler(400, "Please provide all required fields"));
  }

  // Create the new blog
  const newBlog = new Blog({
    blogTitle,
    description,
    author,
    blog_photo,
  });

  // Save the new blog to the database
  const savedBlog = await newBlog.save();
  res.status(201).json({
    success: true,
    message: "Blog created successfully",
    blog: savedBlog,
  });
});

exports.blogUpdate = asyncErrorHandler(async (req, res, next) => {
  const { id, blogTitle, description } = req.body;

  // Validation: Check if required fields are provided
  if (!id || !blogTitle || !description) {
    return next(new ErrorHandler(400, "Please provide all required fields"));
  }

  // Find the blog by ID and update their data
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    {
      blogTitle,
      description,
    },
    { new: true }
  );

  // Check if the blog was found and updated
  if (!updatedBlog) {
    return next(new ErrorHandler(404, "Blog not found"));
  }

  res.status(200).json({
    success: true,
    message: "Blog updated successfully",
    blog: updatedBlog,
  });
});

exports.getAllBlogs = asyncErrorHandler(async (req, res, next) => {
  const blogs = await Blog.find().populate("author", "name");
  res.status(200).json({ success: true, blogs });
});

exports.getBlog = asyncErrorHandler(async (req, res, next) => {
  // Retrieve blog ID from request query parameters
  const blogId = req.params.id;
  const blog = await Blog.findById(blogId).populate("author", "name");
  res.status(200).json({ success: true, blog });
});

exports.deleteBlog = asyncErrorHandler(async (req, res, next) => {
  // Retrieve blog ID from request query parameters
  const blogId = req.params.id;

  // Validate blog ID
  if (!blogId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide blog ID" });
  }

  // Find the blog by ID and delete it
  const blog = await Blog.findByIdAndDelete(blogId);

  // Check if the blog was found and deleted
  if (!blog) {
    return res.status(404).json({ success: false, message: "blog not found" });
  }

  res.status(200).json({ success: true, message: "Blog deleted successfully" });
});
