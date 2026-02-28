import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex bg-white/30 blood rounded-full mx-90 items-center justify-between py-3 px-8 Nav shadow-xl'>
    {/* 1. Logo Section */}
      <div className='text-2xl cursor-pointer font-bold text-white flex items-center gap-2'>
        <span className='bg-white text-white p-1 rounded-full'>🩸</span>
        BLOOD.NET
      </div>
      <ul className='flex items-center gap-10 font-medium text-white'>
        <li className='hover:text-red-600 cursor-pointer transition-colors'>Home</li>
        <li className='hover:text-red-600 cursor-pointer transition-colors'>Donate</li>
        <li className='hover:text-red-600 cursor-pointer transition-colors'>About Us</li>
        <li className='hover:text-red-600 cursor-pointer transition-colors'>Contact</li>
      </ul>

      {/* 3. Login Button */}
      <div>
        <button className='bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition-all shadow-md active:scale-95'>
          Login
        </button>
      </div>
    </nav>
  )
}

export default Navbar