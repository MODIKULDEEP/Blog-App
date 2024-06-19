import { useState } from "react";
import { creteBlog } from "../api/blogApis";

export default function BlogDataPopup({ isOpen, onClose }) {
  const [blogTitle, setBlogTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();
    if (!blogTitle || !description || !image) {
      alert("Please Fill All Data");
      return;
    }

    const formData = new FormData();
    formData.append("blogTitle", blogTitle);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const data = await creteBlog(formData);
      // Clear form fields after saving
      setBlogTitle("");
      setDescription("");
      setImage(null); // Reset image to null
      onClose(); // Close the popup
    } catch (error) {
      // Handle error
    }
  };

  const handleCancel = () => {
    // Clear form fields
    setBlogTitle("");
    setDescription("");
    setImage(null); // Reset image to null
    onClose(); // Close the popup
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <form
        encType="multipart/form-data"
        onSubmit={handleSave}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>
        <div className="mb-4">
          <label htmlFor="blogTitle" className="block mb-1">
            Blog Title:
          </label>
          <input
            type="text"
            id="blogTitle"
            value={blogTitle}
            required
            onChange={(e) => setBlogTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-1">
            Blog Description:
          </label>
          <textarea
            id="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 resize-none"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block mb-1">
            Blog Image:
          </label>
          <input
            type="file"
            required
            id="image"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            className="border border-gray-300 rounded px-4 py-2"
          />
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
  );
}
