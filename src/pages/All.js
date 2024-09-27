
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const All = () => {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedDates, setSelectedDates] = useState({}); // State to track date input for each transaction
const na=useNavigate()
  useEffect(() => {
    fetch("https://intern-backend-6hg5.onrender.com/transactions/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));


  }, []);
  useEffect(() => {
    // Check if email is present in sessionStorage
    const email = sessionStorage.getItem("email");
    
    if (!email || email === "") {
      na("/"); 
      alert("submit deatils to see ")
      // Navigate to home page if email is not present
    }
  }, [na]);
  useEffect(() => {
    fetch("https://intern-backend-6hg5.onrender.com/transactions/books")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  // Handle book issue
  const handleIssue = async (bookName, userIdentifier) => {
    console.log(bookName);
    
    try {
      const issueDate =
        selectedDates[bookName] || new Date().toISOString().split("T")[0]; // Get selected date or default to today
        console.log(bookName,userIdentifier,issueDate);
        
      const response = await axios.post(
        `https://intern-backend-6hg5.onrender.com/transactions/issue/${bookName}/${userIdentifier}/${issueDate}`
      );
      alert(response.data.message); // Success alert
    } catch (error) {
      console.error("Error issuing book:", error);
      alert("Error issuing book");
    }
  };

  // Handle book return
  const handleReturn = async (bookName, userIdentifier) => {
    try {
      const returnDate =
        selectedDates[bookName] || new Date().toISOString().split("T")[0]; // Get selected date or default to today
      const response = await axios.post(
        `https://intern-backend-6hg5.onrender.com/transactions/return/${bookName}/${userIdentifier}/${returnDate}`
      );
      alert(response.data.message); // Success alert
    } catch (error) {
      console.error("Error returning book:", error);
      alert("Error returning book");
    }
  };

  // Handle date change for a specific book
  const handleDateChange = (bookName, date) => {
    setSelectedDates((prevDates) => ({
      ...prevDates,
      [bookName]: date,
    }));
  };

  return (
    <div>
      <div className="flex justify-center py-10">
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl font-bold mb-6 text-center">Users List</h1>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {users.map((user) => (
                <li key={user.id} className="px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">
                        Joined: {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-center py-10">
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Book Transactions
          </h1>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <li key={transaction.id} className="px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold">
                        {transaction.bookName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Category: {transaction.category}
                      </p>
                      <p className="text-sm text-gray-400">
                        Rent per Day: {transaction.rentPerDay}
                      </p>
                    </div>
                    <div>
                      <input
                        type="date"
                        value={selectedDates[transaction.bookName] || ""}
                        onChange={(e) =>
                          handleDateChange(transaction.bookName, e.target.value)
                        }
                        className="p-1 border border-gray-300 rounded"
                      />
                      <button
                        onClick={() =>
                          handleIssue(transaction.bookName, sessionStorage.getItem("email"))
                        }
                        className="ml-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Issue
                      </button>
                      <button
                        onClick={() =>
                          handleReturn(transaction.bookName, sessionStorage.getItem("email"))
                        }
                        className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Return
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default All;
