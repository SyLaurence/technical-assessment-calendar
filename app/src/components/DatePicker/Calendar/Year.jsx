import * as React from 'react'
import { CalendarContent } from './CalendarContent';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { calendarViewState, selectedDateState } from '../../../atoms/atoms';

// Contants for declaring there are 12 years to be displayed
const totalYearDisplay = 12;

// Constant for displaying the active number of years
const displayYearCount = 10

/**
 * Component for handling the Year View functionality of the Calendar Component
 * 
 */
export const Year = () => {

    // Selected date value and setter from Recoil State
    const [ selectedDate, setSelectedDate ] = useRecoilState(selectedDateState)
    
    // Setter for Calendar View from Recoil State
    const setCalendarView = useSetRecoilState(calendarViewState)

    // Get the year of the selected date
    let year = selectedDate.getFullYear()
    
    // Getting the base of the year by 1000s / 100s / 10s
    let yearBase = getBaseYear(year)
    
    // Replicating value for increment
    let yearCount = yearBase
    
    // Incrementing year data starting from base
    let yearData = [ ...Array(12).keys() ].map( () => yearCount++ )

    /**
     * Sets the new selected year
     * 
     * @param {callback} setSelectedDate 
     * @param {number} year 
     */
    const handleYearClick = (year) => {
        setSelectedDate(new Date(year, 0))
        setCalendarView('month')
    }

    return (
        <div className="years">
            <CalendarContent
                data={ yearData.map((year) => ({ text: year, class: ( selectedDate.getFullYear() === year ? 'selected' : '') })) }
                columns={ 4 }
                calendarLabel={ `${ yearBase + 1 } - ${  yearBase + displayYearCount }` }
                styles={ 'calendar-items year-items' }
                handleClick={ handleYearClick }
                prevDate={ new Date(year - totalYearDisplay, 0) }
                nextDate={ new Date(year + totalYearDisplay, 0) }
            />
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