import React from 'react'
import LightRays from '../common/LightRays'

const BloodDonors = () => {
  return (
   
    <div className="relative min-h-screen">
      <div className="flex z-10 relative gap-4 flex-col justify-center items-center my-16 sm:my-24 lg:my-30 px-4">
        <svg
          width="70"
          height="70"
          viewBox="0 0 24 24"
          fill="none"
          className="drop-shadow-[0_0_45px_rgba(239,68,68,1)] sm:w-22.5 sm:h-22.5"
        >
          <path
            d="M12 2C12 2 5 11 5 15.5C5 19.6 8.1 22 12 22C15.9 22 19 19.6 19 15.5C19 11 12 2 12 2Z"
            fill="rgb(239,69,68)"
          />
        </svg>

        <div className="flex gap-2 flex-col justify-center items-center text-center">
          <span className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold">Blood Donor</span>
          <span className="text-zinc-400 text-lg sm:text-2xl lg:text-3xl max-w-xl">
            Connect with verified donors when every second counts
          </span>
        </div>
        <div className="border flex flex-col gap-3 text-center border-zinc-500 rounded-xl p-4 sm:p-6 my-8 sm:my-12 w-full max-w-4xl">
          <span className="text-white text-2xl sm:text-3xl font-bold p-3">How It Works</span>

          <div className="main-container px-1 sm:px-3 py-3 gap-6 sm:gap-3 flex flex-col sm:flex-row sm:items-start sm:justify-between">
            
            <div className="flex flex-col items-center text-center gap-2 w-full sm:w-1/3">
              <div className="bg-red-200/9 flex h-12 w-12 items-center justify-center rounded-full border border-red-400 text-red-500 shrink-0">
                <span className="text-lg font-bold">1</span>
              </div>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white mt-2">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
                <path d="M4 21C4 16.6 7.6 14 12 14C16.4 14 20 16.6 20 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span className="text-white font-bold mt-2">Create Profile</span>
              <p className="text-zinc-400 text-sm leading-snug max-w-40">
                Sign up and complete your donor profile
              </p>
            </div>

            <div className="hidden sm:block h-px flex-1 bg-zinc-600 mt-6 self-start"></div>

            <div className="flex flex-col items-center text-center gap-2 w-full sm:w-1/3">
              <div className="bg-red-200/9 flex h-12 w-12 items-center justify-center rounded-full border border-red-400 text-red-500 shrink-0">
                <span className="text-lg font-bold">2</span>
              </div>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white mt-2">
                <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
                <path d="M20 20L15.8 15.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span className="text-white font-bold mt-2">Get Matched</span>
              <p className="text-zinc-400 text-sm leading-snug max-w-40">
                We match you with recipients near you
              </p>
            </div>

            <div className="hidden sm:block h-px flex-1 bg-zinc-600 mt-6 self-start"></div>

            <div className="flex flex-col items-center text-center gap-2 w-full sm:w-1/3">
              <div className="bg-red-200/9 flex h-12 w-12 items-center justify-center rounded-full border border-red-400 text-red-500 shrink-0">
                <span className="text-lg font-bold">3</span>
              </div>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white mt-2">
                <path
                  d="M12 20.5C12 20.5 3.5 15.5 3.5 9.3C3.5 6.4 5.8 4.3 8.5 4.3C10 4.3 11.3 5 12 6.1C12.7 5 14 4.3 15.5 4.3C18.2 4.3 20.5 6.4 20.5 9.3C20.5 15.5 12 20.5 12 20.5Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-white font-bold mt-2">Save Lives</span>
              <p className="text-zinc-400 text-sm leading-snug max-w-40">
                Donate blood and make a real impact
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BloodDonors