import axios from "axios";
const url = import.meta.env.VITE_BACKEND_APP_URI;

const formDataconfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
};

const jsonconfig = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

// Create a new blog post
export const creteBlog = async (blogData) => {
  try {
    const { data } = await axios.post(
      `${url}/api/posts`,
      blogData,
      formDataconfig
    );
    return data;
  } catch (error) {
    return { success: false, error: error.response };
  }
};

// update Blog API
export const updateBlog = async (blogData) => {
  const id = blogData.id;
  try {
    const { data } = await axios.put(
      `${url}/api/posts/${id}`,
      blogData,
      jsonconfig
    );
    return data;
  } catch (error) {
    return { success: false, error: error.response };
  }
};

// Retrieve all blog posts
export const getAllBlogs = async () => {
  try {
    const { data } = await axios.get(`${url}/api/posts`, jsonconfig);
    return data;
  } catch (error) {
    return { success: false, error: error.response };
  }
};

//  Get Specific Blog Post
export const getBlog = async (id) => {
  try {
    const { data } = await axios.get(`${url}/api/posts/${id}`, jsonconfig);
    return data;
  } catch (error) {
    return { success: false, error: error.response };
  }
};

// delete Blog Api
export const deleteBlog = async (blogID) => {
  try {
    const { data } = await axios.delete(
      `${url}/api/posts/${blogID}`,
      jsonconfig
    );
    return data;
  } catch (error) {
    return { success: false, error: error.response };
  }
};
