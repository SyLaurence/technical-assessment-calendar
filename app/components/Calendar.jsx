import * as React from 'react'
import { useState } from 'react';
import Day from './Day';
import Month from './Month';
import Year from './Year';

/**
 * 
 * Main Component for Calendar
 * 
 * Declared two properties for local state
 * 
 * 
 */

export default function Calendar({ date = new Date() }) {

    /**
     * State for handling date selected in the Calendar
     * Default is set to Current Date 
     */
    const [ selectedDate, setSelectedDate ] = useState(date)

    /**
     * State for handle the toggle view of the Calendar from Day, Month, and Year
     * Default is set to Day View of Calendar
     */
    const [ calendarView, setCalendarView ] = useState('day')

    return (
        <div className="container">
            { /* Calendar Content */ }
            <div>
                { /* Added condition for toggling each view component for the Calendar */ }
                { calendarView === 'day' && 
                    <Day
                        selectedDate={ selectedDate } 
                        setSelectedDate={ setSelectedDate }
                        setCalendarView={ setCalendarView }
                    /> 
                }
                { calendarView === 'month' && 
                    <Month
                        selectedDate={ selectedDate } 
                        setSelectedDate={setSelectedDate} 
                        setCalendarView={ setCalendarView }
                    /> 
                }
                { calendarView === 'year' && 
                    <Year 
                        selectedDate={ selectedDate } 
                        setSelectedDate={setSelectedDate}
                        setCalendarView={ setCalendarView }
                    />
                }
            </div>
        </div>
    )
}



