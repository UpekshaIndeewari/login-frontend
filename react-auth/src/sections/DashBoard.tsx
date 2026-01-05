// src/sections/DashBoard.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashBoard: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const storedName = localStorage.getItem("userName"); // store user's first name on login

    if (!isLoggedIn) {
      navigate("/login");
    } else if (storedName) {
      setUserName(storedName);
    }
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.clear(); // clear all stored data
    navigate("/login"); // redirect to login page
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Welcome to your Dashboard!</h1>
      <p>You are now logged in, <strong>{userName || "User"}</strong>.</p>

      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          backgroundColor: "#f44336",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default DashBoard;
