import React from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { Droplet } from 'lucide-react'
const Box = () => {
    // convert it into a prop
  const {user} = useAuth()
  return (
    <div className="flex flex-wrap sm:flex-nowrap gap-4">
          <div className="relative overflow-hidden rounded-3xl bg-[#141C2E] border border-white/5 flex flex-col justify-between w-60 h-34 p-3">
            <div className="flex flex-col z-10">
              <span className="text-red-300 text-m font-semibold tracking-wider uppercase">
                Blood <br /> Group
              </span>
            </div>
            
            <div className="flex items-end justify-between z-10">
              <span className="text-4xl font-bold tracking-tight text-[#FF8A8A]">
                {user?.bloodGroup || 'O+'}
              </span>
            </div>

            {/* Decorative background droplet icon matching the design */}
            <div className="absolute -right-5 top-0 w-24 h-24 bg-[#FF2D2D]/12 rounded-2xl rotate-20 flex items-center justify-center backdrop-blur-sm">
              <Droplet className="w-10 h-10 text-[#FF8A8A]/80 fill-[#FF8A8A]/20" />
            </div>
          </div>

        </div>
  )
}

export default Box