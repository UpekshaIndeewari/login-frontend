// src/sections/FogotPassword.tsx
import React, { useState } from "react";
import "../style/ForgotPassword.css";
import axios from "axios";

const ForgotPasswordPage: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(""); // clear previous message

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    try {
      // const response = await axios.post(`http://127.0.0.1:8000/auth/forgot-password?email=${email}`);
      const response = await axios.post(`https://login-backend-1-yrlz.onrender.com/auth/forgot-password?email=${email}`);
      setMessage(response.data.message || "Reset link sent!");
      setIsError(false);
    } catch (err: any) {
      setMessage(err.response?.data?.detail || "Something went wrong");
      setIsError(true);
    }
  };

  return (
    <div className="forgot-container">
      <h1>Forgot Password</h1>
      <p>Please enter your email address to reset your password.</p>

      <form className="forgot-form" onSubmit={handleForgotPassword}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" placeholder="Enter your email" required />
        </div>

        <button type="submit">Send Reset Link</button>
      </form>

      {/* Alert message */}
      {message && (
        <p style={{ color: isError ? "red" : "green", marginTop: "10px", textAlign: "center" }}>
          {message}
        </p>
      )}

      <div className="forgot-links">
        <p>
          Remembered your password? <a href="/login">Back to Login</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;


