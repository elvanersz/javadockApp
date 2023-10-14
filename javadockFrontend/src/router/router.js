import {createBrowserRouter} from "react-router-dom";
import {Home} from "@/pages/Home/Home.jsx";
import {SingUp} from "@/pages/SingUp/SingUp.jsx";
import App from "@/App";
import {Activation} from "@/pages/Activation/Activation.jsx";
import {UserList} from "@/pages/UserList/UserList.jsx";
import {UserProfile} from "@/pages/UserProfile/UserProfile.jsx";

export default createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: "/",
                index: true,
                Component: Home
            },
            {
                path: "/singup",
                Component: SingUp
            },
            {
                path: "/activation/:activationToken",
                Component: Activation
            },
            {
                path: "/users",
                Component: UserList
            },
            {
                path: "/users/:id",
                Component: UserProfile
            }
        ]
    }
])