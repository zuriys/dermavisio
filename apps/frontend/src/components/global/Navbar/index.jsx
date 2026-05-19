// import React from 'react';
// import Button from '../Button';

// const Navbar = () => {
//   return (
//     <nav className="flex items-center justify-between px-10 py-5 bg-white border-b border-gray-100">
//       <div className="text-[#004E98] font-bold text-2xl tracking-tight">
//         DermaVisio
//       </div>
      
//       <div className="flex gap-8 text-gray-600 font-medium">
//         <a href="#" className="text-[#004E98] border-b-2 border-[#004E98]">Home</a>
//         <a href="#" className="hover:text-[#004E98]">Analyze</a>
//         <a href="#" className="hover:text-[#004E98]">About</a>
//       </div>

//       <div className="flex items-center gap-4">
//         <Button className="px-5 py-2">Sign In</Button>
//         <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
//           <span className="text-gray-600">👤</span>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Tambahkan ini
import Button from '../Button';

const Navbar = () => {
  // Helper class untuk NavLink agar tidak mengulang kode yang sama
  const navLinkStyles = ({ isActive }) => 
    isActive 
      ? "text-[#004E98] border-b-2 border-[#004E98] pb-1 font-bold" 
      : "text-gray-600 hover:text-[#004E98] border-b-2 border-transparent pb-1 transition-all";

  return (
    <nav className="flex items-center justify-between px-10 py-5 bg-white border-b border-gray-100">
      {/* Logo klikable menuju Home */}
      <Link to="/" className="text-[#004E98] font-bold text-2xl tracking-tight">
        DermaVisio
      </Link>
      
      <div className="flex gap-8 font-medium">
        {/* Menggunakan NavLink untuk deteksi halaman aktif */}
        <NavLink to="/" className={navLinkStyles}>
          Home
        </NavLink>
        
        <NavLink to="/analyze" className={navLinkStyles}>
          Analyze
        </NavLink>
        
        {/* Menu About (jika belum ada pagenya, sementara ke # atau buat route baru) */}
        <NavLink to="/about" className={navLinkStyles}>
          About
        </NavLink>
      </div>

      <div className="flex items-center gap-4">
        <Button className="px-5 py-2">Sign In</Button>
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer overflow-hidden border border-gray-100">
          {/* Anda bisa mengganti ini dengan ikon dari Lucide nanti */}
          <span className="text-xl">👤</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;