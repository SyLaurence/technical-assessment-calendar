import * as React from 'react'
import { useState, useEffect } from 'react'
import { CalendarContent } from './CalendarContent'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { selectedDateState, showCalendarState } from '../../../atoms/atoms'

/**
 * Constant for displaying a total of 42 items/days in the Calendar
 * Composing of 7 columns and 6 rows
 */
const displayDayCount = 42

/**
 * Constant for declaring Name of Day in the Calendar using only 2 characters
 * Can be generated programmatically but hardcoding is shorter and there will be no additional day of the week
 */
const dayTexts = [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ]


/**
 * Component for handling the Day View functionality of the Calendar Component
 * 
 */
export const Day = () => {

    // Selected date value and setters from Recoil State
    const [ selectedDate, setSelectedDate ] = useRecoilState(selectedDateState)
    const setShowCalendar = useSetRecoilState(showCalendarState)
    
    // State for handling the days to be displayed in the Calendar
    const [ calendarDays, setCalendarDays ] = useState([])
    
    // Variables for getting the year, month, and day of the selected date
    let year = selectedDate.getFullYear()
    let month = selectedDate.getMonth()
    let day = selectedDate.getDate()
    
    /**
     * Hook for repopulating the Calendar days when a new date is selected
     * When month and year is changed
     */
    useEffect(() => {
        setCalendarDays(populateDays(year, month, selectedDate.getDate()))
    }, [month, day])

    // Adds a class to the Day clicked from the Calendar
    const handleDayClick = (day, className) => {
        if (className.includes('exclude')) return;

        // Set Selected Day
        setSelectedDate(new Date(year, month, day))

        // Hide Calendar
        setShowCalendar(false)
    }

    return (
        <>
            { /* Days of the Week */ }
            <div className="day-text">{ dayTexts.map( dayText => <span className="calendar-items" key={ dayText } > { dayText } </span> ) }</div>

            { /* Calendar Days */ }
            <div className="days"> 
                <CalendarContent
                    data={ calendarDays }
                    columns={ 7 }
                    calendarLabel={ `${selectedDate.toLocaleString('default', { month: 'long' })} ${year}` }
                    calendarView={ 'month' }
                    styles={ 'calendar-items' }
                    handleClick={ handleDayClick }
                    prevDate={ new Date(year, month - 1) }
                    nextDate={ new Date(year, month + 1) }
                />
            </div>
        </>
    )
}

/**
 * Function for generating the list of days from the previous month, current month, and next month.
 * 
 * @param {number} year is the selected year from the Calendar
 * @param {number} month is the selected month from the Calendar
 * @returns {array}
 */
function populateDays(year, month, clickedDay = 0) {
    
    // Variable for getting the numerical order of the day of the current selected 
    let pastMonthDaysCount = new Date(year, month, 1).getDay()

    // Variable for getting the number of days from the previous month
    let pastMonthDays = new Date(year, month, 0).getDate()

    // Variable for getting the total number of days in the selected month
    let daysInMonth = new Date(year, month + 1, 0).getDate()
    
    // Populate initial array with total days of the current month
    let calendarDays = [ ...Array(daysInMonth).keys() ].map((item) => ({ text: item + 1, class: addDayClasses(year, month, item + 1, clickedDay) }))

    /**
     * Loop through the number of days from the previous month
     * Starting from the end
     * Limited to the numberical order of the current selected month day
     * Example
     * 31 - Previous month days
     * 5 - Numerical Order of selected month (Wed)
     */
    for (let i = pastMonthDaysCount; i > 0; i--) {
        // insert new days from the beginning of the array
        calendarDays.unshift({ text: pastMonthDays--, class: 'calendar-exclude-day'})
    }
    
    /**
     * Populate remaining days at the end of the selected month up until the displayDayCount constant (42) is reached
     */
    let num = 1;
    while (calendarDays.length < displayDayCount) {
        calendarDays.push({ text: num++, class: 'calendar-exclude-day'})
    }

    return calendarDays;
}


/**
 * Evaluator function to check if the date passed is the current date today
 * 
 * @param {number} year is the selected year from the Calendar
 * @param {number} month is the selected month from the Calendar
 * @param {number} day is the selected day from the Calendar
 * @returns {boolean}
 */
function isCurrentDate(year, month, day) {
    
    // Contants for getting the current date today
    const currentDay = new Date().getDate()
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    
    // Evaluates if the date passed is the date today
    return (day === currentDay 
    && month === currentMonth
    && year === currentYear)
}

/**
 * Function for adding classes to days in the calendar
 * 
 * @param {number} year is the current selected year
 * @param {number} month is the current selected month
 * @param {number} day is the current selected date
 * @param {number} clickedDay is the Day clicked inside the calendar
 * @returns {string} Classes for the Calendar day item
 */
function addDayClasses(year, month, day, clickedDay) {
    return (
        isCurrentDate(year, month, day) ? 'calendar-today' : ''
    ) + (
        day === clickedDay ? ' selected' : ''
    )
}