import React from 'react'
import Navbar from './components/Navbar'
import Center from './components/Center'
import Image from './components/Image'
const App = () => {
  return (
    <div>
      <div className='Nav my-3'>
         <Navbar />
      </div>
      <div className='flex items-center justify-center'>
        <Center />
        <Image />
      </div>
    </div>
  )
}

export default App