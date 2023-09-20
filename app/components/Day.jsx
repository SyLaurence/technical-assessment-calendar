import * as React from 'react'
import { useState, useEffect } from 'react';

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
 * @param { string } selectedDate is used to define the selected date from the Calendar
 * @param { callback } setSelectedDate is used to set the seelcted date from the Calendar
 * @param { callback } setCalendarView is used to toggle the view to Month View
 * 
 */
export default function Day ({ selectedDate, setSelectedDate, setCalendarView }) {
    
    /**
     * State for handling the days to be displayed in the Calendar
     */
    const [ calendarDays, setCalendarDays ] = useState([])
    
    /**
     * Variables for getting the year and month of the selected date
     */
    let year = selectedDate.getFullYear()
    let month = selectedDate.getMonth()
    
    /**
     * Hook for repopulating the Calendar days when a new date is selected
     * When month and year is changed
     */
    useEffect(() => {
        setCalendarDays(populateDays(year, month))
    }, [selectedDate])

    return (
        <>
            { /* Days of the Week */ }
            <div className="day-text">{ dayTexts.map( dayText => <span className="calendar-items" key={ dayText } > { dayText } </span> ) }</div>
            
            { /* Calendar Days */ }
            <div className="days"> 
                { /* Calendar Month - Year and < > Buttons */ }
                <div className="calendar-month-year">
                    <div onClick={ () => setSelectedDate(new Date(year, month - 1))}> { '<' } </div>
                    <div onClick={ () => setCalendarView('month') }>{ `${selectedDate.toLocaleString('default', { month: 'long' })} ${year}` }</div>
                    <div onClick={ () => setSelectedDate(new Date(year, month + 1)) }> { '>' } </div>
                </div>
                { /* Render Calendar days */ }
                { calendarDays.map( (dayObj, index) => {
                    return (
                        <>
                            { (index !== 0 && index % 7 === 0) && <br key={ dayObj.day + index } /> }
                            <span key={ index } className={ dayObj.class + ' calendar-items'} onClick={ (e) => handleDayClick(e, dayObj) }> { dayObj.day } </span>
                        </>
                    )
                } ) }
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
function populateDays(year, month) {
    
    /**
     * Variable for getting the numerical order of the day of the current selected 
     */
    let pastMonthDaysCount = new Date(year, month, 1).getDay()

    /**
     * Variable for getting the number of days from the previous month
     */
    let pastMonthDays = new Date(year, month, 0).getDate()

    /**
     * Variable for getting the total number of days in the selected month
     */
    let daysInMonth = new Date(year, month + 1, 0).getDate()
    
    /**
     * Populate initial array with total days of the current month
     */
    let calendarDays = [ ...Array(daysInMonth).keys() ].map((item) => ({ 'day': item + 1, class: ( isCurrentDate(year, month, item + 1) ? 'calendar-today' : '' )}))

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
        calendarDays.unshift({ day: pastMonthDays--, class: 'calendar-exclude-day'})
    }
    
    /**
     * Populate remaining days at the end of the selected month up until the displayDayCount constant (42) is reached
     */
    let num = 1;
    while (calendarDays.length < displayDayCount) {
        calendarDays.push({ day: num++, class: 'calendar-exclude-day'})
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
    
    /**
     * Contants for getting the current date today
     */
    const currentDay = new Date().getDate()
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    
    /**
     * Evaluates if the date passed is the date today
     */
    return (day === currentDay 
    && month === currentMonth
    && year === currentYear)
}

/**
 * Handler when a Day from the Calendar is clicked
 * 
 * @param {*} event 
 * @param {*} dayObj 
 */
function handleDayClick(event, dayObj) {
    console.log(dayObj)
    dayObj.class = 'selected-day'
}