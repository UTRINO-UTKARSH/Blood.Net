import React, { useState } from 'react'
import drop from '../assets/drop.svg'
import Auth1_Login from '../components/features/Auth1_Login'
import Auth1_SignUp from '../components/features/Auth1_SignUp'
const Login = () => {
  const [activeTab, setActiveTab] = useState('login')
  return (

    <div className='bg-[#0a0a0f] flex flex-col justify-center items-center min-h-screen py-10 px-4'>
      <div className='text-white flex flex-col lg:flex-row gap-6 w-full max-w-6xl'>
        <div className='relative flex flex-col flex-1 py-10 rounded-2xl px-6 sm:px-9 gap-3 bg-[#0f0f14] border border-[#2a2a35] overflow-hidden'>

          <div className='relative z-10 bg-red-950/59 max-w-fit rounded-3xl px-4 py-1 text-sm'>
            <span className='text-zinc-100'>🩸 Every <span className='text-[#EF4444]'>drop counts</span></span>
          </div>

          <div className='relative z-10 flex gap-2 flex-col'>
            <span className='text-3xl sm:text-4xl lg:text-5xl text-zinc-100 font-bold'>Connecting Care.</span>
            <span className='text-2xl sm:text-3xl font-semibold'>Saving <span className='text-red-600'>Lives.</span></span>
          </div>

          <div className='relative z-10 flex flex-col text-zinc-400'>
            <span>Join a network of life-savers and heroes.</span>
            <span>Donate blood. Save lives. Be the reason</span>
            <span>someone lives today.</span>
          </div>

          <div className='relative z-10 mt-8 flex flex-col gap-8'>
            <div className='flex gap-5'>
              <div className="flex items-center justify-center w-15 h-15 shrink-0 rounded-full bg-[#17191c] border border-gray-800/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                  <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7z" />
                  <path d="M12 13.5c-.8-.8-2-.8-2.8 0a2 2 0 0 0 0 2.8l2.8 2.8 2.8-2.8a2 2 0 0 0 0-2.8c-.8-.8-2-.8-2.8 0z" />
                </svg>
              </div>
              <div className='flex gap-0.5 flex-col'>
                <span className='text-zinc-200'>Find Donors Instantly</span>
                <div className='flex text-zinc-400 flex-col'>
                  <span>Connect with nearby donors</span>
                  <span>when you need them most</span>
                </div>
              </div>
            </div>
            <div className='flex gap-5'>
              <div className="flex items-center justify-center w-15 h-15 shrink-0 rounded-full bg-[#17191c] border border-gray-800/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <line x1="12" y1="9" x2="12" y2="15" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                </svg>
              </div>
              <div className='flex gap-0.5 flex-col'>
                <span className='text-zinc-200'>Trusted & Secure</span>
                <div className='flex text-zinc-400 flex-col'>
                  <span>Your data is protected with</span>
                  <span>top-tier security.</span>
                </div>
              </div>
            </div>
            <div className='flex gap-5'>
              <div className="flex items-center justify-center w-15 h-15 shrink-0 rounded-full bg-[#17191c] border border-gray-800/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className='flex gap-0.5 flex-col'>
                <span className='text-zinc-200'>Strong Together</span>
                <div className='flex text-zinc-400 flex-col'>
                  <span>Be a part of a community</span>
                  <span>that saves lives.</span>
                </div>
              </div>
            </div>
          </div>


          <div className='h-65 w-60 right-6 absolute z-1 mt-100 overflow-hidden'>
            <img src={drop} alt="" className='w-full h-full object-contain block' />
          </div>
        </div>

        <div className='form bg-[#15151c] flex-1 items-center flex flex-col rounded-2xl py-10 px-6 sm:px-9 border border-[#3d1418]'>
          <div className='flex justify-center gap-9'>
            <button
              onClick={() => setActiveTab('login')}
              className={`pb-3 cursor-pointer text-xl font-medium border-b-2 transition-colors ${activeTab === 'login'
                  ? 'text-red-500 border-red-500'
                  : 'text-zinc-400 border-transparent hover:text-zinc-200'
                }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`pb-3 cursor-pointer text-xl font-medium border-b-2 transition-colors ${activeTab === 'signup'
                  ? 'text-red-500 border-red-500 border-b-3 '
                  : 'text-zinc-400 border-transparent hover:text-zinc-200'
                }`}
            >
              Sign Up
            </button>
          </div>
          <div className='border-b-3 border-[#2a2a35] w-4/10'></div>
          {activeTab === 'login' ? <Auth1_Login /> : <Auth1_SignUp />}
        </div>
      </div>
    </div>
  )
}

export default Login