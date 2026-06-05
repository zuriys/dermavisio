// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Button from "../Button";
// import AuthModal from "../AuthModal";

// const Navbar = ({ isLoggedIn, onLogout }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   const isHomePage = location.pathname === "/";

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleProtectedClick = (e, targetPath) => {
//     if (!isLoggedIn) {
//       e.preventDefault();
//       setShowAuthModal(true);
//     } else {
//       navigate(targetPath);
//     }
//   };

//   // HELPER STYLE: Menyamakan ukuran teks agar tidak ada yang gede sendiri
//   const getMenuClass = (path) => {
//     const base = "transition-all duration-300 text-sm font-bold  tracking-widest pb-1 ";
    
//     // Tentukan warna teks: 
//     // Jika di Home & belum scroll -> Putih
//     // Jika sudah scroll ATAU di halaman lain -> Slate-800 (Gelap)
//     const colorClass = (isHomePage && !isScrolled) ? "text-white" : "text-slate-800";
    
//     // Indikator Aktif: Garis bawah biru
//     const activeClass = location.pathname === path ? " border-b-2 border-blue-500" : " border-b-2 border-transparent opacity-70 hover:opacity-100";
    
//     return base + colorClass + activeClass;
//   };

//   return (
//     <>
//       <nav
//         className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
//           isHomePage 
//             ? (isScrolled ? "bg-white shadow-md py-4" : "bg-transparent py-6") 
//             : "bg-white border-b border-slate-100 py-4" // Selalu putih jika bukan di Home
//         }`}
//       >
//         <div className="max-w-[1440px] mx-auto px-8 lg:px-20 flex items-center justify-between">
          
//           {/* LOGO */}
//           <Link
//             to="/"
//             className={`font-black text-2xl tracking-tighter transition-colors duration-300 ${
//               isHomePage && !isScrolled ? "text-white" : "text-[#004E98]"
//             }`}
//           >
//             DermaVisio
//           </Link>

//           {/* MENU (UKURAN SAMA SEMUA) */}
//           <div className="hidden md:flex gap-10">
//             <Link to="/" className={getMenuClass("/")}>Home</Link>
//             <button onClick={(e) => handleProtectedClick(e, "/analyze")} className={getMenuClass("/analyze")}>Analyze</button>
//             <button onClick={(e) => handleProtectedClick(e, "/about")} className={getMenuClass("/about")}>About</button>
//           </div>

//           {/* Tombol Kanan */}
//           <div className="flex items-center gap-6">
//             {isLoggedIn ? (
//               <button 
//                 onClick={onLogout} 
//                 className={`text-xs font-bold uppercase tracking-wider transition-colors ${
//                   isHomePage && !isScrolled ? "text-white/80 hover:text-white" : "text-red-600 hover:text-red-700"
//                 }`}
//               >
//                 Logout
//               </button>
//             ) : (
//               <button
//                 onClick={() => navigate("/signin")}
//                 className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
//                   isHomePage && !isScrolled 
//                     ? "bg-white text-[#004E98] hover:bg-blue-50" 
//                     : "bg-[#004E98] text-white hover:bg-blue-800"
//                 }`}
//               >
//                 Sign In
//               </button>
//             )}

//             {/* Avatar Profil */}
//             <button
//               onClick={(e) => handleProtectedClick(e, "/profile")}
//               className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border ${
//                 isHomePage && !isScrolled 
//                   ? "bg-white/10 border-white/20 text-white" 
//                   : "bg-slate-100 border-slate-200 text-slate-600"
//               }`}
//             >
//               👤
//             </button>
//           </div>
//         </div>
//       </nav>

//       <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
//     </>
//   );
// };

// export default Navbar;






import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react"; // Import ikon pendukung
import Button from "../Button";
import AuthModal from "../AuthModal";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State untuk menu HP

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menutup menu mobile setiap kali pindah halaman
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleProtectedClick = (e, targetPath) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowAuthModal(true);
    } else {
      navigate(targetPath);
    }
  };

  const getMenuClass = (path) => {
    const base = "transition-all duration-300 text-sm font-bold tracking-wider pb-1 ";
    const colorClass = (isHomePage && !isScrolled) ? "text-white" : "text-slate-800";
    const activeClass = location.pathname === path ? " border-b-2 border-blue-500" : " border-b-2 border-transparent opacity-70 hover:opacity-100";
    return base + colorClass + activeClass;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          isHomePage 
            ? (isScrolled ? "bg-white shadow-md py-4" : "bg-transparent py-6") 
            : "bg-white border-b border-slate-100 py-4"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20 flex items-center justify-between">
          
          {/* LOGO */}
          <Link
            to="/"
            className={`font-black text-2xl tracking-tighter transition-colors duration-300 ${
              isHomePage && !isScrolled ? "text-white" : "text-[#004E98]"
            }`}
          >
            DermaVisio
          </Link>

          {/* MENU DESKTOP (Tersembunyi di Mobile) */}
          <div className="hidden md:flex gap-10">
            <Link to="/" className={getMenuClass("/")}>Home</Link>
            <button onClick={(e) => handleProtectedClick(e, "/analyze")} className={getMenuClass("/analyze")}>Analyze</button>
            <button onClick={(e) => handleProtectedClick(e, "/about")} className={getMenuClass("/about")}>About</button>
          </div>

          {/* ACTIONS (Desktop & Mobile) */}
          <div className="flex items-center gap-3 md:gap-6">
            {/* Tombol Sign In / Logout - Sembunyikan di Mobile yang sangat kecil jika perlu */}
            <div className="hidden sm:block">
              {isLoggedIn ? (
                <button 
                  onClick={onLogout} 
                  className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                    isHomePage && !isScrolled ? "text-white/80 hover:text-white" : "text-red-600"
                  }`}
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => navigate("/signin")}
                  className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                    isHomePage && !isScrolled 
                      ? "bg-white text-[#004E98] hover:bg-blue-50" 
                      : "bg-[#004E98] text-white"
                  }`}
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Avatar Profil (Desktop) */}
            <button
              onClick={(e) => handleProtectedClick(e, "/profile")}
              className={`hidden sm:flex w-10 h-10 rounded-full items-center justify-center transition-all border ${
                isHomePage && !isScrolled 
                  ? "bg-white/10 border-white/20 text-white" 
                  : "bg-slate-100 border-slate-200 text-slate-600"
              }`}
            >
              <User size={20} />
            </button>

            {/* TOMBOL HAMBURGER (Hanya muncul di Mobile) */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-xl transition-colors ${
                isHomePage && !isScrolled ? "text-white hover:bg-white/10" : "text-slate-800 hover:bg-slate-100"
              }`}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* --- MOBILE MENU OVERLAY --- */}
        <div className={`fixed inset-0 top-[72px] bg-white z-[90] md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        }`}>
          <div className="flex flex-col p-6 gap-6 h-full bg-white">
            <Link to="/" className="text-2xl font-bold text-slate-800 border-b border-slate-50 pb-4">Home</Link>
            <button onClick={(e) => handleProtectedClick(e, "/analyze")} className="text-left text-2xl font-bold text-slate-800 border-b border-slate-50 pb-4">Analyze</button>
            <button onClick={(e) => handleProtectedClick(e, "/about")} className="text-left text-2xl font-bold text-slate-800 border-b border-slate-50 pb-4">About</button>
            <button onClick={(e) => handleProtectedClick(e, "/profile")} className="text-left text-2xl font-bold text-slate-800 border-b border-slate-50 pb-4">Profile</button>
            
            <div className="mt-auto pb-10">
              {isLoggedIn ? (
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-red-50 text-red-600 rounded-2xl font-bold"
                >
                  <LogOut size={20} /> Logout Account
                </button>
              ) : (
                <button 
                  onClick={() => navigate("/signin")}
                  className="w-full py-4 bg-[#004E98] text-white rounded-2xl font-bold text-center"
                >
                  Sign In to DermaVisio
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};

export default Navbar;