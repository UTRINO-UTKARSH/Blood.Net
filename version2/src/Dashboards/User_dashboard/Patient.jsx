import React, { useState } from 'react'
import Sidebar from '../../components/common/Sidebar'
import { Outlet } from 'react-router-dom'
import { patientNavItems } from '../../data/PatientSidebar'
import Navbar from './components/Navbar'

const Patient = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='flex bg-[#0B0C10] min-h-screen relative'>
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div 
        className={`fixed inset-y-0 left-0 z-50 w-60 transform transition-transform duration-300 ease-in-out md:fixed md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar navItems={patientNavItems} />
      </div>

      <main className='flex-1 p-4 md:p-2 text-white w-full md:ml-64 transition-all duration-300 min-w-0'>
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        
        <div className="mt-4">
          <Outlet />
        </div>
      </main>
      
    </div>
  )
}

export default Patient