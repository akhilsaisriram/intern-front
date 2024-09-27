
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";

const BookTransactions = () => {
  const [bookName, setBookName] = useState("");
  const [bookNamea, setBookNamea] = useState("");
  const [userIdentifier, setUserIdentifier] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);
  const [bookOptions, setBookOptions] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://intern-backend-6hg5.onrender.com/transactions/books");
        setBookOptions(response.data.map(book => book.bookName));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const fetchBookStatus = async () => {
    try {
      const response = await axios.get(`https://intern-backend-6hg5.onrender.com/transactions/book/${bookName}`);
      setOutput(response.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.error || "Error fetching book status");
    }
  };

  const fetchTotalRent = async () => {
    try {
      const response = await axios.get(`https://intern-backend-6hg5.onrender.com/transactions/rent/${bookNamea}`);
      setOutput(response.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.error || "Error fetching total rent");
    }
  };

  const fetchUserBooks = async () => {
    try {
      const response = await axios.get(`https://intern-backend-6hg5.onrender.com/transactions/user/${userIdentifier}`);
      setOutput(response.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.error || "Error fetching user books");
    }
  };

  const fetchDateRangeBooks = async () => {
    try {
      const response = await axios.get(`https://intern-backend-6hg5.onrender.com/transactions/daterange/${startDate}/${endDate}`);
      setOutput(response.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.error || "Error fetching date range books");
    }
  };

  const renderOutput = () => {
    if (error) {
      return <p className="text-red-500">{error}</p>;
    }

    if (!output) return null;

    if (output.totalIssuedCount !== undefined) {
      // Book status response
      return (
        <div className="bg-white p-4 rounded shadow mt-4">
          <h3 className="font-bold">Book Status:</h3>
          <p><strong>Total Issued Count:</strong> {output.totalIssuedCount}</p>
          <p><strong>Current Status:</strong> {output.currentStatus.status}</p>
          <h4 className="font-bold">All Issuers:</h4>
          {output.allIssuers.map((issuer, index) => (
            <div key={index}>
              <p><strong>User ID:</strong> {issuer.userId}</p>
              <p><strong>Issue Date:</strong> {new Date(issuer.issueDate).toLocaleDateString()}</p>
              <hr></hr>
            </div>
          ))}
        </div>
      );
    }

    if (output.totalRent !== undefined) {
      // Total rent response
      return (
        <div className="bg-white p-4 rounded shadow mt-4">
          <h3 className="font-bold">Total Rent:</h3>
          <p><strong>Book Name:</strong> {output.bookName}</p>
          <p><strong>Total Rent:</strong> {output.totalRent}</p>
          <hr></hr>
        </div>
      );
    }

    if (output.booksIssued) {
      // User books response
      return (
        <div className="bg-white p-4 rounded shadow mt-4">
          <h3 className="font-bold">Books Issued to {output.user}:</h3>
          {output.booksIssued.length > 0 ? (
            output.booksIssued.map((book, index) => (
              <div key={index}>
                <p><strong>Book Name:</strong> {book.bookName}</p>
                <p><strong>Issue Date:</strong> {new Date(book.issueDate).toLocaleDateString()}</p>
                <p><strong>Return Date:</strong> {new Date(book.returnDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {book.status}</p>
                <hr></hr>
              </div>
            ))
          ) : (
            <p>No books issued.</p>
          )}
        </div>
      );
    }

    if (Array.isArray(output)) {
      // Date range response
      return (
        <div className="bg-white p-4 rounded shadow mt-4">
          <h3 className="font-bold">Books Issued in Date Range:</h3>
          {output.length > 0 ? (
            output.map((book, index) => (
              <div key={index}>
                <p><strong>Book Name:</strong> {book.bookName}</p>
                <p><strong>Issue Date:</strong> {new Date(book.issueDate).toLocaleDateString()}</p>
                <p><strong>User:</strong> {book.user}</p>
                <hr></hr>
              </div>
            ))
          ) : (
            <p>No books issued in this date range.</p>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Book Transactions</h1>

      <div className="mb-5">
        <h2 className="text-xl mb-2">Check Book Status</h2>
        <div className="flex">
          <Autocomplete
            sx={{ width: 400 }}
            options={bookOptions}
            value={bookName}
            onChange={(event, newValue) => {
              setBookName(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Select Book" variant="outlined" />}
          />
          <button onClick={fetchBookStatus} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
            Get Book Status
          </button>
        </div>
      </div>

      <div className="mb-5">
        <h2 className="text-xl mb-2">Get Total Rent</h2>
        <div className="flex">
          <Autocomplete
            sx={{ width: 400 }}
            options={bookOptions}
            value={bookNamea}
            onChange={(event, newValue) => {
              setBookNamea(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Select Book" variant="outlined" />}
          />
          <button onClick={fetchTotalRent} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
            Get Total Rent
          </button>
        </div>
      </div>

      <div className="mb-5">
        <h2 className="text-xl mb-2">Books Issued to User</h2>
        <input
          type="text"
          placeholder="Enter user ID or email"
          value={userIdentifier}
          onChange={(e) => setUserIdentifier(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button onClick={fetchUserBooks} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Get User Books
        </button>
      </div>

      <div className="mb-5">
        <h2 className="text-xl mb-2">Books Issued in Date Range</h2>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <button onClick={fetchDateRangeBooks} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Get Date Range Books
        </button>
      </div>

      {renderOutput()}
    </div>
  );
};

export default BookTransactions;
