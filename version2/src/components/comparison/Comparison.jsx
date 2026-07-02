import React from 'react'

const withoutItems = [
  'Searching for the right hospital during an emergency.',
  'Calling multiple places to find available blood.',
  'Information scattered across different sources.',
  'Uncertainty leads to delayed decisions.',
  'Every answer requires another phone call.',
  'Valuable time is lost in searching.',
  'Family members struggle to coordinate.',
  'Panic grows as questions increase.',
]

const withItems = [
  'Know nearby hospitals before every second counts.',
  'Access verified blood availability in one place.',
  'Essential emergency resources, connected together.',
  'Clear information helps you decide faster.',
  'Important details are available instantly.',
  'Valuable time is spent taking action.',
  'Everyone can access the same verified information.',
  'Confidence grows when information is available.',
]

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0">
    <circle cx="12" cy="12" r="11" stroke="#ED363D" strokeWidth="1.2" />
    <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="#ED363D" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0">
    <circle cx="12" cy="12" r="11" stroke="#E5E5E5" strokeWidth="1.2" />
    <path d="M7.5 12.5l3 3 6-6" stroke="#E5E5E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const SadFaceIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
    <circle cx="24" cy="24" r="22" stroke="#CD4137" strokeWidth="1.5" />
    <circle cx="17" cy="20" r="1.5" fill="#CD4137" />
    <circle cx="31" cy="20" r="1.5" fill="#CD4137" />
    <path d="M17 31c2-3 5-4.5 7-4.5s5 1.5 7 4.5" stroke="#CD4137" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const ShieldCheckIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
    <circle cx="24" cy="24" r="22" stroke="#F7F7F7" strokeWidth="1.5" />
    <path d="M24 13l8 3v6c0 6-3.5 9.5-8 11-4.5-1.5-8-5-8-11v-6l8-3z" stroke="#F7F7F7" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M20.5 23.5l2.5 2.5 5-5" stroke="#F7F7F7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ClockIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
    <line x1="4" y1="16" x2="20" y2="16" stroke="#CD4137" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="2" y1="22" x2="18" y2="22" stroke="#CD4137" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="6" y1="28" x2="20" y2="28" stroke="#CD4137" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    <circle cx="28" cy="24" r="14" stroke="#CD4137" strokeWidth="1.5" />
    <path d="M28 16v8l6 4" stroke="#CD4137" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Comparison = () => {
  return (
    <div className='intro min-h-screen py-20 flex-col gap-3 flex items-center px-4'>

      {/* Eyebrow badge */}
      <div className='border z-50 text-4xl bg-red-900/20 flex justify-center text-center max-w-fit rounded-xl
        px-5 py-4 transition-all duration-300 hover:scale-105 items-center border-red-900'>
        <h1 className='text-[#f70101] text-sm font-bold tracking-widest'>THE DIFFERENCE</h1>
      </div>

      {/* Heading */}
      <div className='flex text-center flex-col z-50'>
        <span className='text-6xl md:text-8xl font-bold text-white'>Two Different</span>
        <span className='text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-linear-to-b 
          from-[#FF6B6B] to-[#DC2626]'>Experiences.</span>
        <div className='flex flex-col text-lg mt-3 text-zinc-300'>
          <span>The emergency is the same.</span>
          <span>The experience doesn't have to be.</span>
        </div>
      </div>

      {/* Comparison cards */}
      <div className='z-50 w-full max-w-6xl mt-10'>
        <div className='relative  grid grid-cols-1 md:grid-cols-2 gap-2 border border-[#870e36c8] rounded-2xl p-6 md:p-10'>

          {/* VS badge */}
          <div className='hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            w-14 h-14 rounded-full bg-black border border-white/20 items-center justify-center z-10'>
            <span className='text-white font-bold text-sm'>VS</span>
          </div>

          {/* WITHOUT column */}
          <div className='flex flex-col items-center bg-[#150C0F] rounded-xl px-7'>
            <div className='bg-[#4F3F40] rounded-full px-4 py-1.5 mb-4'>
              <span className='text-white text-xs font-semibold tracking-wider'>WITHOUT BLOOD.NET</span>
            </div>
            <SadFaceIcon />
            <h2 className='text-white text-2xl font-semibold mt-4 mb-6 text-center'>
              Chaos. Uncertainty. Panic.
            </h2>
            <div className='flex flex-col gap-2.5 w-full'>
              {withoutItems.map((item, i) => (
                <div key={i} className='flex items-center gap-3 bg-[#3E2E30] rounded-lg px-4 py-3'>
                  <XIcon />
                  <span className='text-[#E5E5E5] text-sm'>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* WITH column */}
          <div className='flex flex-col items-center bg-[#08090F] rounded-xl px-7'>
            <div className='bg-[#39393F] rounded-full px-4 py-1.5 mb-4'>
              <span className='text-white text-xs font-semibold tracking-wider'>WITH BLOOD.NET</span>
            </div>
            <ShieldCheckIcon />
            <h2 className='text-white text-2xl font-semibold mt-4 mb-6 text-center'>
              Clarity. Confidence. Control.
            </h2>
            <div className='flex flex-col gap-2.5 w-full'>
              {withItems.map((item, i) => (
                <div key={i} className='flex items-center gap-3 bg-[#39383E] rounded-lg px-4 py-3'>
                  <CheckIcon />
                  <span className='text-[#E5E5E5] text-sm'>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom summary bar */}
        <div className='mt-6 border border-[#2A1518] rounded-2xl bg-[#232326] px-6 md:px-10 py-6
          flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10'>
          <div className='flex items-center gap-4'>
            <ClockIcon />
            <p className='text-white text-lg font-semibold leading-snug text-center md:text-left'>
              The emergency cannot always <span className='text-[#CD4137]'>be prevented.</span>
            </p>
          </div>
          <div className='hidden md:block w-px h-10 bg-white/10' />
          <p className='text-white text-lg font-semibold text-center md:text-left'>
            The confusion <span className='text-[#CD4137]'>can.</span>
          </p>
        </div>
      </div>

      {/* Closing line */}
      <div className='flex flex-col items-center text-center mt-10 z-50'>
        <h3 className='text-3xl font-bold text-white'>
          That's why <span className='text-[#CD4137]'>Blood.net</span> exists.
        </h3>
        <p className='text-zinc-400 mt-2'>One platform. Every life matters.</p>
      </div>
    </div>
  )
}

export default Comparison