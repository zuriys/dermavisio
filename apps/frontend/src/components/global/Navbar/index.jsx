import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../Button";
import AuthModal from "../AuthModal";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Cek apakah user sedang berada di halaman tertentu
  const isProfilePage = location.pathname === "/profile";
  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";

  /**
   * Fungsi untuk memproteksi halaman Analyze, About, dan Profile.
   * Jika belum login, tampilkan modal peringatan.
   */
  const handleProtectedClick = (targetPath) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
    } else {
      navigate(targetPath);
    }
  };

  /**
   * Helper untuk memberikan styling pada menu yang aktif (Active Link)
   */
  const getMenuClass = (path) => {
    const base = "transition-all pb-1 cursor-pointer ";
    const active = "text-[#004E98] border-b-2 border-[#004E98] font-bold";
    const inactive = "text-gray-600 hover:text-[#004E98] border-b-2 border-transparent";
    
    return location.pathname === path ? base + active : base + inactive;
  };

  return (
    <>
      <nav className="flex items-center justify-between px-10 py-5 bg-white border-b border-gray-100">
        {/* LOGO: Klikable menuju Home, kecuali saat di halaman Auth */}
        {isAuthPage ? (
          <div className="text-[#004E98] font-bold text-2xl tracking-tight cursor-default">
            DermaVisio
          </div>
        ) : (
          <Link to="/" className="text-[#004E98] font-bold text-2xl tracking-tight">
            DermaVisio
          </Link>
        )}

        {/* MENU TENGAH: Disembunyikan jika di halaman Profile atau Auth */}
        {!isProfilePage && !isAuthPage && (
          <div className="flex gap-8 font-medium">
            <Link to="/" className={getMenuClass("/")}>
              Home
            </Link>

            {/* Menu Analyze & About diproteksi login */}
            <button
              onClick={() => handleProtectedClick("/analyze")}
              className={getMenuClass("/analyze")}
            >
              Analyze
            </button>

            <button
              onClick={() => handleProtectedClick("/about")}
              className={getMenuClass("/about")}
            >
              About
            </button>
          </div>
        )}

        {/* BAGIAN KANAN: Login/Logout & Profil */}
        <div className="flex items-center gap-4">
          {!isAuthPage && (
            isLoggedIn ? (
              <Button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 px-5 py-2 text-white rounded-lg transition-colors"
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/signin")}
                className="bg-[#004E98] hover:bg-blue-800 px-5 py-2 text-white rounded-lg transition-colors"
              >
                Sign In
              </Button>
            )
          )}

          {/* IKON PROFIL: Diproteksi login */}
          <button
            onClick={() => handleProtectedClick("/profile")}
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

      {/* Modal yang muncul jika user belum login tapi mencoba akses menu proteksi */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Navbar;