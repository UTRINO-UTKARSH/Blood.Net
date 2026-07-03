import React, { useState, useEffect } from 'react'
// import handImage from '../assets/hand6.png'
import lefthand from '../../assets/lefthand.png'
import righthand from '../../assets/righthand.png'
const Image = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight

      const scrollThreshold = viewportHeight * 0.5
      if (window.scrollY > scrollThreshold) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`absolute mt-[20%] sm:mt-[35%] md:mt-[40%] pointer-events-none img transition-all duration-300 hidden sm:block ${isVisible ? 'opacity-100' : 'opacity-0 invisible'
        }`}
    >
      <div className='flex w-[45vw] max-w-450 mt-40 gap-[5vw] justify-center items-center '>
        <img className=' w-48 mt-18 sm:w-56  md:w-64 lg:w-auto' src={lefthand} alt="Donor hand" />
        <img className='mx-6 invert w-48 sm:w-56  md:w-64 lg:w-auto' src={righthand} alt="Donor hand" />
      </div>

    </div>
  )
}

export default Image
