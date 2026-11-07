import React from 'react'

const Stats = () => {
  return (
    <div className='stats intro from-zinc-900 to-black relative flex min-h-screen flex-col justify-center text-white z-10 py-6 sm:py-10 md:py-12 px-4 sm:px-6'>
      <div className='heading text-white flex flex-col justify-center gap-2 sm:gap-4 items-center mb-5 sm:mb-10'>
        <span className='text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-center'>Why it matters?</span>
        <span className='text-xs sm:text-lg md:text-xl font-semibold text-center'>Because Every second counts</span>
      </div>
      <div className='container w-full text-center justify-center items-center mx-auto px-1 sm:px-4 grid grid-cols-3 gap-2 sm:gap-8'>
        <div className='flex-col flex gap-1 sm:gap-2'>
          <span className='text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>3+</span>
          <span className='text-sm sm:text-3xl md:text-4xl tracking-wide'>Lives Saved</span>
          <span className='text-xs sm:text-lg md:text-2xl'>Per Donation</span>
        </div>
        <div className='flex-col flex gap-1 sm:gap-2'>
          <span className='text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>2s</span>
          <span className='text-sm sm:text-3xl md:text-4xl tracking-wide'>Someone</span>
          <span className='text-xs sm:text-lg md:text-2xl'>Needs Blood Access</span>
        </div>
        <div className='flex-col flex gap-1 sm:gap-2'>
          <span className='text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>24/7</span>
          <span className='text-sm sm:text-3xl md:text-4xl tracking-wide'>Emergency</span>
          <span className='text-xs sm:text-lg md:text-2xl'>Access Available</span>
        </div>
      </div>
      <div className='flex justify-center mt-5 sm:mt-8'>
      <button className='text-base sm:text-2xl md:text-3xl lg:text-4xl border px-3 sm:px-6 py-1.5 sm:py-3 transition-all hover:bg-amber-50 hover:text-black hover:scale-105 md:hover:scale-110 hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] hover:rounded-full rounded-xl'>Join the network</button>
      </div>
        
    </div>
  )
}

export default Stats