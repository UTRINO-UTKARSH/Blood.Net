import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Suspense } from 'react';
import {Dashboard_Renders} from '../data/CategoryRender'
// import { getCategoryLabel } from '../data/category'
const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className='bg-black h-screen text-white text-7xl flex items-center justify-center '>Loading...</div>;
  }

  if (!user) return <div className='bg-black h-screen text-white text-7xl flex items-center justify-center'>Not logged in</div>;
  const CategoryDashboard = Dashboard_Renders[user.category];
  if (!CategoryDashboard) return <div>Unknown category</div>;

  // return <div className='text-red-400 bg-black test-9xl'>Category:{getCategoryLabel(user.category)} name:{user.name}</div>;
  return (
    <Suspense fallback={<div className="text-[#FF2D2D] bg-black h-screen flex justify-center items-center text-7xl">Loading dashboard...</div>}>
       <CategoryDashboard user={user}/>
    </Suspense>
  )
};

export default Dashboard;