import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-[#004E98] text-white hover:bg-[#003B73]',
    outline: 'bg-white text-[#004E98] border border-[#004E98] hover:bg-gray-50',
    white: 'bg-white text-[#004E98] hover:bg-gray-100',
  };

  return (
    <button
      className={`px-6 py-3 rounded-md font-semibold transition-all flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;