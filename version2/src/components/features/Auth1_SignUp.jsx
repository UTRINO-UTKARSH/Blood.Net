import React, { useState } from 'react'

const Auth1_SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [name, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    setLoading(true)
    try {
      const res = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, category }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Sign up failed')
      }

      // handle success (redirect, store token, switch tab, etc.)
      console.log('Signed up:', data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='max-w-full gap-6 flex flex-col p-5 sm:p-9'>
      <div className='flex items-center flex-col gap-0.5 text-center'>
        <span className='text-2xl sm:text-3xl'>Create your account</span>
        <span className='text-zinc-400 text-sm'>Join the network of life-savers today.</span>
      </div>

      {error && (
        <div className='text-red-500 text-sm text-center bg-red-950/30 border border-red-900/50 rounded-lg py-2 px-3'>
          {error}
        </div>
      )}

      {/* Full Name */}
      <div className='flex relative flex-col gap-1.5'>
        <span className='text-zinc-300'>Full Name:</span>
        <div className='absolute left-3 bottom-3.5 text-zinc-400 pointer-events-none'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
          className='w-full px-11 py-3 rounded-lg bg-[#0f0f14] border border-[#2a2a35] text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-red-500'
        />
      </div>

      {/* Email */}
      <div className='flex relative flex-col gap-1.5'>
        <span className='text-zinc-300'>Email:</span>
        <div className='absolute left-3 bottom-3.5 text-zinc-400 pointer-events-none'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M4 4h16v16H4z" opacity="0" />
            <path d="M22 6c0-1.1-.9-2-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V6z" />
            <path d="m22 6-10 7L2 6" />
          </svg>
        </div>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className='w-full px-11 py-3 rounded-lg bg-[#0f0f14] border border-[#2a2a35] text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-red-500'
        />
      </div>

      {/* Password */}
      <div className='flex flex-col gap-1.5'>
        <span className='text-zinc-300'>Password:</span>
        <div className='relative'>
          <div className='absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            className='w-full pl-11 pr-11 py-3 rounded-lg bg-[#0f0f14] border border-[#2a2a35] text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-red-500'
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200'
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div className='flex flex-col gap-1.5'>
        <span className='text-zinc-300'>Confirm Password:</span>
        <div className='relative'>
          <div className='absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your password"
            className='w-full pl-11 pr-11 py-3 rounded-lg bg-[#0f0f14] border border-[#2a2a35] text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-red-500'
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200'
          >
            {showConfirmPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* User Category */}
      <div className='flex flex-col gap-1.5'>
        <span className='text-zinc-300'>User Category:</span>

        <div className='relative'>
          <div className='absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M12 2v20" />
              <path d="M5 7h14" />
              <path d="M5 17h14" />
            </svg>
          </div>

          <select
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='w-full pl-11 pr-10 py-3 rounded-lg bg-[#0f0f14] border border-[#2a2a35] text-zinc-200 focus:outline-none focus:border-red-500 appearance-none'
          >
            <option value="" disabled className='bg-[#0f0f14]'>
              Select your category
            </option>

            <option value="1">Patient</option>
            <option value="2">Blood Donor</option>
            <option value="3">Hospitals</option>
            <option value="4">Blood Banks</option>
            <option value="5">Individual Doctor</option>
          </select>

          <div className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>
      <div className='flex items-start gap-2'>
        <input
          type="checkbox"
          required
          id="terms"
          className='mt-1 accent-red-500'
        />
        <label htmlFor="terms" className='text-sm text-zinc-400'>
          I agree to the <a href="#" className='text-red-500 hover:underline'>Terms of Service</a> and <a href="#" className='text-red-500 hover:underline'>Privacy Policy</a>
        </label>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className='w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-linear-to-r from-red-500 to-red-600 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loading ? 'Creating account...' : 'Sign Up'}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default Auth1_SignUp