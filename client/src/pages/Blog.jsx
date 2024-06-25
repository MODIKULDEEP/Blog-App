import { useParams } from "react-router-dom";
import NavHeader from "../components/NavHeader";
import { getBlog } from "../api/blogApis";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_BACKEND_APP_URI;

export default function BlogPage() {
  const [blog, setBlog] = useState();
  const { id } = useParams();

  const Navigate = useNavigate();
  const data = useSelector((state) => state.User);
  useEffect(() => {
    if (data.user === null) {
      Navigate("/");
    }
  }, [data]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBlog(id);
        if (data.success) {
          setBlog(data.blog);
        } else {
          toast.error(data.error.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchData();
  }, []);

  // Function to convert ISO date to IST
  const convertToIST = (isoDate) => {
    // Parse the ISO date
    const date = new Date(isoDate);

    // Options for formatting the date
    const options = {
      timeZone: "Asia/Kolkata", // IST time zone
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    // Format the date to IST
    const formattedDate = date.toLocaleString("en-IN", options);
    return formattedDate;
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <NavHeader />
      {blog ? (
        <div className="container mx-auto pt-20">
          <img
            className="rounded-t-lg"
            src={`${url}/api/image/${blog.blog_photo}`}
            alt={blog.blogTitle}
          />
          <div className="p-5">
            <a href="#">
              <h5 className="mb-3 text-2xl font-bold tracking-tight">
                {blog.blogTitle}
              </h5>
            </a>
            <p className="mb-3 font-normal">Author: {blog.author.name}</p>
            <p className="mb-3 font-normal">
              Publish Date: {convertToIST(blog.createdAt)}
            </p>
            <p className="mb-3 font-semibold">{blog.description}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
