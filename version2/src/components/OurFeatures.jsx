import React from 'react'
import Cards from './Cards'

const OurFeatures = () => {
  return (
    <div className='min-h-screen intro relative py-20 px-10 justify-center  items-center '>
      <h2 className='text-white title text-7xl font-extrabold text-center mb-10'>Our Features</h2>
      <div className='flex justify-center flex-wrap gap-6'>

        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </div>
      {/* Add your features content here */}
    </div>
  )
}

export default OurFeatures