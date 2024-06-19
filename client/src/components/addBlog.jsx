import { useEffect, useState } from "react";
import AddBlogButton from "./AddBlogButton";
import BlogDataPopup from "./BlogDataPopup";
import CardContainer from "./cardContainer";
import { getAllBlogs } from "../api/blogApis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddBlog() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [orignalBlogs, setOrignalBlogs] = useState([]);
  const [FilterValues, setFilterValues] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getBlogData();
  }, []);

  const getBlogData = async () => {
    try {
      const blogData = await getAllBlogs();
      if (blogData.success) {
        setLoading(false);
        setBlogs(blogData.blogs);
        setOrignalBlogs(blogData.blogs);
      } else {
        setLoading(false);
        toast.error(blogData.error.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }
  };

  const handleAddClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    getBlogData();
    setIsPopupOpen(false);
  };

  // search filter
  const handleFilter = (e) => {
    if (e.target.value === "") {
      setBlogs(orignalBlogs);
    } else {
      const filterResult = orignalBlogs.filter((item) => {
        const lowercaseValue = e.target.value.toLowerCase();
        return (
          (item.blogTitle &&
            item.blogTitle.toLowerCase().includes(lowercaseValue)) ||
          (item.author.name &&
            item.author.name.toLowerCase().includes(lowercaseValue))
        );
      });
      setBlogs(filterResult);
    }
    setFilterValues(e.target.value);
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="relative">
        <AddBlogButton onAddClick={handleAddClick} />
        <input
          type="text"
          id="Search"
          name="Search"
          placeholder="Type To Search"
          value={FilterValues}
          onChange={handleFilter}
          className="border border-gray-300 rounded px-4 py-2"
        />
        <BlogDataPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
        {loading ? (
          <h2 className="text-center text-purple-500 font-semibold py-2 px-4 rounded mx-auto pt-20">
            Loading Blog Data Please Wait...........
          </h2>
        ) : (
          <div className="container mx-auto pt-8 pb-16">
            <CardContainer
              edit={true}
              blogs={blogs}
              onClose={handleClosePopup}
            />
          </div>
        )}
      </div>
    </>
  );
}
