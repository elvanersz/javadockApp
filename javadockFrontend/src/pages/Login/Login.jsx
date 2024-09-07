import {useEffect, useState} from "react";
import {Input} from "../../shared/Components/Input.jsx";
import {useTranslation} from "react-i18next";
import {Alert} from "@/shared/Components/Alert.jsx";
import {Spinner} from "@/shared/Components/Spinner.jsx";
import http from "@/lib/http";
import {useAuthDispatch} from "@/shared/State/context.jsx";
import {Link, useNavigate} from "react-router-dom";

export function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [apiProgress, setApiProgress] = useState();
    const [mailProgress, setMailProgress] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState();
    const [unconfirmedAccountError, setUnconfirmedAccountError] = useState();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAuthDispatch()

    async function sendAccountConfirmationEmail(){
        setMailProgress(true);
        setUnconfirmedAccountError()

        await http.post('/api/v1/users/account-confirmation', {
            email: email
        }).then((response) => {
            setMailProgress(false);
            setUnconfirmedAccountError()
            setSuccessMessage(response.data.message)
        }).catch(() => {
            setMailProgress(false);
            setGeneralError(t("generalErrorMessage"))
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setApiProgress(true);

        await http.post('/api/v1/auth', {
            email: email,
            password: password
        }).then((response) => {
            setApiProgress(false);
            dispatch({type: "login-success", data: response.data})
            navigate("/")
        }).catch((error) => {
            setSuccessMessage()
            if (error.response?.data) {
                setApiProgress(false);
                if (error.response.data.statusCode === 400) {
                    setGeneralError()
                    setUnconfirmedAccountError()
                    setErrors(error.response.data.validationErrors)
                } else if (error.response.data.statusCode === 419){
                    setErrors()
                    setGeneralError()
                    setUnconfirmedAccountError(error.response.data.message)
                }
                else {
                    setErrors()
                    setUnconfirmedAccountError()
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
    useEffect(() => {
        setErrors(function (lastErrors) {
            return {
                ...lastErrors,
                password: undefined
            }
        })
    }, [password])

    return (
        <div className="container">
            <div className="col-xl-6 offset-xl-3">
                <form className="card" onSubmit={onSubmit}>
                    <div className="text-center card-header">
                        <h1>{t("login")}</h1>
                    </div>
                    <div className="card-body">
                        <Input id="email"
                               labelText={t("email")}
                               error={errors ? errors.email : null}
                               onChange={(event) => setEmail(event.target.value)}/>
                        <Input id="password"
                               labelText={t("password")}
                               error={errors ? errors.password : null}
                               onChange={(event) => setPassword(event.target.value)}
                               type="password"/>
                        {successMessage && (
                            <Alert styleType="success" center>{successMessage}</Alert>
                        )}
                        {generalError && (
                            <Alert styleType="danger" center>{generalError}</Alert>
                        )}
                        {unconfirmedAccountError && (
                            <Alert styleType="danger" center>
                                {unconfirmedAccountError} <Link className="text-decoration-none" onClick={sendAccountConfirmationEmail}>{t("sendConfirmationEmail")}</Link>
                            </Alert>
                        )}
                        {mailProgress && (
                            <Alert styleType="secondary" center>
                                <Spinner sm={true}/>
                            </Alert>
                        )}
                        <div className="mb-2">
                            <Link className="text-decoration-none" to="/request-password-reset">{t("forgotYourPassword")}</Link>
                        </div>
                        <div className="text-center">
                            <div>
                                <button className="btn btn-primary"
                                        disabled={apiProgress}>
                                    {apiProgress && (<Spinner sm={true}/>)}
                                    {t("login")}
                                </button>
                            </div>
                            <div className="mt-3">
                                {t("areYouNewToJavadock")} <Link className="text-decoration-none" to="/register">{t("register")}</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}