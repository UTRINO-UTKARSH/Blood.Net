import React from 'react'
import Navbar from './components/Navbar'
import Center from './components/Center'
import Image from './components/Image'
import LightRays from './components/LightRays'
import OurFeatures from './components/OurFeatures'
import Stats from './components/Stats'
import Cta from './components/Cta'
const App = () => {
  return (
    <div className="bg-[#121212] min-h-full">

     
      <div className="relative min-h-screen">

        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          fadeDistance={1}
          saturation={1}
          className=" fixed z-0 inset-0 pointer-events-none"
        />

        {/* Content Layer */}
        <div className="relative z-10 h-full flex flex-col pt-4 sm:pt-6 md:pt-8 lg:pt-10 px-4 sm:px-0">
          <Navbar />

          <div className="flex relative items-center justify-center flex-col">
            <Center />
            <Image />
          </div>
        </div>
        {/* FEATURES SECTION */}
        <div className="bg-[#121212] z-10 min-h-screen">
          <OurFeatures />
        </div>
        <div className='bg-[#121212] z-10 min-h-auto sm:min-h-96 md:min-h-[400px]'>
          <Stats />
        </div>
        <div className='bg-[#121212] z-10 min-h-screen'>
          <Cta />
        </div>
      </div>
    </div>
  );
};

export default App