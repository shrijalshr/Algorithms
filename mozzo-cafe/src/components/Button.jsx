import React from 'react';
import { motion as Motion } from 'framer-motion';

const Button = ({ children, onClick, className = "", type = "button", variant = "primary", disabled = false }) => {
  const baseStyle = "px-6 py-2 rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";
  const variants = {
    primary: "bg-[#4A3B32] text-white hover:bg-[#2E211A] focus:ring-[#4A3B32]",
    secondary: "bg-[#C8A97E] text-[#2E211A] hover:bg-[#B09269] focus:ring-[#C8A97E]",
    outline: "border-2 border-[#4A3B32] text-[#4A3B32] hover:bg-[#4A3B32] hover:text-white focus:ring-[#4A3B32]"
  };

  if (disabled) {
    return (
      <button
        type={type}
        disabled
        className={`${baseStyle} ${variants[variant]} ${className} opacity-50 cursor-not-allowed`}
      >
        {children}
      </button>
    )
  }

  return (
    <Motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </Motion.button>
  );
};

export default Button;
