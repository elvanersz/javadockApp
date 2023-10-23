import {Input} from "@/shared/components/Input.jsx";
import {Alert} from "@/shared/components/Alert.jsx";
import {Spinner} from "@/shared/components/Spinner.jsx";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import http from "@/lib/http.js";

export function RequestPasswordReset() {
    const [email, setEmail] = useState();
    const [apiProgress, setApiProgress] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState();
    const {t} = useTranslation();

    const onSubmit = async (event) => {
        event.preventDefault();
        setSuccessMessage();
        setGeneralError();
        setApiProgress(true);

        await http.post(`/api/v1/request-password-reset`, {email: email})
            .then((response) => {
                setApiProgress(false);
                setSuccessMessage(response.data.message)
            }).catch((error) => {
                if (error.response?.data) {
                    setApiProgress(false);
                    if (error.response.data.statusCode === 400) {
                        setErrors(error.response.data.validationErrors)
                    } else {
                        setGeneralError(error.response.data.message)
                    }
                } else {
                    setApiProgress(false);
                    setGeneralError(t("generalErrorMessage"))
                }
            })
    }

    useEffect(() => {
        setErrors(function (lastErrors) {
            return {
                ...lastErrors,
                email: undefined
            }
        })
    }, [email])

    return (
        <div className="container">
            <div className="col-xl-6 offset-xl-3">
                <form className="card" onSubmit={onSubmit}>
                    <div className="text-center card-header">
                        <h1>{t("forgotYourPassword")}</h1>
                    </div>
                    <div className="card-body">
                        <Input id="email"
                               labelText={t("email")}
                               error={errors ? errors.email : null}
                               onChange={(event) => setEmail(event.target.value)}/>
                        {successMessage && (
                            <Alert styleType="success" center>{successMessage}</Alert>
                        )}
                        {generalError && (
                            <Alert styleType="danger" center>{generalError}</Alert>
                        )}
                        <div className="text-center">
                            <button className="btn btn-primary"
                                    onChange={onSubmit}
                                    disabled={apiProgress}>
                                {apiProgress && (<Spinner sm={true}/>)}
                                {t("sendMail")}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}