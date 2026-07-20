import React from 'react'
import LightRays from '../common/LightRays'
const BloodDonors = () => {
  return (
    // parent div
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
      {/* continue children adding */}
      <div>
        
      </div>
    </div>
  )
}

export default BloodDonors