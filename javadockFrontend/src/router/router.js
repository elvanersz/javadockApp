import {createBrowserRouter} from "react-router-dom";
import {Home} from "@/pages/Home/Home.jsx";
import {Register} from "@/pages/Register/Register.jsx";
import {Login} from "@/pages/Login/Login.jsx";
import App from "@/App";
import {Activation} from "@/pages/Activation/Activation.jsx";
import {UserList} from "@/pages/User/UserList/UserList.jsx";
import {UserProfile} from "@/pages/User/UserProfile/UserProfile.jsx";

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
                Component: Register
            },
            {
                path: "/login",
                Component: Login
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
                path: "/user/:id",
                Component: UserProfile
            }
        ]
    }
])