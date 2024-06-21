import { useEffect, useState } from "react";
import { deleteBlog, updateBlog } from "../api/blogApis";
import Pagination from "./Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const url = import.meta.env.VITE_BACKEND_APP_URI;

export default function CardContainer({ edit, blogs = [], onClose }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [description, setDescription] = useState("");
  const [blogDataState, setBlogDataState] = useState({
    blogTitle: "",
    description: "",
    errors: {},
  });
  const { user } = useSelector((state) => state.User);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4;

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handleSave = async (e) => {
    e.preventDefault();
    const errors = validateForm(blogDataState);
    if (Object.keys(errors).length === 0) {
      setBlogDataState({ ...blogDataState, errors: errors });
      const blogData = { blogTitle, description, id: editBlog._id };
      try {
        const data = await updateBlog(blogData);
        if (data.success) {
          setBlogTitle("");
          setDescription("");
          handleClosePopup(); // Close the popup
          onClose();
          toast.success(data.message);
        } else {
          toast.error(data.error.data.message);
        }
      } catch (error) {
        toast.error(error);
      }
    } else {
      setBlogDataState({ ...blogDataState, errors: errors });
    }
  };

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.blogTitle.trim()) {
      errors.blogTitle = "Blog Title is required";
    }
    if (!formData.description.trim()) {
      errors.description = "Blog Description is required";
    }
    return errors;
  };

  const handleCancel = () => {
    // Clear form fields
    setBlogTitle("");
    setDescription("");
    handleClosePopup(); // Close the popup
  };
  const deleteBlogData = async (id) => {
    try {
      const deletedBlog = await deleteBlog(id);
      if (deletedBlog.success) {
        toast.success(deletedBlog.message);
        blogs = blogs.filter((i) => i._id !== id);
        onClose();
      } else {
        toast.error(deletedBlog.error.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const handleEditClick = (blogId) => {
    const blogById = blogs.find((m) => m._id === blogId);
    setEditBlog(blogById);
    setBlogTitle(blogById.blogTitle);
    setDescription(blogById.description);
    setBlogDataState({
      ...blogDataState,
      blogTitle: blogById.blogTitle,
      description: blogById.description,
    });
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {}, [editBlog]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      {blogs.length === 0 ? (
        <h2 className="text-center text-purple-500 font-semibold py-2 px-4 rounded">
          No Blogs avialable
        </h2>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentBlogs.map((blog) => (
              <div
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                key={blog._id}
              >
                <img
                  className="rounded-t-lg"
                  src={`${url}/api/image/${blog.blog_photo}`}
                  alt={blog.blogTitle}
                />
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {blog.blogTitle}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Author: {blog.author.name}
                  </p>
                  <Link
                    to={`/blog/${blog._id}`}
                    className="inline-flex items-center bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 mb-2 rounded"
                  >
                    Read
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </Link>
                  {user && user.name === blog.author.name ? (
                    <div className="flex">
                      <button
                        id={blog._id}
                        onClick={(e) => deleteBlogData(e.target.id)}
                        className="mr-4 bg-gray-300 hover:bg-gray-400 font-semibold py-2 px-4 rounded"
                      >
                        Delete
                      </button>
                      <button
                        id={blog._id}
                        onClick={(e) => handleEditClick(e.target.id)}
                        className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
                      >
                        Edit
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
            {isPopupOpen ? (
              <div key={editBlog} className={`fixed inset-0 z-50`}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <form
                  encType="multipart/form-data"
                  onSubmit={handleSave}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg"
                  noValidate
                >
                  <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
                  <div className="mb-4">
                    <label htmlFor="blogTitle" className="block mb-1">
                      Blog Name:
                    </label>
                    <input
                      type="text"
                      id="blogTitle"
                      value={blogTitle}
                      required
                      onChange={(e) => {
                        setBlogTitle(e.target.value);
                        setBlogDataState({
                          ...blogDataState,
                          blogTitle: e.target.value,
                        });
                      }}
                      className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                    {blogDataState.errors.blogTitle && (
                      <p className="text-red-500">
                        {blogDataState.errors.blogTitle}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="block mb-1">
                      Description:
                    </label>
                    <textarea
                      id="description"
                      required
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        setBlogDataState({
                          ...blogDataState,
                          description: e.target.value,
                        });
                      }}
                      className="w-full border border-gray-300 rounded px-4 py-2 resize-none"
                    ></textarea>
                    {blogDataState.errors.description && (
                      <p className="text-red-500">
                        {blogDataState.errors.description}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleCancel}
                      className="mr-4 bg-gray-300 hover:bg-gray-400 font-semibold py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            ) : null}
          </div>
          <Pagination
            itemsPerPage={blogsPerPage}
            totalItems={blogs.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
    </>
  );
}
