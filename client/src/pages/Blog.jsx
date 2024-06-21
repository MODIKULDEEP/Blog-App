import { Link, useParams } from "react-router-dom";
import NavHeader from "../components/NavHeader";
import { getBlog } from "../api/blogApis";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const url = import.meta.env.VITE_BACKEND_APP_URI;

export default function BlogPage() {
  const [blog, setBlog] = useState();
  const { id } = useParams();

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
            <p className="mb-3 font-normal font-semibold">
              Author: {blog.author.name}
            </p>
            <p className="mb-3 font-normal font-semibold">{blog.description}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
