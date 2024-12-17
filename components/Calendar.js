'use client'
import { baseRating, gradients } from '@/utils/gradients'
import { Fugaz_One } from 'next/font/google'
import React, { useState } from 'react'

const months = { 'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug', 'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec' }
const monthsArr = Object.keys(months)
const now = new Date()
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

export default function Calendar(props) {
  const { demo, completeData, handleSetMood } = props

  const now = new Date()
  const currMonth = now.getMonth()
  const [ selectedMonth, setSelectedMonth ] = useState(Object.keys(months)[currMonth])
  const [ selectedYear, setSelectedYear ] = useState(now.getFullYear())

  const monthNow = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth) + 1)
  const firstDayOfMonth = monthNow.getDay()
  const daysInMonth = new Date(selectedYear, Object.keys(selectedMonth).indexOf(selectedMonth) + 1, 0).getDate()

  const daysToDisplay = firstDayOfMonth + daysInMonth
  const numRows = (Math.floor(daysToDisplay / 7)) + (daysToDisplay % 7 ? 1 : 0)

  const numericMonth = monthsArr.indexOf(selectedMonth)
  const data = completeData?.[selectedYear]?.[numericMonth] || {}
  console.log("this month's data", completeData?.[selectedYear]?.[selectedMonth])
  
  function handleIncrementMonth(value) {
    console.log("value is", numericMonth + value)

    if(numericMonth + value < 0) {
      // set month value to 11 and decrement the year
      setSelectedYear(curr => curr - 1)
      setSelectedMonth(monthsArr[monthsArr.length - 1])
    } else if(numericMonth + value > 11) {
      // set month value to 0 and increment the year
      setSelectedYear(curr => curr + 1)
      setSelectedMonth(monthsArr[0])
    } else {
      setSelectedMonth(monthsArr[numericMonth + value])
    }
  }

  return (
    <div className= {'flex flex-col gap-2 '}>
      <div className = {'grid grid-cols-5 gap-4 '}>
        <button onClick={() => {
          handleIncrementMonth(-1)
        }}  className={'ml-auto'}>
        <i className={"fa-solid fa-arrow-left"}></i>
        </button>
        <p className = {'text-center col-span-3 capitalized ' + fugaz.className}>
          {selectedMonth}, {selectedYear}
        </p>
        <button onClick={() => {
          handleIncrementMonth(1)
        }}  className={'mr-auto'}>
        <i className={"fa-solid fa-arrow-right"}></i>
        </button>
      </div>

      <div className = {'flex flex-col py-2 sm:py-4 md:py-6 '}> 
        {[...Array(numRows).keys().map((row, rowIndex) => {
          return (
            <div key={rowIndex} className= {'grid grid-cols-7 gap-3 p-1 '}>
              {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                let dayIndex = (rowIndex * 7) + dayOfWeekIndex - (firstDayOfMonth - 1)
                let dayDisplay = dayIndex > daysInMonth ? false : (row === 0 && dayOfWeekIndex < firstDayOfMonth) ? false : true 
                let isToday = dayIndex === now.getDate()

                if(!dayDisplay)
                {
                  return (
                    <div className = {' '} key={dayOfWeekIndex}/>
                    )
                  }
                  
                  let color = demo ? gradients.blue[baseRating[dayIndex]] : dayIndex in data ? gradients.blue[data[dayIndex]] : "black"
                  
                  return (
                    <div style={{background: color}} key={dayOfWeekIndex} className = {'flex p-2 justify-center text-xs sm:text-sm border-2 border-solid rounded-lg  ' + (isToday ? 'border-x-2 border-blue-400 ' : 'border-slate-700 ') + (color === 'white' ? 'text-blue-400 ' : 'text-white ')}>
                    <p>{dayIndex}</p>
                  </div>
                )
              })}
            </div>
          )
        })]}
      </div>
    </div>
  )
}
