/*import React from "react";
import Button from "../Button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-10 py-5 bg-white border-b border-gray-100">
      <div className="text-[#004E98] font-bold text-2xl tracking-tight">
        DermaVisio
      </div>

      <div className="flex gap-8 text-gray-600 font-medium">
        <a href="#" className="text-[#004E98] border-b-2 border-[#004E98]">
          Home
        </a>
        <a href="#" className="hover:text-[#004E98]">
          Analyze
        </a>
        <a href="#" className="hover:text-[#004E98]">
          About
        </a>
      </div>

      <div className="flex items-center gap-4">
        <Button className="px-5 py-2">Sign In</Button>
        <Link
          to="/profile"
          className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
        >
          <span className="text-gray-600">👤</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;*/

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../Button";
import AuthModal from "../AuthModal";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const isProfilePage = location.pathname === "/profile";
  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/signup";

  // Fungsi pengecekan akses
  const handleProtectedClick = (e, targetPath) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowAuthModal(true);
    } else {
      navigate(targetPath);
    }
  };

  // Helper untuk class menu aktif
  const getMenuClass = (path) => {
    const base = "hover:text-[#004E98] transition-colors pb-1 ";
    const active = "text-[#004E98] border-b-2 border-[#004E98] font-bold";
    return location.pathname === path ? base + active : base;
  };

  return (
    <>
      <nav className="flex items-center justify-between px-10 py-5 bg-white border-b border-gray-100">
        {/* Logo */}
        {isAuthPage ? (
          <div className="text-[#004E98] font-bold text-2xl tracking-tight cursor-default">
            DermaVisio
          </div>
        ) : (
          <Link
            to="/"
            className="text-[#004E98] font-bold text-2xl tracking-tight"
          >
            DermaVisio
          </Link>
        )}

        {/* Menu Navigasi Tengah */}
        {!isProfilePage && !isAuthPage && (
          <div className="flex gap-8 text-gray-600 font-medium">
            <Link to="/" className={getMenuClass("/")}>
              Home
            </Link>

            {/* Gunakan onClick untuk proteksi */}
            <button
              onClick={(e) => handleProtectedClick(e, "/analyze")}
              className={getMenuClass("/analyze")}
            >
              Analyze
            </button>

            <button
              onClick={(e) => handleProtectedClick(e, "/about")}
              className={getMenuClass("/about")}
            >
              About
            </button>
          </div>
        )}

        <div className="flex items-center gap-4">
          {!isAuthPage &&
            (isLoggedIn ? (
              <Button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 px-5 py-2"
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/signin")}
                className="bg-[#004E98] px-5 py-2"
              >
                Sign In
              </Button>
            ))}

          {/* Ikon Profil */}
          <button
            onClick={(e) => handleProtectedClick(e, "/profile")}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              location.pathname === "/profile"
                ? "ring-2 ring-[#004E98] bg-blue-50"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            <span className="text-gray-600">👤</span>
          </button>
        </div>
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Navbar;
