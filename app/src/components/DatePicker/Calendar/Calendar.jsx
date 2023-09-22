import * as React from 'react'
import { Day } from './Day';
import { Month } from './Month';
import { Year } from './Year';
import { useRecoilValue } from 'recoil'
import { calendarViewState } from '../../../atoms/atoms'

/**
 * Main Component for Calendar
 * Composed of different views: Year, Month, Day
 * 
 * 
 */

export const Calendar = () => {

    // Value of Calendar View to be displayed from Recoil State
    const calendarView = useRecoilValue(calendarViewState)

    return (
        <div className="container">
            { /* Calendar Content */ }
            <div>
                { /* Added condition for toggling each view component for the Calendar */ }
                { calendarView === 'day' && <Day /> }
                { calendarView === 'month' && <Month /> }
                { calendarView === 'year' && <Year /> }
            </div>
        </div>
    )
}



