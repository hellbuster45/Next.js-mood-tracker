import { Fugaz_One } from 'next/font/google';
import React from 'react'
import Button from './Button';

const fugaz = Fugaz_One({subsets : ["latin"], weight: ['400']});

export default function Login() {
  return (
    <div className = {'flex flex-col flex-1 justify-center gap-4 place-items-center w-full '}>
      <h3 className = {'px-5 py-5 gap-5 flex flex-col text-xl sm:text-2xl md:text-3xl place-items-center border-2 border-white ' + fugaz.className}>
        <span className = {'py-1 headgradient '}>Login / Register</span>
        <p className = {'text-sm sm:text-lg md:text-2xl '}>You're one step away</p>
      </h3>
      <input className= {'text-black w-full max-w-[275px] border-2 border-blue-200 mx-auto px-3 py-2 sm:py-3 hover:border-amber-600 focus:border-amber-600 rounded-full outline-none '} placeholder='E-mail ' />
      <input className= {'text-black w-full max-w-[275px] border-2 border-blue-200 mx-auto px-3 py-2 sm:py-3 hover:border-amber-600 focus:border-amber-600 rounded-full outline-none '} placeholder='Password ' type='Password' />
      <div className = {'w-full max-w-[250px] '}>
        <Button text="Login" dark full></Button>
      </div>
      <p className = {'text-center '}>Don't have an account? <span className = {'text-amber-600 '}>Sign Up</span></p>
    </div>
  )
}
