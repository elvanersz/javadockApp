import {Outlet, Link} from "react-router-dom";
import logo from "./assets/javadock-icon.png"
import {LanguageSelector} from "./shared/components/LanguageSelector.jsx";
import {NavBar} from "./shared/components/NavBar.jsx";

function App() {
    return (
        <>
            <NavBar />
            <div className="container mt-3">
                <Outlet/>
                <LanguageSelector/>
            </div>
        </>
    )
}

export default App