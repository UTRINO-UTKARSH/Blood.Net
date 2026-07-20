import React from 'react'
import LightRays from '../common/LightRays'
const BloodDonors = () => {
  return (
    // parent div
    <div className="relative min-h-screen">
      {/* <LightRays
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
      /> */}
      {/* continue children adding */}
      <div className='flex z-10 relative gap-4 flex-col justify-center items-center my-30'>
        <svg width="90" height="90" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_45px_rgba(239,68,68,1)]">
          <path
            d="M12 2C12 2 5 11 5 15.5C5 19.6 8.1 22 12 22C15.9 22 19 19.6 19 15.5C19 11 12 2 12 2Z"
            fill="rgb(239,69,68)"
          />
        </svg>
        <div className='flex gap-2 flex-col justify-center items-center'>
          <span className='text-white text-6xl font-bold'>Blood Donor</span>
          <span className='text-zinc-400 text-3xl'>Connect with verified donors when every second counts</span>
        </div>
        <div className='border border-zinc-500 rounded-xl p-4'>
            <span className='text-white text-3xl'>How It Works</span>
        </div>
      </div>
    </div>
  )
}

export default BloodDonors