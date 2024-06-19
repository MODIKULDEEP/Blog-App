export default function AddBlogButton({ onAddClick }) {
  return (
    <button
      onClick={onAddClick}
      className="float-right bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
    >
      Add New
    </button>
  );
}
