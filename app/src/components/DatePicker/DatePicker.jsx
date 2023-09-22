import * as React from 'react'
import { useRef, useEffect } from 'react'
import { RecoilRoot, useRecoilState } from 'recoil'
import { selectedDateState, showCalendarState } from '../../atoms/atoms'
import { Calendar } from './Calendar/Calendar'
import calendarIcon from '../../../assets/calendar-icon.png'
import calendarActiveIcon from '../../../assets/calendar-active-icon.png'

/**
 * Main Component for Date Picker
 * 
 * @param {object} date isthe default value of the Date Picker
 */
const DatePickerComponent = ({ date = new Date() }) => {

    // Selected Date and Show Calendar values and setters from Recoil State
    const [ selectedDate, setSelectedDate ] = useRecoilState(selectedDateState)
    const [ showCalendar, setShowCalendar ] = useRecoilState(showCalendarState)

    // Adding reference to Input elements
    const yearInput = useRef()
    const monthInput = useRef()
    const dayInput = useRef()

    // Selected Date from Calendar reflects its value to referenced Inputs
    useEffect(() => {
        setDateInput()
    }, [selectedDate])

    // Handler when Date Input value changes
    const handleInputChange = () => {
        limitDate()
        if (isValidDate()) {
            handleDateChange()
        }
    }

    // Sets the default limit for month(12) and day(28, 29, 30, 31)
    const limitDate = () => {
        let currDayCount = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate()
            
        if (monthInput.current.value > 12) monthInput.current.value = 12
        if (dayInput.current.value > currDayCount) dayInput.current.value = currDayCount
    }

    // Sets the new value for Selected Date
    const handleDateChange = () => {
        setSelectedDate(new Date(
            yearInput.current.value, 
            monthInput.current.value - 1, 
            dayInput.current.value
        ))
    }

    // Validates the Date from Date inputs with the conditions of being a Number and meeting a certain length 
    const isValidDate = () => {

        let yrVal = yearInput.current.value
        let mnVal = monthInput.current.value
        let dyVal = dayInput.current.value
        
        if (isNaN(yrVal) 
            || yrVal.length < 4) return false
        if (isNaN(mnVal) 
            || mnVal.length < 2) return false
        if (isNaN(dyVal) 
            || dyVal.length < 2) return false
        
        return true
    }

    // Updates the date and formats the Date Input dates when Date Input is focused Out
    const handleFocusOut = () => {
        handleDateChange()
        setDateInput()
    }

    // Sets the value of Date Input based on Selected Date
    const setDateInput = () => {
        if (yearInput) yearInput.current.value = selectedDate.getFullYear()
        if (monthInput) monthInput.current.value = padZero(selectedDate.getMonth() + 1)
        if (dayInput) dayInput.current.value = padZero(selectedDate.getDate())
    }

    return (
        <>
            { /* Main Container for Date Inputs */ }
            <div className={ (showCalendar === true ? 'dp-label-active' : '' ) + ' dp-div'} >

                { /* Calendar Logo */ }
                <img 
                    src={ showCalendar === true ? calendarActiveIcon : calendarIcon } 
                    onClick={ () => setShowCalendar(!showCalendar) }
                    alt="calendar icon" 
                    className="dp-icon" />

                { /* Year Input */ }
                <input 
                    ref={ yearInput }
                    maxLength={ 4 } 
                    defaultValue={ selectedDate.getFullYear() }
                    onChange={ handleInputChange }
                    onBlur={ handleFocusOut }
                    className="dp-input dp-year" />
                <input value="-" readOnly={ true } className="dp-input dp-separator" />

                { /* Month Input */ }
                <input 
                    ref={ monthInput }
                    maxLength={ 2 } 
                    defaultValue={ padZero(selectedDate.getMonth() + 1) } 
                    onChange={ handleInputChange }
                    onBlur={ handleFocusOut }
                    className="dp-input dp-month" />
                <input value="-" readOnly={ true } className="dp-input dp-separator" />

                { /* Day Input */ }
                <input 
                    ref={ dayInput }
                    maxLength={ 2 } 
                    defaultValue={ padZero(selectedDate.getDate()) }
                    onChange={ handleInputChange }
                    onBlur={ handleFocusOut }
                    className="dp-input dp-day" />
            </div>

            { /* Show the Calendar when Calendar Icon is clicked */ }
            { showCalendar === true && <div id="calendar"> <Calendar /> </div> }
        </>
    )
}

/**
 * Export Date Picker component with its own Context for reusability
 * 
 */
export const DatePicker = ({ date = new Date() }) => {
    return (
        <RecoilRoot>
            <DatePickerComponent date={ date } />
        </RecoilRoot>
    )
}

/**
 * Adds a 0 to a single digit number
 * Example: 9 -> 09
 * 
 * @param {number} num 
 * @returns {string}
 */
function padZero(num) {
    return ('0' + num).slice(-2)
}