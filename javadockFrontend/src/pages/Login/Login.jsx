import {useEffect, useState} from "react";
import {Input} from "../../shared/components/Input.jsx";
import {useTranslation} from "react-i18next";
import {Alert} from "@/shared/components/Alert.jsx";
import {Spinner} from "@/shared/components/Spinner.jsx";
import http from "@/lib/http";
import {useAuthDispatch} from "@/shared/state/context.jsx";
import {Link, useNavigate} from "react-router-dom";

export function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [apiProgress, setApiProgress] = useState();
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAuthDispatch()

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
                        {generalError && (
                            <Alert styleType="danger" center>{generalError}</Alert>
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