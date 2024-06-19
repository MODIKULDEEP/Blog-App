export default function Pagination({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4" aria-label="Pagination">
      <ul className="flex justify-center">
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm font-semibold leading-tight border border-gray-300 bg-white text-gray-800 hover:bg-gray-100"
          >
            Previous
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-1 text-sm font-semibold leading-tight border border-gray-300 text-gray-800 hover:bg-gray-100 ${
                currentPage === number
                  ? "bg-purple-500 hover:bg-purple-600 text-white font-semibold"
                  : ""
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm font-semibold leading-tight border border-gray-300 bg-white text-gray-800 hover:bg-gray-100"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
