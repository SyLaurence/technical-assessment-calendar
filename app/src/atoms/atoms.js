import { atom } from 'recoil'

export const selectedDateState = atom({
    key: 'selectedDate',
    default: new Date()
})

export const calendarViewState = atom({
    key: 'calendarView',
    default: 'day'
})

export const showCalendarState = atom({
    key: 'showCalendar',
    default: false
})