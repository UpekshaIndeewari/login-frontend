// src/sections/VerifyEmail.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";


const VerificationSent: React.FC = () => {
  const location = useLocation();
  const email = (location.state as { email?: string })?.email || "your email";

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Verification Email Sent</h2>
      <p>
        We have sent a verification email to <strong>{email}</strong>.<br />
        Please check your inbox and click the link to verify your account.
      </p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};


export default VerificationSent;


