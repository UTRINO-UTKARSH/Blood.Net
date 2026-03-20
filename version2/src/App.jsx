import React from 'react'
import Navbar from './components/Navbar'
import Center from './components/Center'
import Image from './components/Image'
import LightRays from './components/LightRays'
import OurFeatures from './components/OurFeatures'
import Stats from './components/Stats'
const App = () => {
  return (
    <div className="bg-[#121212] min-h-screen">

     
      <div className="relative h-screen">

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
        <div className="relative z-10 h-full flex flex-col pt-10">
          <Navbar />

          <div className="flex relative items-center justify-center">
            <Center />
            <Image />
          </div>
        </div>
        {/* FEATURES SECTION */}
        <div className=" bg-[#121212] z-10  min-h-screen">
          <OurFeatures />
        </div>
        <div className=' bg-[#121212] z-10 min-h-screen'>
          <Stats />
        </div>
      </div>
    </div>
  );
};

export default App