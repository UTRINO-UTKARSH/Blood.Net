import React from 'react';

const Spinner = ({ text }) => {
  return (
    <div
      className="flex gap-3 h-screen w-full items-center justify-center bg-black px-4"
      role="status"
      aria-live="polite"
    >
      <span className="text-white text-4xl">{text}</span>
      <div className="relative h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        {/* Spinning accent ring */}
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500"></div>
      </div>
    </div>
  );
};

export default Spinner;