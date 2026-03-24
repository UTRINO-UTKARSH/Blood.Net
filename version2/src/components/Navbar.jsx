import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex bg-white/30 rounded-full mx-2 sm:mx-4 md:mx-auto w-auto sm:w-full md:w-5xl items-center justify-between py-2 sm:py-3 px-3 sm:px-4 md:px-8 Nav shadow-xl gap-2 sm:gap-4 md:gap-10 flex-wrap sm:flex-nowrap'>
    {/* 1. Logo Section */}
      <div className='text-xl sm:text-xl md:text-2xl cursor-pointer font-bold text-white flex items-center gap-1 sm:gap-2 flex-shrink-0'>
        <span className='bg-white text-white p-1 rounded-full text-sm sm:text-base'>🩸</span>
        <span className='hidden sm:inline'>BLOOD.NET</span>
        <span className='sm:hidden'>BLOOD</span>
      </div>
      <ul className='hidden md:flex items-center gap-6 lg:gap-10 font-medium text-white'>
        <li className='hover:text-red-600 cursor-pointer transition-colors text-sm lg:text-base'>Home</li>
        <li className='hover:text-red-600 cursor-pointer transition-colors text-sm lg:text-base'>Donate</li>
        <li className='hover:text-red-600 cursor-pointer transition-colors text-sm lg:text-base'>About Us</li>
        <li className='hover:text-red-600 cursor-pointer transition-colors text-sm lg:text-base'>Contact</li>
      </ul>

      {/* 3. Login Button */}
      <div>
        <button className='bg-red-600 text-white px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition-all shadow-md active:scale-95 text-sm sm:text-base'>
          Login
        </button>
      </div>
    </nav>
  )
}

export default Navbar