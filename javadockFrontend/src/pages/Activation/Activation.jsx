import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Alert} from "@/shared/Components/Alert.jsx";
import {Spinner} from "@/shared/Components/Spinner.jsx";
import http from "@/lib/http";

export function Activation() {
    const {activationToken} = useParams();
    const [apiProgress, setApiProgress] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();

    function activateUser(activationToken) {
        return http.put(`/api/v1/users/${activationToken}/active`)
    }

    useEffect(() => {
        async function activate() {
            setApiProgress(true)
            try {
                const response = await activateUser(activationToken);
                setSuccessMessage(response.data.message)
            } catch (error) {
                setErrorMessage(error.response.data.message)
            } finally {
                setApiProgress(false);
            }
        }
        activate()
    }, [activationToken])

    return <>
        {apiProgress && (
            <Alert styleType="secondary" center>
                <Spinner />
            </Alert>
        )}
        {successMessage && (
            <Alert styleType="success" center>{successMessage}</Alert>
        )}
        {errorMessage && (
            <Alert styleType="danger" center>{errorMessage}</Alert>
        )}
    </>
}