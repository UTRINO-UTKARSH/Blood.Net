import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Suspense } from 'react';
import { Dashboard_Renders } from '../data/CategoryRender'
import { Navigate } from 'react-router-dom';
// import { getCategoryLabel } from '../data/category'
const Dashboard = () => {
  const { user, loading } = useAuth();
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
  const CategoryDashboard = Dashboard_Renders[user.category];

  if (!CategoryDashboard) return <div>Unknown category</div>;

  return (
    <Suspense fallback={<div className="text-[#FF2D2D] bg-black h-screen flex justify-center items-center text-7xl">Loading dashboard...</div>}>
      <CategoryDashboard user={user} />
    </Suspense>
  )
};

export default Dashboard;