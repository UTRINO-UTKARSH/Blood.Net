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
    title: "Connect",
    desc: "During the time of need or crisis seamlessly link with healthcare providers and community members in real-time.",
    img :first,
    value:"Let's Connect"
  },
  {
    title: "Doctors/Hospital Registration",
    desc: "A streamlined portal for medical professionals to join our network and manage their profiles.",
    img:second,
    value:"Join the Network"
  },
  {
    title: "Donor Registration",
    desc: "Sign up to save lives by becoming a verified organ or tissue donor in just a few clicks.",
    img:third,
    value:"Let's Save Lives"
  },
  {
    title: "Get Ambulance",
    desc: "Emergency rapid-response booking to get medical help to your location immediately.",
    img:fourth,
    theme:"red",
    value:"Dispatch Now"
  },
  {
    title: "Blood Banks",
    desc: "Locate nearby blood centers, check availability, and schedule your next donation.",
    img:fifth,
    value:"Share Life"
  }
];
const OurFeatures = () => {

  return (
    <div className='min-h-screen intro relative py-20 px-10 justify-center  items-center '>
      <h2 className='text-white title text-7xl font-extrabold text-center mb-10'><Typewriter /></h2>
      <div className='flex  justify-center flex-wrap gap-6'>
       {features.map((item,index)=> (
          <Cards key={index} title = {item.title} desc = {item.desc} value={item.value} img = {item.img} theme = {item.theme} />
       ))}
      </div>
      {/* Add your features content here */}
    </div>
  )
}

export default OurFeatures