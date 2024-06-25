import NavHeader from "../components/NavHeader";
import CardContainer from "../components/cardContainer";
import { getAllBlogs } from "../api/blogApis";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [orignalBlogs, setOrignalBlogs] = useState([]);
  const [FilterValues, setFilterValues] = useState(null);
  const [loading, setLoading] = useState(true);

  const Navigate = useNavigate();
  const data = useSelector((state) => state.User);
  useEffect(() => {
    if (data.user === null) {
      Navigate("/");
    }
  }, [data]);

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
          (item.description &&
            item.description.toLowerCase().includes(lowercaseValue))
        );
      });
      setBlogs(filterResult);
    }
    setFilterValues(e.target.value);
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <NavHeader />
      {loading ? (
        <h2 className="text-center text-purple-500 font-semibold py-2 px-4 rounded mx-auto pt-20">
          Loading Blog Data Please Wait...........
        </h2>
      ) : (
        <>
          <div className="container mx-auto pt-20">
            <input
              type="text"
              id="Search"
              name="Search"
              placeholder="Type To Search"
              value={FilterValues}
              onChange={handleFilter}
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div className="container mx-auto pt-8 pb-16">
            <CardContainer edit={false} blogs={blogs} />
          </div>
        </>
      )}
    </>
  );
}
