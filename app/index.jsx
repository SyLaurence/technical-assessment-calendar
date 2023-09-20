import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import "./index.css"
import DatePicker from './components/DatePicker'

function App() {

    return (
        <>
            <DatePicker />
        </>
    )


}

// Loading React to HTML root
const rootElement = document.getElementById('app')
const root = ReactDOM.createRoot(rootElement)
root.render(<App />)