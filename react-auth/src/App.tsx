// src/App.tsx
import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate}from "react-router-dom";
import LoginPage from "./sections/LoginPage";
import RegisterPage from "./sections/RegisterPage";
import ForgotPassword from "./sections/ForgotPassword";
import ResetPassword from "./sections/ResetPassword";
import VerifyEmail from "./sections/VerifyEmail";
import LinkExpired from "./sections/LinkExpired";
import DashBoard from "./sections/DashBoard";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login"element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path="/forgotpw" element={<ForgotPassword />} />
        <Route path="/resetpw" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/link-expired" element={<LinkExpired />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </Router> 
  );
};

export default App;
