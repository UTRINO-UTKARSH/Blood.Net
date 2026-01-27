import React from 'react'

const Center = () => {
    return (
        <div className='vanishing-image'>
            <div className='flex flex-col my-15 items-center'>
                <span className='text-red-500 head1 font-bold text-8xl'>BLOOD</span>
                <span className='text-red-500 head2 font-bold text-8xl'>DONATION</span>
                <span className='my-6 semi1 text-6xl'>Saves Lives</span>
                <span className='text-4xl semi1 font-extrabold tracking-widest'>. . . . . . . .</span>
            </div>
            <div className='flex flex-col semi1 my-15 items-center'>
                <span className='text-2xl font-bold title bg-pink-200 rounded-full px-7 py-1'>Together, were Stronger</span>
                <p className='my-3 text-2xl italic font-semibold flex'>Connecting donors and recipients
when every second matters</p>
            </div>
        </div>
    )
}

export default Center