import React, { useEffect } from 'react'
import { Features } from 'tailwindcss'
import Typewriter from './Typewriter'
import { useTypewriter } from '../hooks/useTypewriter'
const StoryScreen = ({text = "",className,cursor="",onComplete}) => {
  const {displayText,phase} = useTypewriter({
    sentences:[text],
    pause:1500,
    loop: false,
    deleteText:false
  })
  // useEffect(() => {
  //   setDisplayText("");
  //   setPhase("typing");

  // },[sentences])
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
        {/* <Typewriter 
        cursor={'_'}
        sentences={[text]} /> */}
    </div>
  )
}

export default StoryScreen