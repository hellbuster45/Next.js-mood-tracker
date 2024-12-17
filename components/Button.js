import React from 'react'
import {Fugaz_One, Inter} from "next/font/google";

const fugaz = Fugaz_One({subsets : ["latin"], weight: ['400'], display: "swap"});

export default function Button(prop) {
    const { text, dark, full, clickHandler } = prop;
  return (
    <button onClick={clickHandler} className = {'rounded-full overflow-hidden border-2 border-indigo-600 duration-200 hover:opacity-60 ' + 
        (dark ? 'text-white bg-indigo-600 ' : 'text-indigo-600 ') + 
        (full ? 'grid place-items-center w-full ' : ' ')}>

        <p className = {'px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3  ' + fugaz.className}>{text}</p>
    </button>
  )
}
