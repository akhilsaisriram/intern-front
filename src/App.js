import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import All from "./pages/All";
import Dashboard from "./pages/Dashboard";
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-indigo-600 p-4 text-white text-center">
          <Link to="/" className="mx-4 hover:underline">Home</Link>
          <Link to="/all" className="mx-4 hover:underline">All USERS and BOOKS</Link>
          <Link to="/dashbord" className="mx-4 hover:underline">Dashboard</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all" element={<All />} />
          <Route path="/dashbord" element={<Dashboard />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
