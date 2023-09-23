import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
import {SingUp} from "./pages/SingUp/index.jsx";
import "./styles.scss"
import "./locales"

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <SingUp/>
    </React.StrictMode>,
)
