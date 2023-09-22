import * as React from 'react'
import { CalendarContent } from './CalendarContent'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { calendarViewState, selectedDateState } from '../../../atoms/atoms'

/**
 * Constant for the name of months
 * Can be generated programmatically but chosen not to because Months are not being updated in the real world
 */
const monthTexts = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dev' ]

/**
 * Component for handling the Month View functionality of the Calendar Component
 * 
 */
export const Month = () => {

    // Selected date value and setter from Recoil State
    const [ selectedDate, setSelectedDate ] = useRecoilState(selectedDateState)
    
    // Setter for Calendar View from Recoil State
    const setCalendarView = useSetRecoilState(calendarViewState)

    // Get the year of the selected date
    let year = selectedDate.getFullYear()

    /**
     * Set the selected date based on month
     * 
     * @param {number} year is the selected year
     * @param {number} month is the selected month
     */
    const handleMonthClick = (month) => {
        setSelectedDate(new Date(year, monthTexts.indexOf(month)))
        setCalendarView('day')
    }

    return (
        <>
            <div className="months"> 
                <CalendarContent 
                    data={ monthTexts.map((monthText, index) => ({ text: monthText, class: ( selectedDate.getMonth() === index ? 'selected' : '') })) } 
                    columns={ 4 }
                    calendarLabel={ year }
                    styles={ 'calendar-items month-items' }
                    handleClick={ handleMonthClick }
                    prevDate={ new Date(year - 1, 0) }
                    nextDate={ new Date(year + 1, 0) }
                />
            </div>
        </> 
    )
}