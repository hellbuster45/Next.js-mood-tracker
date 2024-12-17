'use client'
import { useEffect, useState } from 'react';
import { Fugaz_One } from 'next/font/google';
import React from 'react';
import Calendar from './Calendar';
import { useAuth } from '@/context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Login from './Login';
import Loading from './Loading';

const fugaz = Fugaz_One({subsets : ["latin"], weight: ['400'], display: "swap"});

export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth()
  const [ data, setData ] = useState({})
  const now = new Date()
  
  const moods = {
    'awful': '😢',
    'sad': '🙁',
    'meh': '😐',
    'good': '😊',
    'happy': '😄',
  }

  function countValues() {
    let total_number_of_days = 0
    let sum_moods = 0

    for(let year in data)
     for(let month in data[year])
      for(let day in data[year][month])
      {
        let days_mood = data[year][month][day]
        total_number_of_days++
        sum_moods += days_mood
      }
    return { num_days: total_number_of_days, average_mood: sum_moods / total_number_of_days }
  }
  
  const statuses = {
    ...countValues(),
    time_remaining: `${23 - now.getHours()}h : ${60 - now.getMinutes()}m`
  };

  async function handleSetMood(mood) {
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()

    try {
      const newData = { ...userDataObj }
      if(!newData?.[year])  
      {
        newData[year] = {}
      }

      if(!newData?.[year]?.[month])
      {
        newData[year][month] = {}
      }
      newData[year][month][day] = mood

      // update the current state
      setData(newData)

      // update the global state
      setUserDataObj(newData, {
        [year]:{
          [month]:{
            [day]:mood
          }
        }
      }, {merge: true})

      // update firebase
      const docRef = doc(db, 'users', currentUser.uid)
      const res = await setDoc(docRef, newData)
    } catch(err) {
      console.log("Setting of Data failed, ", err.message)
    }
  }

  useEffect(() => {
    if(!currentUser || !userDataObj) {
      return
    }
    setData(userDataObj)
  }, [  currentUser, userDataObj])

  if(loading) {
    return <Loading/>
  }
  if(!currentUser) {
    return <Login/>
  }

  return (
    <div className={'flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16 '}>
      <div className={'grid grid-cols-3 text-center text-blue-300 gap-4 p-4 '}>
        {Object.keys(statuses).map((status, statusIndex) => { // Fixed the arrow function syntax
          return (
            <div key={statusIndex} className= {'flex flex-col '}>
              <p className = {'font-medium capitalize text-xs sm:text-sm truncate '}>{status.replaceAll('_', ' ')}</p>
              <p className = {'text-lg sm:text-xl truncate ' + fugaz.className}>{statuses[status]}{status === 'num_days' ? ' 🔥' : ''}</p>
            </div>
          );
        })}
      </div>

      <p className= {'text-5xl sm:text-6xl md:text-7xl text-center ' + fugaz.className}>How do you <span className= {'textgradient '}>feel</span> today?</p>
      <div className = {'grid grid-cols-2 p-2 gap-2  sm:grid-cols-5 '}>
        {Object.keys(moods).map((mood, moodIndex) =>
        {
          return (
          <button onClick={() => {
            const currentMoodValue = moodIndex + 1
            handleSetMood(currentMoodValue)
          }}  className = {'rounded-xl button1 duration-300 hover:bg-blue-600 ' + (moodIndex === 4 ? 'col-span-2 sm:col-span-1 ': ' ')} key={moodIndex}>
            <p className= {'p-2 text-4xl sm:text-5xl md:text-6xl '}>{moods[mood]}</p>
            <p className = {'p-2 text-sm sm:text-base md:text-lg ' + fugaz.className}>{mood}</p>
          </button>
        );
        })}
      </div>
      <Calendar completeData={data} handleSetMood={handleSetMood} />
    </div>
  );
}
