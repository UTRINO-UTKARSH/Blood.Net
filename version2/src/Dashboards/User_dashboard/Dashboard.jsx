import {  Navigation   } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Box from './components/Box';
import Maps from './components/Maps';
const Dashboard = () => {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen mt-13 px-4 sm:px-6 lg:px-8 transition-all duration-300">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
        <div className="flex flex-col gap-3 max-w-full lg:max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-greet text-[#abbdf6] font-bold leading-tight">
            {getGreeting()}, {user?.name || 'Guest'}.
          </h1>
          <h2 className="w-full sm:max-w-[50ch] text-base sm:text-lg text-red-200 font-medium">
            Network system operating at optimal capacity. Your health indicators are stable.
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <Box title={'Blood Group'} />
          <Box />
        </div>
      </div>
      <div className='mt-20 flex flex-col max-w-150 backdrop:backdrop-blur-2xl'>
        <div className='bg-white/20 hover:bg-zinc-900 transition-all duration-300  backdrop-blur-9xl rounded-t-3xl flex justify-around'>
          <div className='flex p-4  max-w-fit gap-3'>
            <span><Navigation/></span>
            <span>Live Location</span>
          </div>
          <div className='flex p-4  max-w-fit gap-3'>
            <span>Active</span>
          </div>
        </div>
        <div className='w-full'>
          <Maps/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;