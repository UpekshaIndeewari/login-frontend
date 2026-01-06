// src/sections/ResetPassword.tsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/ResetPassword.css";

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setIsError(true);
      return;
    }

    try {
      await axios.post(`http://127.0.0.1:8000/auth/reset-password?token=${token}&new_password=${password}`);
      setMessage("Password has been reset successfully!");
      setIsError(false);

      // Optional: redirect to login after 2 seconds
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setMessage(err.response?.data?.detail || "Failed to reset password");
      setIsError(true);
    }
  };

  return (
    <div className="reset-container">
      <h1>Reset Password</h1>
      <p>Please enter your new password.</p>

      <form className="reset-form" onSubmit={handleResetPassword}>
        <div>
          <label>New Password:</label>
          <input type="password" name="password" placeholder="Enter new password" required />
        </div>

        <div>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" placeholder="Confirm new password" required />
        </div>

        <button type="submit">Reset Password</button>
      </form>

      {/* Alert message */}
      {message && (
        <p style={{ color: isError ? "red" : "green", marginTop: "10px", textAlign: "center" }}>
          {message}
        </p>
      )}

      <div className="reset-links">
        <p>
          Back to <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
