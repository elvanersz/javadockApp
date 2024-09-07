import {createBrowserRouter} from "react-router-dom";
import {Home} from "@/pages/Home/Home.jsx";
import {Register} from "@/pages/Register/Register.jsx";
import {Login} from "@/pages/Login/Login.jsx";
import App from "@/App";
import {Activation} from "@/pages/Activation/Activation.jsx";
import {UserList} from "@/pages/UserList/UserList.jsx";
import {UserProfile} from "@/pages/UserProfile/UserProfile.jsx";
import {RequestPasswordReset} from "@/pages/PasswordReset/RequestPasswordReset.jsx";
import {PasswordReset} from "@/pages/PasswordReset/PasswordReset.jsx";
import { PostList } from "../pages/PostList/PostList";
import { PostDetail } from "../pages/PostDetail/PostDetail";

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
                path: "/register",
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
                path: "/users/:id",
                Component: UserProfile
            },
            {
                path: "/request-password-reset",
                Component: RequestPasswordReset
            },
            {
                path: "/password-reset/:passwordResetToken",
                Component: PasswordReset
            },
            {
                path: "/posts",
                Component: PostList
            },
            {
                path: "/posts/:id",
                Component: PostDetail
            }
        ]
    }
])