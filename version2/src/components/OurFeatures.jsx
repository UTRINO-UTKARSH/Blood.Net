import React from 'react'
import Cards from './Cards'
import Typewriter from './Typewriter'
import first from '../assets/connect2.png'
import second from '../assets/doctor.png'
import third from '../assets/donor.png'
import fourth from '../assets/ambulance.png'
import fifth from '../assets/blood_bank.png'
const features = [
  {
    title: "Need Blood?",
    desc: "Quickly find nearby blood donors, blood banks and hospitals during medical emergencies.",
    img: first,
    value: "Find Help"
  },
  {
    title: "Healthcare Providers",
    desc: "Hospitals, doctors and clinics can join the network to provide faster emergency assistance.",
    img: second,
    value: "Join Network"
  },
  {
    title: "Become a Donor",
    desc: "Register as a verified blood donor and help save lives whenever an emergency request arises.",
    img: third,
    value: "Register Now"
  },
  {
    title: "Emergency Ambulance",
    desc: "Locate and request nearby ambulance services for rapid emergency transportation.",
    img: fourth,
    theme: "red",
    value: "Request Ambulance"
  },
  {
    title: "Blood Banks",
    desc: "Search nearby blood banks, check blood availability and contact them instantly.",
    img: fifth,
    value: "Find Blood Banks"
  }
];
const OurFeatures = () => {

  return (
    <div className='min-h-screen intro relative py-10 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 justify-center items-center flex flex-col'>
      <h2 className='text-white title text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-center mb-8 sm:mb-12 md:mb-16'><Typewriter
      className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'
        deleteText={true}
        cursor={"|"}
        loop={true}
        sentences={[
          "Choose Your Service",
          "Our Services",
          "One Platform. Many Solutions."]} />
          </h2>
      <div className='flex justify-center flex-wrap gap-4 sm:gap-6 md:gap-8 w-full max-w-6xl mx-auto'>
        {features.map((item, index) => (
          <Cards key={index} {...item} />
        ))}
      </div>
    </div>
  )
}

export default OurFeatures