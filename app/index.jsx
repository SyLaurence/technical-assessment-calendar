import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import "./index.css"
import { DatePicker } from './src/components/DatePicker/DatePicker'

/**
 * Mount React App here
 * 
 * @returns Component
 */
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
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)