# Technical Assessment

## Activity: Make a Calendar Component from scratch

### Installation guide

1. On your local machine, create a new folder "Technical Assessment - Calendar"
2. Go to the New Folder and open CMD.
3. Clone repository by entering this command in CMD:
   ```
   git clone https://github.com/SyLaurence/technical-assessment-calendar.git
   ```
4. Go to the Project folder.
   ```
   cd technical-assessment-calendar
   ```
5. Install dependencies by:
   ```
   npm install
   ```
6. Setup Dev server (for technical assessment only)
   ```
   npm run dev
   ```
7. Open a browser and go to: [http://localhost:8080/](http://localhost:8080/)

### :white_check_mark: Features

- #### DatePicker Component
  - Reusable.
  - Display a DatePicker Component using ISO format (YYYY-MM-DD).
  - User input date is reflected on Calendar.
  - Toggle Icons based on component focus.
  - Show Calendar when DatePicker is clicked.
  - Highlight Calendar date based on DatePicker Input value.
  - Calendar closes when a day is clicked from the Calendar.
- #### Calendar Component
  - Dependent on DatePicker Component.
  - Show Current Date by default.
  - Has 3 views for toggle: Year View, Month View, Day View.
  - Clicking on the Calendar Header will toggle the View.
  - #### Day View
    - Display selected Month and Year in Calendar header.
    - Show 6 rows of days including previous and next month days.
    - Show 7 columns representing each date of the week in Day View.
    - Day today is shown in red (#db3d44).
    - Day hovered is shown with a red (#db3d44) circle and white text.
    - Clicking on the Day will select the day and update the DatePicker value and hide the Calendar.
    - Day seleted is shown with a red (#db3d44) circle and white text.
    - Previous and next month days are shown in gray (#eeeeee).
    - Clicking the "<" will move the Calendar to the previous month and set the default day to the first day of the month.
    - Clicking the ">" will move the Calendar to the next month and set the default day to the first day of the month.
    - Clicking the header of Day View will show the Month View.
  - #### Month View
    - Display selected year in Calendar header.
    - Show 12 months in 4 columns and 3 rows format.
    - Month hovered is shown with a red (#db3d44) circle and white text.
    - Month seleted is shown with a red (#db3d44) circle and white text.
    - Clicking on a month will select the month and show the Day View.
    - Clicking the "<" will move the Calendar to the previous year.
    - Clicking the ">" will move the Calendar to the next year.
    - Clicking the header of Month View will show the Year View.
  - #### Year View
    - Display selected year range in Calendar header.
    - Show 12 years starting from the base 10 of the current year (Example: Current year is 2013, base year is 2010).
    - First and last year in the current display is shown in gray (#eeeeee).
    - Clicking the "<" will move the Calendar to the past decade.
    - Clicking the ">" will move the Calendar to the next decade.
    - Year hovered is shown with a red (#db3d44) circle and white text.
    - Year seleted is shown with a red (#db3d44) circle and white text.
    - Clicking on a year will select the year and show the Month View.

### :warning: Features not included

- Mobile Responsive Layout.
- Click on previous days / years to navigate.
- Clicking outside the DatePicker and Calendar will hide the Calendar.
- Advanced validation: only accept numeric values on DatePicker.
- No year limit.

### API Reference

- #### DatePicker Component
  - | Name                | Type                   | Default    | Description                                                                                              |
    | ------------------- | ---------------------- | ---------- | -------------------------------------------------------------------------------------------------------- |
    | DatePickerComponent | function(date: Object) | new Date() | Main Component for DatePicker.                                                                           |
    | selectedDate        | object                 | new Date() | Current selected date.                                                                                   |
    | setSelectedDate     | function(object)       |            | Sets selected date.                                                                                      |
    | showCalendar        | boolean                | false      | Value for Calendar visibility.                                                                           |
    | setShowCalendar     | function(boolean)      |            | Sets value of Calendar visibility.                                                                       |
    | yearInput           | object                 |            | Adding reference to Year Input Element.                                                                  |
    | monthInput          | object                 |            | Adding reference to Month Input Element.                                                                 |
    | dayInput            | object                 |            | Adding reference to Day Input Element.                                                                   |
    | handleInputChange   | function               |            | Handler when Date Input value changes.                                                                   |
    | limitDate           | function               |            | Sets the default limit for month(12) and day(28, 29, 30, 31).                                            |
    | handleDateChange    | function               |            | Sets the new value for Selected Date.                                                                    |
    | isValidDate         | function               |            | Validates the Date from Date inputs with the conditions of being a Number and meeting a certain length . |
    | handleFocusOut      | function               |            | Updates the date and formats the Date Input dates when Date Input is focused Out.                        |
    | setDateInput        | function               |            | Sets the value of Date Input based on Selected Date.                                                     |
    | DatePicker          | function               |            | Export Date Picker component with its own Context for reusability.                                       |
    | padZero             | function               |            | Adds a 0 to a single digit number. Example: 9 -> 09.                                                     |
- #### Calendar Component
  - | Name         | Type     | Default | Description                               |
    | ------------ | -------- | ------- | ----------------------------------------- |
    | Calendar     | function |         | Main Component for Calendar.              |
    | calendarView | string   | "day"   | Value for current view shown in Calendar. |
- #### Calendar Content Component
  - | Name            | Type                                                                                                                                                           | Default          | Description                          |
    | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------------------------------ |
    | CalendarContent | function(data: array, columns: number, calendarLabel: string, calendarView: string, styles: string, handleClick: callback, prevDate: object, nextDate: object) |                  | Main Component for Calendar Content. |
    | setCalendarView | function                                                                                                                                                       | function(string) | Sets value for Calendar View.        |
    | setSelectedDate | function                                                                                                                                                       | function(object) | Sets value for selected date.        |
- #### Day Component
  - | Name            | Type                                                                   | Default                                      | Description                                                                         |
    | --------------- | ---------------------------------------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------- |
    | displayDayCount | number                                                                 | 42                                           | Constant for displaying a total of 42 items/days in the Calendar.                   |
    | dayTexts        | array                                                                  | [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ] | Constant for declaring Name of Day in the Calendar using only 2 characters.         |
    | Day             | function                                                               |                                              | Main Component for Day                                                              |
    | selectedDate    | object                                                                 | new Date()                                   | Current selected date.                                                              |
    | setSelectedDate | function                                                               |                                              | Sets selected date.                                                                 |
    | setShowCalendar | function                                                               |                                              | Sets calendar visibility.                                                           |
    | calendarDays    | array                                                                  | []                                           | Current days displayed in the Calendar.                                             |
    | setCalendarDays | function                                                               |                                              | Sets days in the Calendar.                                                          |
    | year            | number                                                                 |                                              | Variable for getting the year of the selected date.                                 |
    | month           | number                                                                 |                                              | Variable for getting the month of the selected date.                                |
    | day             | number                                                                 |                                              | Variable for getting the day of the selected date.                                  |
    | handleDayClick  | function(day: number, className: string)                               |                                              | Adds a class to the Day clicked from the Calendar.                                  |
    | populateDays    | function(year: number, month: number, clickedDay: number)              |                                              | Generating the list of days from the previous month, current month, and next month. |
    | isCurrentDate   | function(year: number, month: number, day: number)                     |                                              | Check if the date passed is the current date today.                                 |
    | addDayClasses   | function(year: number, month: number, day: number, clickedDay: number) |                                              | Adding classes to days in the Calendar.                                             |
- #### Month Component
  - | Name             | Type                    | Default                                                                                | Description                           |
    | ---------------- | ----------------------- | -------------------------------------------------------------------------------------- | ------------------------------------- |
    | monthTexts       | array                   | [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dev' ] | Constant for the name of months       |
    | Month            | function                |                                                                                        | Main Component for Month              |
    | selectedDate     | object                  | new Date()                                                                             | Current selected date.                |
    | setSelectedDate  | function                |                                                                                        | Sets the selected date.               |
    | setCalendarView  | function                |                                                                                        | Sets the current view of calendar.    |
    | year             | number                  |                                                                                        | Get the year of the selected date.    |
    | handleMonthClick | function(month: number) |                                                                                        | Set the selected date based on month. |
- #### Year Component
  - | Name             | Type                   | Default    | Description                                                                  |
    | ---------------- | ---------------------- | ---------- | ---------------------------------------------------------------------------- |
    | totalYearDisplay | number                 | 12         | Contants for declaring there are 12 years to be displayed.                   |
    | displayYearCount | number                 | 10         | Constant for displaying the active number of years.                          |
    | Year             | function               |            | Main Component for Year                                                      |
    | selectedDate     | object                 | new Date() | urrent selected date.                                                        |
    | setSelectedDate  | function               |            | Sets the selected date.                                                      |
    | setCalendarView  | function               |            | Sets the current view of calendar.                                           |
    | year             | number                 |            | Get the year of the selected date.                                           |
    | yearBase         | number                 |            | Getting the base of the year by 1000s / 100s / 10s                           |
    | yearCount        | number                 |            | Replicating value for increment                                              |
    | yearData         | array                  |            | Incrementing year data starting from base                                    |
    | handleYearClick  | function               |            | Sets the new selected year                                                   |
    | getBaseYear      | function(year: number) |            | Calculates the base value of the current selected year by 1000s / 100s / 10s |

### Tech Stack

- React
- Recoil
- Webpack
- Javascript
- CSS
- HTML
