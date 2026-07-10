import React from 'react'
import Navbar from '../components/common/Navbar.jsx'
import Center from '../components/hero/Center.jsx'
import Image from '../components/common/Image.jsx'
import LightRays from '../components/common/LightRays.jsx'
import OurFeatures from '../components/features/OurFeatures.jsx'
import Stats from '../components/Stats.jsx'
import Cta from '../components/footer/Cta.jsx'
// import StoryBoard from '../components/Story/StoryBoard.jsx'
import {STORY} from "../data/act1"
import {sol} from "../data/act2"
import Comparison from '../components/comparison/Comparison.jsx'
import Problem  from '../components/Story/Problem.jsx'
const Home = () => {
  return (
    <div className="bg-[#0A0B10] max-h-fit">
     
      <div className="relative min-h-screen">

        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          fadeDistance={1}
          saturation={1}
          className=" fixed z-0 inset-0 pointer-events-none"
        />

        {/* Content Layer */}
        <div className="relative z-10 h-full flex flex-col pt-4 sm:pt-6 md:pt-8 lg:pt-10 px-4 sm:px-0">
         

          <div className="flex relative items-center justify-center flex-col">
            <Center />
            <Image />
          </div>
        </div>
        <div className='bg-[#0A0B10] z-10 min-h-auto sm:min-h-96 md:min-h-100'>
           <Problem title1={'When Every'} title2={"Second Matters..."} data={STORY}/>
        </div>
        <div className='bg-[#0A0B10] z-10 min-h-auto sm:min-h-96 md:min-h-100'>
           <Problem title1={'When Every'} title2={"Choice Matters..."} data={sol}/>
        </div>
        <div className='bg-[#0A0B10] z-10 min-h-auto sm:min-h-96 md:min-h-100'>
          <Comparison />
        </div>
        <div className='bg-[#0A0B10] z-10 max-h-fit'>
          <Cta />
        </div>
        <div className="bg-[#0A0B10] z-10 max-h-fit">
          <OurFeatures />
        </div>
        <div className='bg-[#0A0B10] z-10 min-h-auto sm:min-h-96 md:min-h-100'>
          <Stats />
        </div>
      </div>
    </div>
  );
};

export default Home