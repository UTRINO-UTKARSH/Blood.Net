/* eslint-disable no-unused-vars */
import React from 'react'

const ActionBox = ({
  title,
  subtitle,
  icon: Icon,
  iconColor = 'text-white',
  iconBg = 'bg-white/10',
}) => {
  return (
    <div className="flex-1 min-w-35 cursor-pointer rounded-2xl bg-[#141C2E] p-6">
      <div
        className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center mb-4`}
      >
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <h3 className="text-xl font-semibold text-white">
        {title}
      </h3>
      <p className="text-sm text-[#FFB6A8] mt-1">
        {subtitle}
      </p>

    </div>
  )
}

export default ActionBox