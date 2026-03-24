import React from 'react'

const Stats = () => {
  return (
    <div className='stats intro from-zinc-900 to-black relative flex flex-col text-white z-10 py-10 sm:py-16 md:py-20 px-4 sm:px-6'>
      <div className='heading text-white flex flex-col justify-center gap-4 sm:gap-6 items-center mb-10 sm:mb-16'>
        <span className='text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-center'>Why it matters?</span>
        <span className='text-sm sm:text-lg md:text-xl font-semibold text-center'>Because Every second counts</span>
      </div>
      <div className='container w-full text-center justify-center items-center my-12 sm:my-20 md:my-24 lg:my-35 mx-auto px-2 sm:px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10'>
        <div className='flex-col flex gap-2'>
          <span className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>3+</span>
          <span className='text-2xl sm:text-3xl md:text-4xl tracking-wide'>Lives Saved</span>
          <span className='text-base sm:text-lg md:text-2xl'>Per Donation</span>
        </div>
        <div className='flex-col flex gap-2'>
          <span className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>2s</span>
          <span className='text-2xl sm:text-3xl md:text-4xl tracking-wide'>Someone</span>
          <span className='text-base sm:text-lg md:text-2xl'>Needs Blood Access</span>
        </div>
        <div className='flex-col flex gap-2 sm:col-span-2 lg:col-span-1'>
          <span className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>24/7</span>
          <span className='text-2xl sm:text-3xl md:text-4xl tracking-wide'>Emergency</span>
          <span className='text-base sm:text-lg md:text-2xl'>Access Available</span>
        </div>
      </div>
      <div className='flex justify-center mt-8 sm:mt-12'>
      <button className='text-lg sm:text-2xl md:text-3xl lg:text-4xl border px-4 sm:px-6 py-2 sm:py-3 transition-all hover:bg-amber-50 hover:text-black hover:scale-105 md:hover:scale-110 hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] hover:rounded-full rounded-xl'>Join the network</button>
      </div>
        
    </div>
  )
}

export default Stats