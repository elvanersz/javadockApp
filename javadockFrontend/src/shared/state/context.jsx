import {createContext, useContext, useEffect} from "react";
import {useReducer} from "react";
import {loadAuthState, storeAuthState} from "@/shared/state/storage.js";
import {setToken} from "@/lib/http.js";

export const AuthContext = createContext();
export const AuthDispatchContext = createContext();

export function useAuthState() {
    return useContext(AuthContext);
}

export function useAuthDispatch() {
    return useContext(AuthDispatchContext);
}

const authReducer = (authState, action) => {
    switch (action.type) {
        case "login-success":
            setToken(action.data.token);
            return action.data.user;
        case "logout-success":
            setToken();
            return {id: 0};
        case "edit-profile-success":
            return {
                ...authState,
                firstName: action.data.firstName,
                lastName: action.data.lastName,
                username: action.data.username,
                job: {
                    jobId: action.data.jobId
                },
                university: {
                    universityId: action.data.universityId
                }
            }
        default:
            throw new Error(`unknown action: ${action.type}`)
    }
}

export function AuthenticationContext({children}) {
    const [authState, dispatch] = useReducer(authReducer, loadAuthState())

    useEffect(() => {
        storeAuthState(authState);
    }, [authState])

    return (
        <AuthContext.Provider value={authState}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    )
}