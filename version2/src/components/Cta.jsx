import React from 'react'

const Cta = () => {
  return (
    <div className='text-white intro flex-col stats relative py-20 justify-center items-center flex gap-9 '>
      <div className='capitalize font-semibold tracking-tighter text-7xl'>Want to serve People?</div>
      <div className='text-4xl flex justify-center'>Convert Yourself into</div>
      <div className='grid grid-cols-3 gap-12 my-35 px-20 items-center'>
        <div className='flex hover:shadow-red-600/60 shadow-red-900 hover:shadow-xl transition-all hover:scale-112 gap-3 justify-center items-center flex-col  p-8 rounded-xl  bg-white/5 backdrop-blur-sm'>
          <span className='text-3xl text-center'>Need Blood Urgently?</span>
          <span className='text-xl tracking-tight text-center'>Connect with donors, hospitals and blood banks</span>
          <button className='px-5 border text-3xl transition-all hover:bg-white hover:text-black hover:scale-110 hover:rounded-4xl my-4 py-2'>Connect now</button>
        </div>
        <div className='flex transition-all hover:shadow-emerald-600/60 shadow-emerald-900 hover:shadow-xl hover:scale-112 justify-center gap-3 items-center flex-col  p-8 rounded-xl -translate-y-16 bg-white/5 backdrop-blur-sm'>
          <span className='text-4xl text-center'>Want to help others?</span>
          <span className='text-xl text-center'>Register as a doctor or hospital</span>
          <button className='px-5 border text-3xl transition-all hover:bg-white hover:text-black hover:scale-110 hover:rounded-4xl my-4 py-2'>Register Now</button>
        </div>
        <div className='flex transition-all hover:scale-112 items-center justify-center flex-col  p-8 rounded-xl  bg-white/5 backdrop-blur-sm'>
          <span className='text-3xl text-center'>Need Blood Urgently?</span>
          <span className='text-xl text-center'>Connect with donors, hospitals and blood banks</span>
          <button className='px-5 border text-3xl transition-all hover:bg-white hover:text-black hover:scale-110 hover:rounded-4xl my-4 py-2'>Connect now</button>
        </div>
      </div>
    </div>
  )
}

export default Cta