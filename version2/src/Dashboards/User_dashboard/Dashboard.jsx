import { Activity, Ambulance, Droplet, HandHeart, Navigation, Stethoscope } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Box from './components/Common/Box';
import Maps from './components/Common/Maps';
import ActionBox from './components/Dashboard/Action';
import AlertsFeed from './components/Dashboard/AlertsFeed';

const Dashboard = () => {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen mt-13 px-4 sm:px-6 lg:px-8 transition-all gap-13 flex flex-col duration-300">
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
          <Box
            title={
              <>
                Blood <br /> Group
              </>
            }
            value={user?.bloodGroup || 'O+'}
            icon={Droplet}
          />
          <Box
            title={
              <>
                Health <br /> Score
              </>
            }
            value="85"
            subtitle="/100"
            icon={Activity}
            valueColor="text-emerald-400"
            iconColor="text-emerald-400"
            iconBg="bg-emerald-500/10"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4">

        <ActionBox
          title="Request Blood"
          subtitle="Initiate urgent request"
          icon={Droplet}
          iconColor="text-white"
          iconBg="bg-red-600"
        />

        <ActionBox
          title="Donate"
          subtitle="Schedule appointment"
          icon={HandHeart}
          iconColor="text-white"
          iconBg="bg-emerald-600"
        />

        <ActionBox
          title="Ambulance"
          subtitle="Dispatch vehicle"
          icon={Ambulance}
          iconColor="text-white"
          iconBg="bg-cyan-500"
        />

        <ActionBox
          title="Find Doctor"
          subtitle="Browse specialists"
          icon={Stethoscope}
          iconColor="text-white"
          iconBg="bg-slate-700"
        />

      </div>
      <div className="mt-4 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch">
        <div className="flex min-w-0 flex-col overflow-hidden rounded-3xl">
          <div className="flex items-center justify-between rounded-t-3xl bg-white/20 px-4 py-3 backdrop-blur-xl transition-colors duration-300 hover:bg-zinc-900">
            <div className="flex items-center gap-3">
              <Navigation className="h-5 w-5" />
              <span>Live Location</span>
            </div>
            <span>Active</span>
          </div>
          <div className="h-80 w-full flex-1 lg:h-auto lg:min-h-80">
            <Maps />
          </div>
        </div>

        <div className="max-w-fit [&>section]:h-full">
          <AlertsFeed />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;