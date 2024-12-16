import { Fugaz_One } from 'next/font/google';
import React from 'react';
import Calendar from './Calendar';

const fugaz = Fugaz_One({subsets : ["latin"], weight: ['400'], display: "swap"});

export default function Dashboard() {
  const statuses = {
    number_of_days: 14,
    time_remaining: "13:14:26",
    date: (new Date().toDateString())
  };

  const moods = {
    'awful': '😢',
    'sad': '🙁',
    'meh': '😐',
    'good': '😊',
    'happy': '😄',
  }

  return (
    <div className={'flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16 '}>
      <div className={'grid grid-cols-3 text-center text-blue-300 gap-4 p-4 '}>
        {Object.keys(statuses).map((status, statusIndex) => { // Fixed the arrow function syntax
          return (
            <div key={statusIndex} className= {'flex flex-col '}>
              <p className = {'font-medium uppercase text-xs sm:text-sm truncate '}>{status.replaceAll('_', ' ')}</p>
              <p className = {'text-lg sm:text-xl truncate ' + fugaz.className}>{statuses[status]}</p>
            </div>
          );
        })}
      </div>

      <p className= {'text-5xl sm:text-6xl md:text-7xl text-center ' + fugaz.className}>How do you <span className= {'textgradient '}>feel</span> today?</p>
      <div className = {'grid grid-cols-2 sm:grid-cols-5 p-4 gap-4 md:grid-col-5 '}>
        {Object.keys(moods).map((mood, moodIndex) =>
        {
          return (
          <button className = {'rounded-xl transform-gpu button1 duration-300 hover:bg-indigo-700 ' + (moodIndex === 4 ? 'col-span-2 sm:col-span-1 ': ' ')} key={moodIndex}>
            <p className= {'p-4 text-5xl sm:text-6xl md:text-7xl '}>{moods[mood]}</p>
            <p className = {'text-xs sm:text-sm md:text-base ' + fugaz.className}>{mood}</p>
          </button>
        );
        })}
      </div>
      <Calendar/>
    </div>
  );
}
