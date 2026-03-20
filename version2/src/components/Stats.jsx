import React from 'react'

const Stats = () => {
  return (
    <div className='stats intro bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-zinc-900 to-black relative flex flex-col text-white z-10'>
      <div className='heading text-white flex flex-col justify-center gap-6 items-center '>
        <span className='text-7xl font-bold tracking-tighter'>Why it matters?</span>
        <span className='text-xl font-semibold'>Because Every second counts</span>
      </div>
      <div className='container  w-full text-center justify-center items-center my-35 mx-30 grid grid-cols-3'>
        <div className='flex-col flex'>
          <span className='text-7xl'>3+</span>
          <span className='text-4xl  tracking-wide'>Lives Saved</span>
          <span className='text-2xl'>Per Donation</span>
        </div>
        <div className='flex-col flex'>
          <span className='text-7xl'>2s</span>
          <span className='text-4xl tracking-wide'>Someone</span>
          <span className='text-2xl'>Needs Blood Access</span>
        </div>
        <div className='flex-col flex'>
          <span className='text-7xl'>24/7</span>
          <span className='text-4xl tracking-wide'>Emergency</span>
          <span className='text-2xl '>Access Available</span>
        </div>
      </div>
      <div className='flex justify-around'>
      <button className='text-4xl border px-6 py-3 transition-all hover:bg-amber-50 hover:text-black hover:scale-110 hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] hover:rounded-full rounded-xl'>Join the network</button>
      </div>
        
    </div>
  )
}

export default Stats