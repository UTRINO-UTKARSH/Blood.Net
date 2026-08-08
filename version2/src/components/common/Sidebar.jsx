/* eslint-disable no-unused-vars */
import { NavLink } from 'react-router-dom';
import {LogOut} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

const Sidebar = ({ navItems }) => {
  const { logout } = useAuth();
  return (
    <aside className='h-screen w-60 bg-[#0F111E] backdrop-blur-2xl flex flex-col justify-between fixed left-0 top-0'>
      <div>
        <div className='p-6 flex gap-2'>
          <span className='bg-white p-1 rounded-full text-xs sm:text-sm'>
            <img src='/favi.svg' alt='Blood.net logo' className='w-8 h-8 rounded-2xl sm:w-6 sm:h-6 object-contain' />
          </span>
          <h1 className='text-[#FF2D2D] text-2xl font-bold'>Blood.net</h1>
        </div>

        <nav className='flex flex-col gap-0.5 px-4'>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-m font-bold transition-colors ${isActive
                  ? 'bg-[#FF2D2D]/10 text-[#FF2D2D] '
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <button
        onClick={logout}
        className='flex items-center gap-3 px-4 py-3 mx-4 mb-6 text-gray-400 hover:text-[#FF2D2D] transition-colors'
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;