// src/sections/RegisterPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ for redirect
import "../style/RegisterPage.css";

const RegisterPage: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const firstName = formData.get("first_name")?.toString();
    const lastName = formData.get("last_name")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirm_password")?.toString();

    // Password match validation
    if (password !== confirmPassword) {
      setIsError(true);
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("https://login-backend-1-yrlz.onrender.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          confirm_password: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsError(false);
        form.reset();

        // ✅ Redirect to VerificationSent page
        navigate("/verify-email",{ state: { email } });
      } else {
        setIsError(true);
        setMessage(data.detail || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setIsError(true);
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>

      <form className="register-form" onSubmit={handleRegister}>
        <div>
          <label>First Name:</label>
          <input type="text" name="first_name" placeholder="Enter your first name" required />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="last_name" placeholder="Enter your last name" required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" placeholder="Enter your email" required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" placeholder="Enter your password" required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" name="confirm_password" placeholder="Confirm your password" required />
        </div>

        {/* Terms & Consent Checkboxes */}
        <div className="checkbox-horizontal">
          <input type="checkbox" required />
          <span>
            I agree to receive news, product updates, and event emails from Marble Imaging. I can withdraw my consent at any time.
          </span>
        </div>
        <div className="checkbox-horizontal">
          <input type="checkbox" required />
          <span>
            I agree to the{" "}
            <a href="https://www.marble-imaging.de/legal" target="_blank" rel="noopener noreferrer">
              Marble Imaging Terms and Conditions
            </a>.
          </span>
        </div>

        <button type="submit">Register</button>
      </form>

      {/* Error message (if any) */}
      {message && (
        <p style={{ marginTop: 10, color: isError ? "red" : "green" }}>{message}</p>
      )}
      <div className="register-links">
        <p>
          Already have an account? <a href="/login">Login here</a>.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
