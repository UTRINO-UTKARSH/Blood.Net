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
        <div className='border flex flex-col gap-3 text-center border-zinc-500 rounded-xl p-4 my-12'>
          <span className='text-white text-3xl font-bold p-3'>How It Works</span>
          <div className="main-container px-3 py-3 gap-3 flex items-start">
            {/* child container 1 */}
            <div className="flex flex-col items-center text-center gap-2 w-43">
              <div className="bg-red-200/9 flex h-12 w-12 items-center justify-center rounded-full border border-red-400 text-red-500">
                <span className="text-lg font-bold">1</span>
              </div>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white mt-2">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
                <path d="M4 21C4 16.6 7.6 14 12 14C16.4 14 20 16.6 20 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span className="text-white font-bold mt-2">Create Profile</span>
              <div className="flex items-center justify-center w-full flex-col">
                <p className="text-zinc-400 text-sm w-40 leading-snug">
                  Sign up and complete your donor profile
                </p>
              </div>
            </div>

            {/* connector line 1→2, pushed down to align with the badge center */}
            <div className="h-px w-26 bg-zinc-600 mt-6"></div>

            {/* child container 2 */}
            <div className="flex flex-col items-center text-center gap-2 w-40">
              <div className="bg-red-200/9 flex h-12 w-12 items-center justify-center rounded-full border border-red-400 text-red-500">
                <span className="text-lg font-bold">2</span>
              </div>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white mt-2">
                <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
                <path d="M20 20L15.8 15.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span className="text-white font-bold mt-2">Get Matched</span>
              <div className="flex items-center justify-center w-full flex-col">
                <p className="text-zinc-400 text-sm w-40 leading-snug">
                  We match you with recipients near you
                </p>
              </div>
            </div>

            {/* connector line 2→3 */}
            <div className="h-px w-26 bg-zinc-600 mt-6"></div>

            {/* child container 3 */}
            <div className="flex flex-col items-center text-center gap-2 w-40">
              <div className="bg-red-200/9 flex h-12 w-12 items-center justify-center rounded-full border border-red-400 text-red-500">
                <span className="text-lg font-bold">3</span>
              </div>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white mt-2">
                <path
                  d="M12 20.5C12 20.5 3.5 15.5 3.5 9.3C3.5 6.4 5.8 4.3 8.5 4.3C10 4.3 11.3 5 12 6.1C12.7 5 14 4.3 15.5 4.3C18.2 4.3 20.5 6.4 20.5 9.3C20.5 15.5 12 20.5 12 20.5Z"
                  stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"
                />
              </svg>
              <span className="text-white font-bold mt-2">Save Lives</span>
              <div className="flex items-center justify-center w-full flex-col">
                <p className="text-zinc-400 text-sm w-40 leading-snug">
                  Donate blood and make a real impact
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BloodDonors