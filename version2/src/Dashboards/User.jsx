import React from 'react'
import  Sidebar from '../components/common/Sidebar'
import { Outlet } from 'react-router-dom'
const User = () => {
  return (
    <div className='flex bg-[#090B12] min-h-screen'>
      <Sidebar />
      <main className='ml-64 flex-1 p-8 text-white'>
        <Outlet /> {/* renders whichever nested route matches */}
      </main>
    </div>
  )
}

export default User