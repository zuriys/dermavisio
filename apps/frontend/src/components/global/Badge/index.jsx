import React from 'react';

const Badge = ({ children }) => {
  return (
    <span className="inline-flex items-center gap-2 bg-[#E8F1FF] text-[#004E98] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
      <span className="w-2 h-2 bg-[#004E98] rounded-full"></span>
      {children}
    </span>
  );
};

export default Badge;