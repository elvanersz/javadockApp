import http from "@/lib/http.js";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Alert} from "@/shared/components/Alert.jsx";
import {Spinner} from "@/shared/components/Spinner.jsx";

export function UserProfile() {
    const {id} = useParams()
    const [user, setUser] = useState(null)
    const [apiProgress, setApiProgress] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    function getUser(id) {
        return http.get(`/api/v1/users/${id}`)
    }

    useEffect(() => {
        async function user() {
            setApiProgress(true)
            try {
                const response = await getUser(id);
                setUser(response.data)
            } catch (error) {
                setErrorMessage(error.response.data.message)
            } finally {
                setApiProgress(false);
            }
        }

        user()
    }, [])

    return <>
        {user && <h1>{user.username}</h1>}
        {apiProgress && (
            <Alert styleType="secondary" center>
                <Spinner/>
            </Alert>
        )}
        {errorMessage && (
            <Alert styleType="danger" center>{errorMessage}</Alert>
        )}
    </>
}