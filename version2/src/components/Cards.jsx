import React from 'react'
const Cards = ({ title, desc,img,theme,value }) => {
  const shadowClass = theme === "red" 
    ? "hover:shadow-red-600/60 shadow-red-900" 
    : "hover:shadow-blue-600/90 shadow-blue-700";
  return (
    <div className={`flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl shadow-blue-900 bg-white/10 backdrop-blur-md border border-white/20 p-7 w-90 h-[400px] rounded-3xl text-white ${shadowClass}`}>
      
      {/* Header Area: Fixed height ensures alignment even if title wraps */}
      <div className='flex items-center gap-4 mb-20'>
        <div className='shrink-0 border-2 border-emerald-400 w-20 h-20 overflow-hidden rounded-full'>
          <img 
            className='w-full h-full object-cover' 
            src={img}
            alt="logo" 
          />
        </div>
        <h3 className='text-2xl font-bold '>
          {title}
        </h3>
      </div>

      <div className='flex-grow overflow-hidden'>
        <p className='text-gray-200 text-xl leading-relaxed'>
          {desc}
        </p>
      </div>

      <div className='mt-6 flex justify-center'>
        <button className='w-full border border-white/50 py-2.5 rounded-xl hover:bg-white hover:text-black transition-all font-medium active:scale-95'>
          {value}
        </button>
      </div>
    </div>
  )
}

export default Cards