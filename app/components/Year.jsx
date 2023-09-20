import * as React from 'react'

// Contants for declaring there are 12 years to be displayed
const totalYearDisplay = 12;

// Constant for displaying the active number of years
const displayYearCount = 10

/**
 * Component for handling the Year View functionality of the Calendar Component
 * @param { string } selectedDate is used to define the selected date from the Calendar
 * @param { callback } setSelectedDate is used to set the seelcted date from the Calendar
 * @param { callback } setCalendarView is used to toggle the view to Month View
 * 
 */
export default function Year ({ selectedDate, setSelectedDate, setCalendarView }) {

    // Get the year of the selected date
    let year = selectedDate.getFullYear()
    
    // Getting the base of the year by 1000s / 100s / 10s
    let yearBase = getBaseYear(year)
    
    // Replicating value for increment
    let yearCount = yearBase
    
    // Incrementing year data starting from base
    let yearData = [ ...Array(12).keys() ].map( () => yearCount++ )

    return (
        <div className="years">
            { /* Calendar Month - Year and < > Buttons */ }
            <div className="calendar-month-year">
                <div onClick={ () => setSelectedDate(new Date(year - totalYearDisplay, 0))}> { '<' } </div>
                <div>{ yearBase + 1 } - {  yearBase + displayYearCount }</div>
                <div onClick={ () => setSelectedDate(new Date(year + totalYearDisplay, 0)) }> { '>' } </div>
            </div>
            { yearData.map( (year, index) => {
                return (
                    <>
                        { (index !== 0 && index % 4 === 0) && <br key={ year + index } /> }
                        <span 
                            key={ index } 
                            className="calendar-items year-items" 
                            onClick={ (e) => { 
                                handleYearClick(setSelectedDate, e.target.innerHTML);
                                setCalendarView('month')
                            } }> { year } </span>
                    </>
                )
            } ) }
        </div>
    )
}

/**
 * Calculates the base value of the current selected year by 1000s / 100s / 10s
 * Example: 2023 => 2020
 * 
 * @param {number} year 
 * @returns {number}
 */
function getBaseYear(year) {
    return (year - (year % 10)) -1
}

/**
 * Sets the new selected year
 * 
 * @param {callback} setSelectedDate 
 * @param {number} year 
 */
function handleYearClick(setSelectedDate, year) {
    setSelectedDate(new Date(year, 0))
}