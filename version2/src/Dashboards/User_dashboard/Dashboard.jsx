import { Droplet } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Box from './components/Box';

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
    </div>
  );
};

export default Dashboard;