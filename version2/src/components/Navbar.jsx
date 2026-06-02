import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className='fixed top-6 left-0 right-0 z-50 flex bg-white/30 backdrop-blur-md rounded-full mx-2 sm:mx-4 md:mx-auto w-auto md:w-full md:max-w-5xl items-center justify-between py-2 sm:py-3 px-3 sm:px-4 md:px-8 Nav shadow-xl gap-2 sm:gap-4 md:gap-10'>
        
        {/* Logo */}
        <div className='text-xl sm:text-xl md:text-2xl cursor-pointer font-bold text-white flex items-center gap-1 sm:gap-2 shrink-0'>
          <span className='text-white p-1 rounded-full text-sm sm:text-base'>
            <img src='/favi.svg' alt='Blood.net logo' className='w-10 h-10 rounded-2xl sm:w-7 sm:h-7 object-contain' />
          </span>
          <span className='hidden sm:inline'>BLOOD.NET</span>
          <span className='sm:hidden'>BLOOD</span>
        </div>

        {/* Desktop Links */}
        <ul className='hidden md:flex items-center gap-6 lg:gap-10 font-medium text-white'>
          <li><Link to="/" className='hover:text-red-600 cursor-pointer transition-colors text-sm lg:text-base'>Home</Link></li>
          <li><Link to="/Donate" className='hover:text-red-600 cursor-pointer transition-colors text-sm lg:text-base'>Donate</Link></li>
          <li className='hover:text-red-600 cursor-pointer transition-colors text-sm lg:text-base'>About Us</li>
          <li className='hover:text-red-600 cursor-pointer transition-colors text-sm lg:text-base'>Contact</li>
        </ul>

        {/* Right side — Login + Hamburger */}
        <div className='flex items-center gap-3'>
          <button className='bg-red-600 text-white px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition-all shadow-md active:scale-95 text-sm sm:text-base'>
            Login
          </button>

          {/* Hamburger — only on mobile */}
          <button
            className='md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5'
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Line 1 */}
            <span
             className={`block w-6 h-0.5 bg-white transition-all cursor-pointer duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            {/* Line 2 */}
            <span
            className={`block w-6 h-0.5 bg-white transition-all cursor-pointer duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            {/* Line 3 */}    
            <span   
             className={`block w-6 h-0.5 bg-white transition-all cursor-pointer duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      <div className={`fixed z-40 left-2 right-2 sm:left-4 sm:right-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl transition-all duration-300 md:hidden overflow-hidden
        ${isOpen ? 'top-24 opacity-100 pointer-events-auto' : 'top-20 opacity-0 pointer-events-none'}`}
      >
        <ul className='flex flex-col font-medium text-white p-4 gap-4'>
          <li>
            <Link to="/" className='hover:text-red-600 transition-colors text-base' onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/Donate" className='hover:text-red-600 transition-colors text-base' onClick={() => setIsOpen(false)}>Donate</Link>
          </li>
          <li className='hover:text-red-600 cursor-pointer transition-colors text-base'>About Us</li>
          <li className='hover:text-red-600 cursor-pointer transition-colors text-base'>Contact</li>
        </ul>
      </div>
    </>
    )
}

export default Navbar