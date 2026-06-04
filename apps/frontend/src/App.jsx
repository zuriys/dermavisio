import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import ProfilePage from "./pages/Profile";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import AnalyzePage from "./pages/Analyze";
import Navbar from "./components/global/Navbar";
import "./style/index.css";

// 1. Buat komponen pendukung agar kita bisa pakai useLocation()
function AppContent() {
  const location = useLocation();
  
  // Cek apakah user sedang di Homepage atau bukan
  const isHomePage = location.pathname === "/";

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("token", token);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* Navbar diletakkan di luar agar muncul di semua halaman */}
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      {/* 
        LOGIKA PENTING DI SINI:
        - Jika di Home (isHomePage), pt-0 (tanpa jarak) agar Navbar menimpa Hero biru.
        - Jika di halaman lain (Profile, Analyze, dll), pt-24 agar konten tidak tertutup Navbar fixed.
      */}
      <main className={`w-full flex-grow ${location.pathname === "/" ? "pt-0" : "pt-20"}`}>
        <Routes>
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
          <Route path="/about" element={<AboutPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
          <Route path="/analyze" element={<AnalyzePage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
          <Route path="/profile" element={<ProfilePage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
          <Route path="/signin" element={<SignInPage onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUpPage onLogin={handleLogin} />} />
        </Routes>
      </main>
    </div>
  );
}

// 2. Komponen utama App hanya membungkus dengan Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;