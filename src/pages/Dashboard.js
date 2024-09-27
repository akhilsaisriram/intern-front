import React, { useState } from "react";
import axios from "axios";
import FilterBooks from "./FilterBooks";
import BookTransactions from "./BookTransactions";
const BookSearch = () => {
  const [term, setTerm] = useState("");
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [results, setResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null); // Store the selected book object

  // Search by book name
  const handleNameSearch = async (e) => {
    const value = e.target.value;
    setTerm(value);

    if (value.length > 0) {
      try {
        const response = await axios.get(
          `https://intern-backend-6hg5.onrender.com/bookserch/books/search/${value}`
        );
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    } else {
      setResults([]); // Clear results if input is empty
    }
  };

  // Search by rent range
  const handleRentSearch = async () => {
    if (minRent && maxRent) {
      try {
        const response = await axios.get(
          `https://intern-backend-6hg5.onrender.com/bookserch/books/rent-range/${minRent}/${maxRent}`
        );
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching books by rent:", error);
      }
    }
  };

  const handleSelect = (book) => {
    setSelectedBook(book); // Store the selected book object
    setResults([]); // Clear the results after selection
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/2  bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Search Books</h1>

        {/* Search by book name */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-center mb-4">
            Search by Book Name
          </h2>
          <div className="relative">
            <input
              type="text"
              value={term}
              onChange={handleNameSearch}
              placeholder="Search for books..."
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {results.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                {results.map((book) => (
                  <li
                    key={book._id}
                    onClick={() => handleSelect(book)} // Pass the entire book object to the handleSelect function
                    className="p-2 cursor-pointer hover:bg-indigo-100"
                  >
                    {book.bookName}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Search by rent range */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-center mb-4">
            Search by Rent Range
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="minRent"
                className="text-sm font-medium text-gray-700"
              >
                Minimum Rent:
              </label>
              <input
                type="number"
                id="minRent"
                value={minRent}
                onChange={(e) => setMinRent(e.target.value)}
                placeholder="Enter minimum rent"
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="maxRent"
                className="text-sm font-medium text-gray-700"
              >
                Maximum Rent:
              </label>
              <input
                type="number"
                id="maxRent"
                value={maxRent}
                onChange={(e) => setMaxRent(e.target.value)}
                placeholder="Enter maximum rent"
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              onClick={handleRentSearch}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Search by Rent Range
            </button>
          </div>
        </div>

        {/* Display the selected book details */}
        {selectedBook && (
          <div className="mt-4 text-center text-gray-700">
            <p>
              <strong>Selected Book:</strong> {selectedBook.bookName}
            </p>
            <p>
              <strong>Category:</strong> {selectedBook.category}
            </p>
            <p>
              <strong>Rent per Day:</strong> ${selectedBook.rentPerDay}
            </p>
          </div>
        )}
      </div>
      <div className="flex w-full">
        <FilterBooks></FilterBooks>
      </div>
      <div className="flex w-full">
        <BookTransactions></BookTransactions>
      </div>
    </div>
  );
};

export default BookSearch;
