import * as React from 'react'

/**
 * 
 * COMPONENT NOT USED
 * 
 * Tried making the calendar content and headers reusable
 * Too much prop drilling
 * 
 */

export default function CalendarContent ({ 
    data, 
    columns,
    selectedDate,
    setSelectedDate, 
    yearEvaluator = 0,
    monthEvaluator = 0, 
    calendarLabel,
    calendarView,
    handleCalendarView,
    styles,
    handleClick
}) {

    /**
     * 
     * Get the year and month of the Selected Date from parent state
     * 
     */
    let year = selectedDate.getFullYear()
    let month = selectedDate.getMonth()

    return (
        <>
            { /* Calendar Month - Year and < > Buttons */ }
            <div className="calendar-month-year">
                <div onClick={ () => setSelectedDate(new Date(year - yearEvaluator, month - monthEvaluator))}> { '<' } </div>
                <div onClick={ () => handleCalendarView(calendarView) }>{ calendarLabel }</div>
                <div onClick={ () => setSelectedDate(new Date(year + yearEvaluator, month + monthEvaluator)) }> { '>' } </div>
            </div>
            { data.map( (item, index) => {
                return (
                    <>
                        { /* Handle the number of items per row before adding a new line */ }
                        { (index !== 0 && index % columns === 0) && <br key={ item + index } /> }
                        <span key={ index } className={ styles } onClick={ (item) => handleClick(item) }> { item } </span>
                    </>
                )
            } ) }
        </>
    )
}