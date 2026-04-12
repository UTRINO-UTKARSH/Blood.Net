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
    <div className='text-white intro flex-col stats relative py-10 sm:py-16 md:py-20 justify-center items-center flex gap-6 sm:gap-9 px-4 sm:px-6'>
      <div className='capitalize font-semibold tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center'>Want to serve People?</div>
      <div className='text-xl sm:text-2xl md:text-3xl lg:text-4xl flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center text-center'>
        <span>Convert Yourself into</span>
        <span className={`font-bold transition-all duration-500 transform ${getroleColor()} ${hoverRole ? 'scale-110 opacity-100' : 'opacity-0'}`}>
          {hoverRole || "..."}
        </span>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12 my-8 sm:my-16 md:my-20 lg:my-24 px-0 sm:px-4 md:px-8 lg:px-20 w-full items-start md:items-center'>
        <div onMouseEnter={() => {
          setHoverRole("User")
        }}
          onMouseLeave={() => {
            setHoverRole("")
          }} className='flex hover:shadow-red-600/60 shadow-red-900 hover:shadow-xl transition-all hover:scale-105 md:hover:scale-112 gap-3 justify-center items-center flex-col p-5 sm:p-6 md:p-8 rounded-xl bg-white/5 backdrop-blur-sm'>
          <span className='text-xl sm:text-2xl md:text-3xl text-center'>Need Blood Urgently?</span>
          <span className='text-sm sm:text-base md:text-lg tracking-tight text-center'>Connect with donors, hospitals and blood banks</span>
          <button className='px-4 sm:px-5 border text-lg sm:text-xl md:text-3xl transition-all hover:bg-white hover:text-black hover:scale-105 md:hover:scale-110 hover:rounded-4xl my-3 sm:my-4 py-1.5 sm:py-2'>Connect now</button>
        </div>
        <div onMouseEnter={() => {
          setHoverRole("Doctor")
        }}
          onMouseLeave={() => {
            setHoverRole("")
          }}
         className='flex transition-all hover:shadow-emerald-600/60 shadow-emerald-900 hover:shadow-xl hover:scale-105 md:hover:scale-112 justify-center gap-3 items-center flex-col p-5 sm:p-6 md:p-8 rounded-xl lg:-translate-y-16 bg-white/5 backdrop-blur-sm'>
          <span className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center'>Want to help others?</span>
          <span className='text-sm sm:text-base md:text-lg text-center'>Register as a doctor or hospital</span>
          <button className='px-4 sm:px-5 border text-lg sm:text-xl md:text-3xl transition-all hover:bg-white hover:text-black hover:scale-105 md:hover:scale-110 hover:rounded-4xl my-3 sm:my-4 py-1.5 sm:py-2'>Register Now</button>
        </div>
        <div onMouseEnter={() => {
          setHoverRole("Donor")
        }}
          onMouseLeave={() => {
            setHoverRole("")
          }}
        
        className='flex transition-all hover:scale-105 md:hover:scale-112 items-center hover:shadow-blue-600/60 shadow-blue-600 hover:shadow-xl justify-center flex-col gap-3 p-5 sm:p-6 md:p-8 rounded-xl bg-white/5 backdrop-blur-sm'>
          <span className='text-xl sm:text-2xl md:text-3xl text-center'>Want to be Someone's Lifeline?</span>
          <span className='text-sm sm:text-base md:text-lg text-center'>Join as a donor and make a real difference.</span>
          <button className='px-4 sm:px-5 border text-lg sm:text-xl md:text-3xl transition-all hover:bg-white hover:text-black hover:scale-105 md:hover:scale-110 hover:rounded-4xl my-3 sm:my-4 py-1.5 sm:py-2'>Donate now</button>
        </div>
      </div>
    </div>
  )
}

export default Cta