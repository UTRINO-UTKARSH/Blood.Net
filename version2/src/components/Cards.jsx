import React from 'react'

const Cards = () => {
  return (
    <div className='container flex transition-all duration-300 hover:-translate-y-2 hover:shadow-xl shadow-blue-700 gap-10 flex-col relative text-white bg-white/30 px-3 pt-3 w-72 h-100 rounded-4xl'>
      <div className='flex gap-4'>
        <div className='logo border-2 w-16 h-16 overflow-hidden rounded-full' >
          <img className='w-full h-full object-cover' src="https://img.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_53876-136743.jpg?semt=ais_rp_50_assets&w=740&q=80" alt="logo" />
        </div>
        <div className='py-4 text-5xl '>Title</div>
      </div>
      <div className='text-xl'>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam repellendus rem necessitatibus ut tenetur consectetur, consequuntur voluptate qui inventore iure.</p>
      </div>
      <div className='flex justify-center'>
        <input type="button" value="Button" className='border px-9 py-2 rounded-lg hover:bg-white hover:text-black hover:transition-all hover:scale-120' />
      </div>
    </div>
  )
}

export default Cards