// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/Home";
// import AboutPage from "./pages/About";
// import ProfilePage from "./pages/Profile";
// import SignInPage from "./pages/SignIn";
// import SignUpPage from "./pages/SignUp";
// import AnalyzePage from "./pages/Analyze";
// import "./style/index.css";

// function App() {
//   // Simpan status login di localStorage agar tidak hilang saat refresh
//   const [isLoggedIn, setIsLoggedIn] = useState(
//     localStorage.getItem("isLoggedIn") === "true",
//   );

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//     localStorage.setItem("isLoggedIn", "true");
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     localStorage.removeItem("isLoggedIn");
//     window.location.href = "/"; // Kembali ke Home setelah logout
//   };

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <HomePage isLoggedIn={isLoggedIn} onLogout={handleLogout} />
//             }
//           />
//           <Route
//             path="/about"
//             element={
//               <AboutPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />
//             }
//           />
//           <Route
//             path="/analyze"
//             element={
//               <AnalyzePage isLoggedIn={isLoggedIn} onLogout={handleLogout} />
//             }
//           />
//           <Route
//             path="/profile"
//             element={
//               <ProfilePage isLoggedIn={isLoggedIn} onLogout={handleLogout} />
//             }
//           />

//           {/* Halaman Auth */}
//           <Route
//             path="/signin"
//             element={<SignInPage onLogin={handleLogin} />}
//           />
//           <Route
//             path="/signup"
//             element={<SignUpPage onLogin={handleLogin} />}
//           />
//         </Routes>

//             {/* Halaman Utama (Home) */}
//         <Route path="/" element={<Home />} />

//         {/* Halaman Analisis */}
//         <Route path="/analyze" element={<AnalyzePage />} />

//       </div>

//     </Router>
//   );
// }

// export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import ProfilePage from "./pages/Profile";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import AnalyzePage from "./pages/Analyze";
import "./style/index.css";

// Jangan lupa import Navbar jika ingin muncul secara global
import Navbar from "./components/global/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };
  const handleLogin = (token) => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("token", token);
  };

  return (
    <Router>
      <div className="App">
        {/* Navbar diletakkan di luar Routes agar muncul di semua halaman */}
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

        <Routes>
          <Route
            path="/"
            element={
              <HomePage isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            }
          />
          <Route
            path="/about"
            element={
              <AboutPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            }
          />
          <Route
            path="/analyze"
            element={
              <AnalyzePage isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            }
          />
          <Route
            path="/profile"
            element={
              <ProfilePage isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            }
          />

          {/* Halaman Auth */}
          <Route
            path="/signin"
            element={<SignInPage onLogin={handleLogin} />}
          />
          <Route
            path="/signup"
            element={<SignUpPage onLogin={handleLogin} />}
          />
        </Routes>

        {/* --- BAGIAN DI BAWAH INI TADI SALAH DAN HARUS DIHAPUS --- */}
        {/* Tadi ada Route di luar Routes dan menggunakan nama <Home /> yang tidak di-import */}
      </div>
    </Router>
  );
}

export default App;
