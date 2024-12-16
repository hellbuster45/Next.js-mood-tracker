import { baseRating, demoData, gradients } from '@/utils/gradients'
import { Fugaz_One } from 'next/font/google'
import React from 'react'

const months = { 'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug', 'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec' }
const monthsArr = Object.keys(months)
const now = new Date()
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

export default function Calendar(props) {
  const {demo} = props
  const year = 2024
  const month = "December"
  const monthNow = new Date(year, Object.keys(months).indexOf(month) + 1)
  const firstDayOfMonth = monthNow.getDay()
  const daysInMonth = new Date(year, Object.keys(month).indexOf(month) + 1, 0).getDate()

  const daysToDisplay = firstDayOfMonth + daysInMonth
  const numRows = (Math.floor(daysToDisplay / 7)) + (daysToDisplay % 7 ? 1 : 0)

  return (
    <div className = {'flex flex-col overflow-hidden py-4 sm:py-6 md:py-10 gap-1 '}> 
      {[...Array(numRows).keys().map((row, rowIndex) => {
        return (
          <div key={rowIndex} className= {'grid grid-cols-7 gap-1 '}>
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

              let color = demo ? gradients.blue[baseRating[dayIndex]] : dayIndex in demoData ? gradients.blue[demoData[dayIndex]] : "black"

              return (
                <div style={{background: color}} key={dayOfWeekIndex} className = {'text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ' + (isToday ? 'border-blue-800 ' : 'border-slate-700 ') + (color === 'white' ? 'text-blue-400 ' : 'text-white ')}>
                  <p>{dayIndex}</p>
                </div>
              )
            })}
          </div>
        )
      })]}
    </div>
  )
}
