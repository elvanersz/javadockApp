import React from 'react'
import ReactDOM from 'react-dom/client'
import "./styles.scss"
import "./locales/Translation.js"
import { RouterProvider } from "react-router-dom"
import router from "./router/router.js"

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
