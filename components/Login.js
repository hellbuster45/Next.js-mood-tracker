'use client'
import { Fugaz_One } from 'next/font/google';
import React, { useState } from 'react'
import Button from './Button';
import { useAuth } from '@/context/AuthContext';

const fugaz = Fugaz_One({subsets : ["latin"], weight: ['400']});

export default function Login() {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ isRegister, setIsRegister ] = useState(false)
  const { signup, login }  = useAuth()
  const [ authenticating, setAuthenticating ] = useState(false)
  async function handleSubmit() {
    if(!email || !password || password.length < 6)
    {
      return
    } 
    setAuthenticating(true)
    try {
      if(isRegister) {
        console.log("Signing up a new User! ")
        await signup(email, password)
      } else {
        console.log("Logging in a User! ")
        await login(email, password)
      } 
    } catch (error) {
      console.log(error.message)
    } finally {
      setAuthenticating(false)
    }
  }

  return (
    <div className = {'flex flex-col flex-1 justify-center gap-4 place-items-center w-full '}>
      <h3 className = {'px-5 py-5 gap-5 flex flex-col text-xl sm:text-2xl md:text-3xl place-items-center ' + fugaz.className}>
        <span className = {'py-1 headgradient '}>{isRegister ? 'Register' : 'Login'}</span>
        <p className = {'text-sm sm:text-lg md:text-2xl '}>You're one step away</p>
      </h3>

      <input value={email} onChange={(e) => {
        setEmail(e.target.value)
      }} className= {'bg-black w-full max-w-[275px] border-2 mx-auto px-3 py-2 sm:py-3 hover:border-blue-400 focus:border-blue-600 rounded-full outline-none '} placeholder='E-mail ' />

      <input value={password} onChange={(e) => {
        setPassword(e.target.value)
      }} className= {'bg-black w-full max-w-[275px] border-2 mx-auto px-3 py-2 sm:py-3 hover:border-blue-400 focus:border-blue-600 rounded-full outline-none '} placeholder='Password ' type='Password' />

      <div className = {'w-full max-w-[250px] '}>
        <Button clickHandler={handleSubmit} text={ authenticating ? "Submitting" : "Submit"} dark full></Button>
      </div>

      <p className = {'text-center '}>
        {isRegister ? 'Already have an account? ' : 'Don\'t have an account? '} 
        <button onClick={() => setIsRegister(!isRegister)} className = {'text-amber-600 '}>{isRegister ? 'Sign in' : 'Sign Up'}</button>
      </p>
    </div>
  )
}
