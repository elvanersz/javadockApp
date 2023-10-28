import {Outlet} from "react-router-dom";
import {NavBar} from "./shared/Components/NavBar.jsx";
import {AuthenticationContext} from "@/shared/State/context.jsx";

function App() {
    return (
        <AuthenticationContext>
            <style>{'body { background-color: #E3F4F4; }'}</style>
            <NavBar/>
            <div className="container mt-3">
                <Outlet/>
            </div>
        </AuthenticationContext>
    )
}

export default App