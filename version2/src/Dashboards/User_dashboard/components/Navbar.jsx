import React from 'react'
import { Search,Asterisk,Bell } from 'lucide-react'
import { useAuth } from '../../../contexts/AuthContext'

const Navbar = () => {
    const {user} = useAuth()
  return (
    <div className='flex items-center justify-between gap-4'>
      {/* Search */}
      <div className='relative w-full max-w-md'>
        <Search
          size={18}
          className='absolute left-4 top-1/2 -translate-y-1/2 text-[#FF2D2D]/70 pointer-events-none'
        />
        <input
          type='text'
          placeholder='Search donors, hospitals, doctors...'
          className='w-full bg-[#141C2E] text-white placeholder-gray-500 rounded-2xl pl-11 pr-4 py-3 text-sm border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#FF2D2D]/40 focus:border-[#FF2D2D]/40 transition-all'
        />
      </div>

      {/* Right cluster */}
      <div className='flex items-center max-w-full justify-evenly gap-3 shrink-0'>
        <button className='flex items-center gap-2 bg-[#d92525] hover:bg-[#e02323] text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-[0_0_20px_rgba(255,45,45,0.35)] transition-colors'>
          <Asterisk className='font-bold' size={16} />
          EMERGENCY SOS
        </button>

        <button className='relative text-gray-300 hover:text-white transition-colors'>
          <Bell size={20} />
          <span className='absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#FF2D2D]' />
        </button>

        <div className='flex items-center gap-3'>
          <div className='text-right leading-tight'>
            <p className='text-white text-sm font-semibold'>{user?.name ?? 'Guest'}</p>
            <p className='text-gray-400 text-xs'>{user?.bloodGroup ? `${user.bloodGroup} Donor` : 'Member'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar