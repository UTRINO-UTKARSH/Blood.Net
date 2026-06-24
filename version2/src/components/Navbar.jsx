import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className='fixed top-5 left-0 right-0 z-50 flex bg-white/30 backdrop-blur-md rounded-full mx-2 sm:mx-4 md:mx-auto w-auto md:w-full md:max-w-5xl items-center justify-between py-1 sm:py-2 px-2 sm:px-3 md:px-6 Nav shadow-xl gap-1 sm:gap-2 md:gap-6'>
        
        {/* Logo */}
        <div className='text-sm sm:text-base md:text-lg cursor-pointer font-bold text-white flex items-center gap-1 sm:gap-2 shrink-0'>
          <span className='text-white p-1 rounded-full text-xs sm:text-sm'>
            <img src='/favi.svg' alt='Blood.net logo' className='w-8 h-8 rounded-2xl sm:w-6 sm:h-6 object-contain' />
          </span>
          <span className='hidden sm:inline'>BLOOD.NET</span>
          <span className='sm:hidden'>BLOOD</span>
        </div>

        {/* Desktop Links */}
        <ul className='hidden md:flex items-center gap-3 lg:gap-6 font-medium text-white text-sm'>
          <li><Link to="/" className='hover:text-red-600 cursor-pointer transition-colors text-sm'>Home</Link></li>
          <li className='relative group'>
            <span className='hover:text-red-600 cursor-pointer transition-colors text-sm'>
              Services
            </span>
             <div className='absolute top-full left-0 mt-5 group-hover:block bg-[#1f1f1f]  backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] min-w-48  overflow-hidden z-50 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-100'>
             <div></div>
              <ul className='flex flex-col px-1 py-6  gap-1'>
                <li>
                  <Link to="/knowledge/blood-types" className=' px-4 py-2 text-white hover:text-red-600 hover:bg-white/20 rounded-xl transition-all text-sm'>
                    Blood Donors
                  </Link>
                </li>
                <li>
                  <Link to="/knowledge/donation-process" className='block px-4 py-2 text-white hover:text-red-600 hover:bg-white/20 rounded-xl transition-all text-sm'>
                    Blood Banks
                  </Link>
                </li>
                <li>
                  <Link to="/knowledge/eligibility" className='block px-4 py-2 text-white hover:text-red-600 hover:bg-white/20 rounded-xl transition-all text-sm'>
                    Hospitals
                  </Link>
                </li>
                <li>
                  <Link to="/knowledge/faq" className='block px-4 py-2 text-white hover:text-red-600 hover:bg-white/20 rounded-xl transition-all text-sm'>
                    Doctors
                  </Link>
                </li>
                <li>
                  <Link to="/knowledge/faq" className='block px-4 py-2 text-white hover:text-red-600 hover:bg-white/20 rounded-xl transition-all text-sm'>
                    Ambulance Services
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          
            <li className='relative group'>
            <span className='hover:text-red-600 cursor-pointer transition-colors text-sm'>
              Knowledge
            </span>

            {/* Dropdown */}
            <div className='absolute top-full left-1/2 -translate-x-1/2 mt-5 group-hover:block bg-[#1f1f1f] backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] min-w-48 overflow-hidden z-50 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-100'>
              <ul className='flex flex-col px-1 py-6  gap-1'>
                <li>
                  <Link to="/knowledge/blood-types" className=' px-4 py-2 text-white hover:text-red-600 hover:bg-white/20 rounded-xl transition-all text-sm'>
                    First Aid
                  </Link>
                </li>
                <li>
                  <Link to="/knowledge/donation-process" className='block px-4 py-2 text-white hover:text-red-600 hover:bg-white/20 rounded-xl transition-all text-sm'>
                    Blood Donation Guide
                  </Link>
                </li>
                <li>
                  <Link to="/knowledge/eligibility" className='block px-4 py-2 text-white hover:text-red-600 hover:bg-white/20 rounded-xl transition-all text-sm'>
                    Organ Donation Guide
                  </Link>
                </li>
                <li>
                  <Link to="/knowledge/faq" className='block px-4 py-2 text-white hover:text-red-600 hover:bg-white/20 rounded-xl transition-all text-sm'>
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className='hover:text-red-600 cursor-pointer transition-colors text-sm'>About</li>
        </ul>

        {/* Right side — Login + Hamburger */}
        <div className='flex items-center gap-3'>
          <button className='bg-red-600 text-white text-xs px-2 sm:px-3 py-2 rounded-full font-semibold hover:bg-red-700 transition-all shadow-md active:scale-95 sm:text-sm'>
            Emergency help
          </button>
          <button className='bg-red-600 text-white px-3 sm:px-4 py-2 rounded-full font-semibold hover:bg-red-700 transition-all shadow-md active:scale-95 text-xs sm:text-sm'>
            Login
          </button>

          {/* Hamburger — only on mobile */}
          <button
            className='md:hidden flex flex-col justify-center items-center w-7 h-7 gap-1'
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={`block w-5 h-0.5 bg-white transition-all cursor-pointer duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all cursor-pointer duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all cursor-pointer duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
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