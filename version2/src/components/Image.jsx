import React from 'react'
import handImage from '../assets/hand6.png'

const Image = () => {
  return (
    <div className='absolute fade-out img'>
        <img className='invert' src={handImage} alt="Donor hand" />
    </div>
  )
}

export default Image
