const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    blogTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // tag: {
    //   type: String,
    //   required: true,
    //   default: "Other",
    // },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    blog_photo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const blogModel = mongoose.model("Blogs", blogSchema);
module.exports = blogModel;
