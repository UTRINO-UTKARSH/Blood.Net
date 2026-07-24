import { NavLink } from 'react-router-dom';
import { Home, User, Heart, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();

  const navItems = [
    { to: '/dashboard', label: 'Overview', icon: Home },
    { to: '/dashboard/profile', label: 'Profile', icon: User },
    { to: '/dashboard/donations', label: 'Donations', icon: Heart },
    { to: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className='h-screen w-64 bg-[#090B12] border-r border-gray-800 flex flex-col justify-between fixed left-0 top-0'>
      <div>
        <div className='p-6'>
          <h1 className='text-[#FF2D2D] text-2xl font-bold'>Blood.net</h1>
        </div>

        <nav className='flex flex-col gap-1 px-4'>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-[#FF2D2D]/10 text-[#FF2D2D]'
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