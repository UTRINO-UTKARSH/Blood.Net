import React, { useState } from 'react'

const Cta = () => {
  const [hoverRole, setHoverRole] = useState("")
  const getroleColor = () => {
    if (hoverRole === "User") return "text-red-500 shadow-red-500/50";
    if (hoverRole === "Doctor") return "text-emerald-500 shadow-emerald-500/50";
    if (hoverRole === "Donor") return "text-blue-500 shadow-blue-500/50";
    return "text-white";
  }
  return (
    <div className='text-white intro flex-col stats relative py-20 justify-center items-center flex gap-9 '>
      <div className='capitalize font-semibold tracking-tighter text-7xl'>Want to serve People?</div>
      <div className='text-4xl flex gap-3 justify-center'>
        <span>Convert Yourself into</span>
        <span className={`font-bold transition-all duration-500 transform ${getroleColor()} ${hoverRole ? 'scale-110 opacity-100' : 'opacity-0'}`}>
          {hoverRole || "..."}
        </span>
      </div>
      <div className='grid grid-cols-3 gap-12 my-33 px-20 items-center'>
        <div onMouseEnter={() => {
          setHoverRole("User")
        }}
          onMouseLeave={() => {
            setHoverRole("")
          }} className='flex  hover:shadow-red-600/60 shadow-red-900 hover:shadow-xl transition-all hover:scale-112 gap-3 justify-center items-center flex-col  p-8 rounded-xl  bg-white/5 backdrop-blur-sm'>
          <span className='text-3xl text-center'>Need Blood Urgently?</span>
          <span className='text-xl tracking-tight text-center'>Connect with donors, hospitals and blood banks</span>
          <button className='px-5 border text-3xl transition-all hover:bg-white hover:text-black hover:scale-110 hover:rounded-4xl my-4 py-2'>Connect now</button>
        </div>
        <div onMouseEnter={() => {
          setHoverRole("Doctor")
        }}
          onMouseLeave={() => {
            setHoverRole("")
          }}
         className='flex transition-all hover:shadow-emerald-600/60 shadow-emerald-900 hover:shadow-xl hover:scale-112 justify-center gap-3 items-center flex-col  p-8 rounded-xl -translate-y-16 bg-white/5 backdrop-blur-sm'>
          <span className='text-4xl text-center'>Want to help others?</span>
          <span className='text-xl text-center'>Register as a doctor or hospital</span>
          <button className='px-5 border text-3xl transition-all hover:bg-white hover:text-black hover:scale-110 hover:rounded-4xl my-4 py-2'>Register Now</button>
        </div>
        <div onMouseEnter={() => {
          setHoverRole("Donor")
        }}
          onMouseLeave={() => {
            setHoverRole("")
          }}
        
        className='flex transition-all hover:scale-112 items-center  hover:shadow-blue-600/60 shadow-blue-600 hover:shadow-xl justify-center flex-col gap-3 p-8 rounded-xl  bg-white/5 backdrop-blur-sm'>
          <span className='text-3xl text-center'>Want to be Someone's Lifeline?</span>
          <span className='text-xl text-center'>Join as a donor and make a real difference.</span>
          <button className='px-5 border text-3xl transition-all hover:bg-white hover:text-black hover:scale-110 hover:rounded-4xl my-4 py-2'>Donate now</button>
        </div>
      </div>
    </div>
  )
}

export default Cta