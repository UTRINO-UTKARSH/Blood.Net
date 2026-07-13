import React from 'react'
// import drop from '../assets/drop.svg'
const Login = () => {
  return (
    <div className='bg-[#0a0a0f] flex flex-col justify-center items-center h-screen'>
      <div className='text-white flex  gap-3'>
        <div className='flex flex-col py-10 rounded-2xl px-9 gap-3 max-h-fit max-w-full bg-[#0f0f14] border border-[#2a2a35]'>
          <div className=' bg-red-950/59 max-w-fit rounded-3xl px-4 py-1 text-sm'>
            <span className='text-zinc-100'>🩸 Every <span className='text-[#EF4444]'>drop counts</span></span>
          </div>
          <div className='flex gap-2 flex-col'>
            <span className='text-5xl text-zinc-100 font-bold'>Connecting Care.</span>
            <span className='text-3xl font-semibold'>Saving <span className='text-red-600'>Lives.</span></span>
          </div>
          <div className='flex flex-col'>
            <span>Join a network of life-savers and heroes.</span>
            <span>Donate blood. Save lives. Be the reason</span>
            <span>someone lives today.</span>
          </div>
          <div className='mt-8 flex flex-col gap-8'>
            <div className='flex gap-5'>
              <div class="flex items-center justify-center w-15 h-15 rounded-full bg-[#17191c] border border-gray-800/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7">
                  <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7z" />
                  <path d="M12 13.5c-.8-.8-2-.8-2.8 0a2 2 0 0 0 0 2.8l2.8 2.8 2.8-2.8a2 2 0 0 0 0-2.8c-.8-.8-2-.8-2.8 0z" />
                </svg>
              </div>
              <div className='flex gap-0.5 flex-col'>
                <span className='text-zinc-200 '>Find Donors Instantly</span>
                <div className='flex text-zinc-400 flex-col'>
                  <span>Connect with nearby donors</span>
                  <span>when you need them most</span>
                </div>
              </div>
            </div>
            <div className='flex gap-5'>
              <div class="flex items-center justify-center w-15 h-15 rounded-full bg-[#17191c] border border-gray-800/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <line x1="12" y1="9" x2="12" y2="15" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                </svg>
              </div>
              <div className='flex gap-0.5 flex-col'>
                <span className='text-zinc-200 '>Trusted & Secure</span>
                <div className='flex text-zinc-400 flex-col'>
                  <span>Your data is protected with</span>
                  <span>top-tier security.</span>
                </div>
              </div>
            </div>
            <div className='flex gap-5'>
              <div class="flex items-center justify-center w-15 h-15 rounded-full bg-[#17191c] border border-gray-800/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className='flex gap-0.5 flex-col'>
                <span className='text-zinc-200 '>Strong Together</span>
                <div className='flex text-zinc-400 flex-col'>
                  <span>Be a part of a community</span>
                  <span>that saves lives.</span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className='h-40 w-40 overflow-hidden'>
            <img src={drop} alt="" className='w-full h-full object-contain block' />
          </div> */}
        </div>
        <div className='form bg-[#15151c] py-30 px-2 border border-[#3d1418]'>

        </div>
      </div>
    </div>
  )
}

export default Login