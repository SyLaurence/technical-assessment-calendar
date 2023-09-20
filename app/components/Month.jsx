import * as React from 'react'

/**
 * Constant for the name of months
 * Can be generated programmatically but chosen not to because Months are not being updated in the real world
 */
const monthTexts = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dev' ]

/**
 * Component for handling the Month View functionality of the Calendar Component
 * @param { string } selectedDate is used to define the selected date from the Calendar
 * @param { callback } setSelectedDate is used to set the seelcted date from the Calendar
 * @param { callback } setCalendarView is used to toggle the view to Month View
 * 
 */
export default function Month ({ selectedDate, setSelectedDate, setCalendarView }) {

    // Get the year of the selected date
    let year = selectedDate.getFullYear()

    return (
        <>
            <div className="months"> 
                { /* Calendar Month - Year and < > Buttons */ }
                <div className="calendar-month-year">
                    <div onClick={ () => setSelectedDate(new Date(year - 1, 0))}> { '<' } </div>
                    <div onClick={ () => setCalendarView('year') }>{ year }</div>
                    <div onClick={ () => setSelectedDate(new Date(year + 1, 0)) }> { '>' } </div>
                </div>
                { monthTexts.map( (monthText, index) => {
                    return (
                        <>
                            { (index !== 0 && index % 4 === 0) && <br key={ monthText + index } /> }
                            <span 
                                key={ index } 
                                className="calendar-items month-items" 
                                onClick={ (e) => { 
                                    handleMonthClick(setSelectedDate, year, index)
                                    setCalendarView('day') 
                                } }> { monthText } </span>
                        </>
                    )
                } ) }
            </div>
        </> 
    )
}

/**
 * Set the selected date based on month
 * 
 * @param {callback} setSelectedDate is the callback function for setting the Selected Date
 * @param {number} year is the selected year
 * @param {number} month is the selected month
 */
function handleMonthClick(setSelectedDate, year, month) {
    setSelectedDate(new Date(year, month))
}