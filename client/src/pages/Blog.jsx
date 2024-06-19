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
  console.log(id);

  useEffect(async () => {
    try {
      const data = await getBlog(id);
      if (data.success) {
        setBlog(data.blog);
      } else {
        toast.error(data.error.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }, []);

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <NavHeader />
      {blog ? (
        <div className="container mx-auto pt-20">
          <img
            class="rounded-t-lg"
            src={`${url}/api/image/${blog.blog_photo}`}
            alt={blog.blogTitle}
          />
          <div class="p-5">
            <a href="#">
              <h5 class="mb-3 text-2xl font-bold tracking-tight">
                {blog.blogTitle}
              </h5>
            </a>
            <p class="mb-3 font-normal font-semibold">
              Author: {blog.author.name}
            </p>
            <p class="mb-3 font-normal font-semibold">{blog.description}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}