import React from 'react'
import { Search, Asterisk, Bell, User as UserIcon, Menu } from 'lucide-react'
import { useAuth } from '../../../contexts/AuthContext'

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth()

  return (
    <header className='flex items-center justify-between gap-2 sm:gap-4 md:gap-6 w-full py-1'>
      <button
        type='button'
        onClick={onMenuClick}
        aria-label='Open sidebar menu'
        className='md:hidden p-2.5 rounded-xl bg-[#141C2E] border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 transition-all shrink-0'
      >
        <Menu size={20} aria-hidden="true" />
      </button>
      <div className='relative flex-1 max-w-md'>
        <Search
          size={18}
          aria-hidden="true"
          className='absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-[#FF2D2D]/70 pointer-events-none'
        />
        <input
          type='text'
          placeholder='Search donors, hospitals...'
          aria-label='Search donors, hospitals, doctors'
          className='w-full bg-[#141C2E] text-white placeholder-gray-500 rounded-2xl pl-10 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 text-xs sm:text-sm border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#FF2D2D]/40 focus:border-[#FF2D2D]/40 transition-all shadow-inner'
        />
      </div>
      <div className='flex items-center gap-2 sm:gap-4 shrink-0'>
        
        <button 
          type='button'
          className='flex items-center gap-1.5 sm:gap-2 bg-[#FF2D2D] hover:bg-[#e02323] active:scale-95 text-white text-xs sm:text-sm font-semibold px-3 sm:px-5 py-2.5 sm:py-3 rounded-2xl shadow-[0_0_20px_rgba(255,45,45,0.35)] transition-all'
        >
          <Asterisk className='font-bold animate-spin-slow' size={16} aria-hidden="true" />
          <span className='hidden sm:inline'>EMERGENCY SOS</span>
          <span className='inline sm:hidden'>SOS</span>
        </button>

        <button 
          type='button'
          aria-label='View notifications'
          className='relative p-2.5 rounded-xl bg-[#141C2E] border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 transition-all shrink-0'
        >
          <Bell size={18} aria-hidden="true" />
          <span className='absolute top-2 right-2 h-2 w-2 rounded-full bg-[#FF2D2D] ring-2 ring-[#141C2E]' />
        </button>


        <div className='flex items-center gap-3 sm:pl-3 sm:border-l sm:border-white/10'>
          <div className='hidden lg:block text-right leading-tight'>
            <p className='text-white text-sm font-semibold'>{user?.name ?? 'Guest'}</p>
            <p className='text-gray-400 text-xs'>{user?.bloodGroup ? `${user.bloodGroup} Donor` : 'Member'}</p>
          </div>
          
          {/* Avatar Thumbnail */}
          <div 
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-linear-to-tr from-[#FF2D2D]/20 to-[#141C2E] border border-white/10 flex items-center justify-center text-white overflow-hidden shadow-sm shrink-0"
            aria-label="User profile avatar"
          >
            {user?.avatar ? (
              <img src={user.avatar} alt={user?.name || 'User profile'} className="w-full h-full object-cover" />
            ) : (
              <UserIcon size={18} className="text-gray-300" />
            )}
          </div>
        </div>

      </div>
    </header>
  )
}

export default Navbar