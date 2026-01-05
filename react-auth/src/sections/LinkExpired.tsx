// src/sections/LinkExpired.tsx
import React from "react";

const LinkExpired: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Verification Link Expired</h1>
      <p>
        Your verification link has expired. Please contact the team to resend the link.
      </p>
      <p>
        Email: <a href="mailto:support@example.com">support@example.com</a>
      </p>
    </div>
  );
};

export default LinkExpired;
