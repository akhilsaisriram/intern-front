import React, { useState } from "react";
import axios from "axios";

const FilterBooks = () => {
  const [category, setCategory] = useState("");
  const [term, setTerm] = useState("");
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (category && term && minRent && maxRent) {
      try {
        const response = await axios.get(`https://intern-backend-6hg5.onrender.com/bookserch/books/filter/${category}/${term}/${minRent}/${maxRent}`);
        console.log((response.data));
        
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Filter Books</h1>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="category" className="text-sm font-medium text-gray-700">
              Category:
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category"
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="term" className="text-sm font-medium text-gray-700">
              Search Term:
            </label>
            <input
              type="text"
              id="term"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Enter book name or term"
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="minRent" className="text-sm font-medium text-gray-700">
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
            <label htmlFor="maxRent" className="text-sm font-medium text-gray-700">
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
            onClick={handleSearch}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Search
          </button>
        </div>

        {/* Display search results */}
        {results.length > 0 && (
          <ul className="mt-6 bg-white border border-gray-300 rounded-md shadow-lg">
            {results.map((book) => (
              <li key={book._id} className="p-2 border-b hover:bg-indigo-100">
                <strong>Book Name:</strong> {book.bookName} <br />
                <strong>Category:</strong> {book.category} <br />
                <strong>Rent per Day:</strong> ${book.rentPerDay}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FilterBooks;
