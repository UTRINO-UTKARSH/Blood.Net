import React from 'react'
import { Features } from 'tailwindcss'
import Typewriter from './Typewriter'

const StoryScreen = ({text = [],className}) => {
  return (
    <div className={`${className}`}>
        <Typewriter sentences={[text]} />
    </div>
  )
}

export default StoryScreen