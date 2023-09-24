import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
import "./styles.scss"
import "./locales"
import { RouterProvider } from "react-router-dom"
import router from "./router/index.js"

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
