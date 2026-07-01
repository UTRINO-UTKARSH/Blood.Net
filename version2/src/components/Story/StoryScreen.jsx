import React, { useEffect } from 'react'
import { Features } from 'tailwindcss'
import Typewriter from './Typewriter'
import { useTypewriter } from '../../hooks/useTypewriter'
const StoryScreen = ({text = "",className,cursor="",onComplete}) => {
  const {displayText,phase} = useTypewriter({
    sentences:[text],
    pause:1500,
    loop: false,
    speed:95,
    deleteText:false
  })
  useEffect(() => {
    if(phase==='finished'){
      onComplete?.()
    }
  },[phase,onComplete])
  return (
    <div className={`${className}`}>
      {displayText}
      <span className='animate-pulse'>
        {cursor}
      </span>
    </div>
  )
}

export default StoryScreen