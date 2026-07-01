import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  const [scrolled,setscrolled] = useState(false);

  useEffect(()=>{
    let ticking = false
    const handelscroll = ()=>{
      if(!ticking){
        requestAnimationFrame(()=>{
          setscrolled(window.scrollY>80);
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll',handelscroll,{passive:true})
    return ()=>{window.removeEventListener('scroll',handelscroll)}
  },[])
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
     <nav className={`fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-between rounded-full Nav shadow-xl gap-1 sm:gap-2 md:gap-6 transition-all duration-300
  ${scrolled
    ? "top-0 w-[95%] max-w-5xl bg-[#1f1f1f]/90 backdrop-blur-xl shadow-2xl py-2 px-6"
    : "top-5 w-[95%] md:w-full max-w-5xl bg-white/30 backdrop-blur-md py-1 sm:py-2 px-2 md:px-6"
  }`}>

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
            <span className='hover:text-red-600 cursor-pointer transition-colors text-sm'>Services</span>
            <div className='absolute top-full left-0 mt-5 bg-[#1f1f1f] backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] min-w-48 overflow-hidden z-50 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-100'>
              <ul className='flex flex-col px-1 py-6 gap-1'>
                <li><Link to="/knowledge/blood-types" className='px-4 py-2 text-white hover:text-red-600 hover:bg-white/20 rounded-xl transition-all text-sm'>Blood Donors</Link></li>
                <li><Link to="/knowledge/donation-process" className='block px-4 py-2 text-white hover:text-red-600 hover:bg-white/20 rounded-xl transition-all text-sm'>Blood Banks</Link></li>
                <li><Link to="/knowledge/eligibility" className='block px-4 py-2 text-white hover:text-red-600 hover:bg-white/20 rounded-xl transition-all text-sm'>Hospitals</Link></li>
                <li><Link to="/knowledge/faq" className='block px-4 py-2 text-white hover:text-red-600 hover:bg-white/20 rounded-xl transition-all text-sm'>Doctors</Link></li>
                <li><Link to="/knowledge/faq" className='block px-4 py-2 text-white hover:text-red-600 hover:bg-white/20 rounded-xl transition-all text-sm'>Ambulance Services</Link></li>
              </ul>
            </div>
          </li>

          <li className='relative group'>
            <span className='hover:text-red-600 cursor-pointer transition-colors text-sm'>Knowledge</span>
            <div className='absolute top-full left-1/2 -translate-x-1/2 mt-5 bg-[#1f1f1f] backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] min-w-48 overflow-hidden z-50 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-100'>
              <ul className='flex flex-col px-1 py-6 gap-1'>
                <li><Link to="/knowledge/blood-types" className='px-4 py-2 text-white hover:text-red-600 hover:bg-white/20 rounded-xl transition-all text-sm'>First Aid</Link></li>
                <li><Link to="/knowledge/donation-process" className='block px-4 py-2 text-white hover:text-red-600 hover:bg-white/20 rounded-xl transition-all text-sm'>Blood Donation Guide</Link></li>
                <li><Link to="/knowledge/eligibility" className='block px-4 py-2 text-white hover:text-red-600 hover:bg-white/20 rounded-xl transition-all text-sm'>Organ Donation Guide</Link></li>
                <li><Link to="/knowledge/faq" className='block px-4 py-2 text-white hover:text-red-600 hover:bg-white/20 rounded-xl transition-all text-sm'>FAQ</Link></li>
              </ul>
            </div>
          </li>

          <li className='hover:text-red-600 cursor-pointer transition-colors text-sm'>About</li>
        </ul>

        {/* Right side — Buttons + Hamburger */}
        <div className='flex items-center gap-1.5 sm:gap-3'>

          {/* Emergency help — shrinks label on small screens */}
          <button className='bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 active:scale-95 transition-all shadow-md text-[10px] px-2 py-1.5 sm:text-xs sm:px-3 sm:py-2 md:text-sm md:px-4 md:py-2 leading-tight'>
            <span className='sm:hidden'>SOS</span>
            <span className='hidden sm:inline md:hidden'>Help</span>
            <span className='hidden md:inline'>Emergency Help</span>
          </button>

          {/* Login */}
          <button className='bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 active:scale-95 transition-all shadow-md text-[10px] px-2.5 py-1.5 sm:text-xs sm:px-3 sm:py-2 md:text-sm md:px-4 md:py-2 leading-tight'>
            Login
          </button>

          {/* Hamburger — mobile only */}
          <button
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className='md:hidden relative flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer shrink-0'
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={`absolute block w-4 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
            <span className={`absolute block w-4 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`} />
            <span className={`absolute block w-4 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      <div className={`fixed z-40 left-2 right-2 sm:left-4 sm:right-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl transition-all duration-300 md:hidden overflow-hidden
        ${isOpen ? 'top-24 opacity-100 pointer-events-auto' : 'top-20 opacity-0 pointer-events-none'}`}
      >
        <ul className='flex flex-col font-medium text-white p-4 gap-4'>
          <li><Link to="/" className='hover:text-red-600 transition-colors text-base' onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/Donate" className='hover:text-red-600 transition-colors text-base' onClick={() => setIsOpen(false)}>Donate</Link></li>
          <li className='hover:text-red-600 cursor-pointer transition-colors text-base'>About Us</li>
          <li className='hover:text-red-600 cursor-pointer transition-colors text-base'>Contact</li>
        </ul>
      </div>
    </>
  )
}

export default Navbar