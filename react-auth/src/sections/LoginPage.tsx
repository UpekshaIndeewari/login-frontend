// src/sections/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for redirect
import axios from "axios";
import "../style/LoginPage.css";

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/login", { email, password });
      // const response = await axios.post("https://login-backend-1-yrlz.onrender.com/auth/login", { email, password });

      if (response.data.success) {
        // Optional: store user info or token in localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", response.data.first_name); 

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="left-box">
        <h2>Info / Ads / Image</h2>
      </div>
      <div className="right-box">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input type="email" name="email" placeholder="Enter your email" required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" placeholder="Enter your password" required />
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <div className="login-links">
          <p>
            Don't have an account yet? <a href="/register">Register here</a>.
          </p>
          <p>
            Forgot your password? <a href="/forgotpw">Click here to reset it</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
