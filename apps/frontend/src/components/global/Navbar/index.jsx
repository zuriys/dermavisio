import React from 'react';
import Button from '../Button';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-10 py-5 bg-white border-b border-gray-100">
      <div className="text-[#004E98] font-bold text-2xl tracking-tight">
        DermaVisio
      </div>
      
      <div className="flex gap-8 text-gray-600 font-medium">
        <a href="#" className="text-[#004E98] border-b-2 border-[#004E98]">Home</a>
        <a href="#" className="hover:text-[#004E98]">Analyze</a>
        <a href="#" className="hover:text-[#004E98]">About</a>
      </div>

      <div className="flex items-center gap-4">
        <Button className="px-5 py-2">Sign In</Button>
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-600">👤</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;