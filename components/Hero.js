import { Fugaz_One , Open_Sans} from 'next/font/google';
import React from 'react'
import Button from './Button';
import Calendar from './Calendar';

const fugaz = Fugaz_One({subsets : ["latin"], weight: ['400']});
const opensans = Open_Sans({subsets : ["latin"], weight: ['400']});

export default function Hero() {
  return (
    <div className = {'py-10 md:py-10 flex flex-col gap-4 sm:gap-8 ' + fugaz.className}>
      <h1 className = {'text-4xl sm-text-text-6xl md:text-7xl text-center' }>
        Yo me is practicing <span className= {'textgradient '}>yeaaaaaaaaa!!</span>
      </h1>

      <p className = {'text-center text-lg sm:text-xl md:text-2xl w-full mx-auto max-w-[800px] ' + opensans.className}>
        less <span className = {'font-semibold '}>get itt!!!</span>
      </p>

      <div className = {'grid grid-cols-2 gap-4 mx-auto '}>
        <Button text = "Sign Up" />
        <Button text = "Login" dark/>
      </div>

      <Calendar demo/>
    </div>
  )
}
