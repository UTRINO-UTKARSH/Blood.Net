import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Suspense } from 'react';
import { Dashboard_Renders } from '../data/CategoryRender'
import { Navigate,useParams } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
//dashboard routes below
import PatientRoutes from './User_dashboard/User.Routes';
import HospitalRoutes from './Hospital dashboard/Hospital.routes';
import DonorRoutes from './Blood_donor dashboard/Donor.routes';
import DoctorRoutes from './Doctor dashboard/Doctor.routes';
import BankRoutes from './Blood_bank dashboard/Bank.routes';
// dashboard routes end
const categoryToPrefix = { 1: 'user', 2: 'donor', 3: 'hospital',4:'blood_bank',5:'doctor' }
const categoryRoutes = { 1: PatientRoutes , 2: DonorRoutes, 3: HospitalRoutes,4: BankRoutes,5: DoctorRoutes}

const DashboardRoutes = () => {
  const { user, loading } = useAuth();
  const {category: urlCategory } = useParams();
  const [redirect,setredirect] = useState(false)
  useEffect(()=>{
      if(!loading && !user){
        const timer = setTimeout(() => setredirect(true), 1500)
        return () => clearTimeout(timer)
      }
  },[loading,user])
  if (loading) {
    return <div className='bg-black h-screen text-white text-7xl flex items-center justify-center '>Loading...</div>;
  }

  if (!user) {
    if(redirect){
      return <Navigate to="/" replace />
    }
    return (<div className='bg-black h-screen text-white text-7xl flex items-center justify-center'>
      Logging Out
      
      </div>)
  }
  //security check for the conditon when some other user try to access other user page
  if(categoryToPrefix[user.category] !== urlCategory){
     return <Navigate to={`/${categoryToPrefix[user.category]}`} replace />
  }

//   const CategoryDashboard = Dashboard_Renders[user.category];

//   if (!CategoryDashboard) return <div>Unknown category</div>;

  const CategoryRoutes = categoryRoutes[user.category]
  if (!CategoryRoutes) return <div>Unknown category</div>

  return (
    <Suspense fallback={<div className="text-[#FF2D2D] bg-black h-screen flex justify-center items-center text-7xl">Loading dashboard...</div>}>
      <Routes>
      <Route path="/*" element={<CategoryRoutes user={user} />} />
    </Routes>
    </Suspense>
  )
};

export default DashboardRoutes;