import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
const Auth1_Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("");
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Login failed')
      }

      // handle success (redirect, store token, switch tab, etc.)
      setSuccess("success")
      setMessage("Login Successfull!")
      setPassword('')
      setEmail('')
      Navigate("/dashboard")
      console.log('Loged up:', data)
    } catch (err) {
      setMessage(err.message)
      setSuccess("failed")
      setPassword('')
    } finally {
      setLoading(false)
    }

  }
  return (
    <form onSubmit={handleSubmit} className='max-w-full gap-6 flex flex-col p-5 sm:p-9'>
      <div className='max-w-full gap-9 sm:gap-9 flex flex-col p-5 sm:p-9'>
        <div className='flex items-center flex-col gap-0.5 text-center'>
          <span className='text-2xl sm:text-3xl'>Welcome back!</span>
          <span className='text-zinc-400 text-sm'>Login to continue your lifesaving journey.</span>
        </div>
        {success && (
          <div
            className={`text-sm text-center rounded-lg py-2 px-3 ${success === "success"
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "bg-red-500/10 text-red-400 border border-red-500/30"
              }`}
          >
            {message}
          </div>
        )}


        <div className='flex relative flex-col gap-1.5'>
          <span className='text-zinc-300'>Enter Email:</span>

          <div className='absolute left-3 bottom-3.5 text-zinc-400'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            required
            placeholder="Enter your email "
            className='w-full px-11 py-3 rounded-lg bg-[#0f0f14] border border-[#2a2a35] text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-red-500'
          />
        </div>

        <div className='flex flex-col gap-1.5'>
          <span className='text-zinc-300'>Enter Password:</span>

          <div className='relative'>
            <div className='absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>

            <input
              required
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
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

          <div className='flex justify-end'>
            <a href="#" className='text-sm text-red-500 hover:text-red-400 hover:underline'>
              Forgot password?
            </a>
          </div>
        </div>

        <div>
          <button
            disabled={loading}
            type="submit"
            className='w-full cursor-pointer flex items-center justify-center gap-2 py-3 rounded-lg bg-linear-to-r from-red-500 to-red-600 text-white font-semibold hover:opacity-90 transition-opacity'
          >
            {loading ? 'Logining In...' : 'Login'}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </form >
  )
}

export default Auth1_Login