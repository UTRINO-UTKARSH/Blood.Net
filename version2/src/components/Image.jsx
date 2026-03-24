import React, { useState, useEffect } from 'react'
import handImage from '../assets/hand6.png'

const Image = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight

      const scrollThreshold = viewportHeight * 0.7
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
      className={`absolute mt-[20%] sm:mt-[35%] md:mt-[40%] pointer-events-none img transition-all duration-300 hidden sm:block ${
        isVisible ? 'opacity-100' : 'opacity-0 invisible'
      }`}
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
    >
        <img className='invert' src={handImage} alt="Donor hand" />
    </div>
  )
}

export default Image
