import * as React from 'react'
import { useSetRecoilState } from 'recoil'
import { calendarViewState, selectedDateState } from '../../../atoms/atoms'

/**
 * Reusable component for Contents inside the Calendar
 * 
 * @param {array} data is an array of objects composing of Text and Class to be displayed inside the calendar
 * @param {number} columns is the number of items displayed per row
 * @param {string} calendarLabel is primary header in the Calendar
 * @param {string} calendarView is the callback function when the Calendar header is clicked
 * @param {string} styles is the css classes for each item inside the calendar
 * @param {callback} handleClick is the callback function when an item inside the calendar is clicked
 * @param {object} prevDate is the Previous date to be displayed when < is clicked
 * @param {object} nextDate is the Next date to be displayed when > is clicked
 * 
 */

export const CalendarContent = ({ 
    data = [], 
    columns = 0,
    calendarLabel = '',
    calendarView = 'year',
    styles = '',
    handleClick = () => {},
    prevDate = new Date(),
    nextDate = new Date()
}) => {

    // Setter functions for Calendar View and Selected Date from Recoil
    const setCalendarView = useSetRecoilState(calendarViewState)
    const setSelectedDate = useSetRecoilState(selectedDateState)

    return (
        <>
            { /* Calendar Month - Year and < > Buttons */ }
            <div className="calendar-month-year">
                <div onClick={ () => setSelectedDate(prevDate) }> { '<' } </div>
                <div onClick={ () => setCalendarView(calendarView) } className="calendar-header" >{ calendarLabel }</div>
                <div onClick={ () => setSelectedDate(nextDate) }> { '>' } </div>
            </div>
            { data.map( (dateObj, index) => {
                return (
                    <React.Fragment key={ index }>
                        { /* Handle the number of items per row before adding a new line */ }
                        { (index !== 0 && index % columns === 0) && <br key={ 'br' + index } /> }
                        <span 
                            key={ calendarLabel + index } 
                            className={ `${ styles } ${ dateObj.class }` } 
                            onClick={ (e) => handleClick(e.target.innerHTML.trim(), e.target.className) }
                        > 
                            { dateObj.text } 
                        </span>
                    </React.Fragment>
                )
            } ) }
        </>
    )
}