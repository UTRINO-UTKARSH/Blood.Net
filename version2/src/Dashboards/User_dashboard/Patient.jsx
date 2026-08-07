import React from 'react'
import Sidebar from '../../components/common/Sidebar'
import { Outlet } from 'react-router-dom'
import { patientNavItems } from '../../data/PatientSidebar'
import Navbar from './components/Navbar'
const Patient = () => {
  return (
    <div className='flex bg-[#0B0C10] min-h-screen'>
      <Sidebar navItems={patientNavItems} />
      <main className='ml-64 flex-1 p-4 text-white'>
        <Navbar />
        <Outlet /> {/* renders whichever nested route matches */}
      </main>
    </div>
  )
}

export default Patient