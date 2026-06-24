import React from 'react'

const Center = () => {
    return (
        <div className='vanishing-image flex flex-col  items-center mt-16 md:mt-24'>

            {/* Main Hero */}
            <div className='flex flex-col items-center text-center'>

                <h1 className='text-white head1 font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight'>
                    One Network For
                </h1>

                <h2 className='mt-4 text-white head2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium'>
                    Blood, Hospitals and
                </h2>

                <h2 className='mt-2 semi1 text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl'>
                    Emergency Care
                </h2>

                <div className='mt-4 text-white tracking-[0.5em] text-lg'>
                    • • • • • • •
                </div>

            </div>

            {/* Subtitle */}
            <div className='showup semi2 flex flex-col items-center text-center mt-10 px-4'>

                <span className='text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-gray-200 rounded-full px-6 py-2 text-black'>
                    Connecting Care. Saving Lives.
                </span>

                <p className='mt-4 text-white text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl italic font-medium'>
                    Find blood donors, blood banks, hospitals and emergency
                    services when every second matters.
                </p>

            </div>

        </div>
    )
}

export default Center