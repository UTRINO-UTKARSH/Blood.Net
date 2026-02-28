import React from 'react'
import Navbar from './components/Navbar'
import Center from './components/Center'
import Image from './components/Image'
import LightRays from './components/LightRays'

const App = () => {
  return (
    <div className="bg-[#121212] min-h-screen overflow-hidden">

      {/* HERO SECTION */}
      <div className="relative h-screen overflow-hidden">

        {/* Light Rays Background */}
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
          className="absolute inset-0 z-0"
        />

        {/* Content Layer */}
        <div className="relative z-10 h-full flex flex-col pt-10">
          <Navbar />

          <div className="flex-1 flex items-center justify-center">
            <Center />
            <Image />
          </div>
        </div>
      </div>

    </div>
  );
};

export default App