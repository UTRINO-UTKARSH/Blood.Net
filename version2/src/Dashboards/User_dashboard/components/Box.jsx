import React from 'react'

const Box = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-[#FF8A8A]',
  iconBg = 'bg-[#FF2D2D]/12',
  valueColor = 'text-[#FF8A8A]',
  titleColor = 'text-red-300',
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#141C2E] border border-white/5 flex flex-col justify-between w-60 h-34 p-3">

      {/* Title */}
      <div className="flex flex-col z-10">
        <span
          className={`${titleColor} text-sm font-semibold tracking-wider uppercase`}
        >
          {title}
        </span>
      </div>

      {/* Value / Subtitle */}
      <div className="flex items-end justify-between z-10">

        <div>
          {value && (
            <span
              className={`text-4xl font-bold tracking-tight ${valueColor}`}
            >
              {value}
            </span>
          )}

          {subtitle && (
            <span className="block text-xs text-white/50">
              {subtitle}
            </span>
          )}
        </div>

      </div>

      {/* Decorative Icon */}
      {Icon && (
        <div
          className={`absolute -right-5 top-0 w-24 h-24 ${iconBg} rounded-2xl rotate-20 flex items-center justify-center backdrop-blur-sm`}
        >
          <Icon
            className={`w-10 h-10 ${iconColor}`}
          />
        </div>
      )}

    </div>
  )
}

export default Box