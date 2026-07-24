import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import {getCategoryLabel} from '../data/category'
const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className='bg-black h-screen text-white text-7xl flex items-center justify-center '>Loading...</div>;
  }

  if (!user) return <div>Not logged in</div>;


  return <div className='text-red-400 bg-black test-9xl'>Category:{getCategoryLabel(user.category)} name:{user.name}</div>;
};

export default Dashboard;