import {useEffect, useMemo, useState} from "react";
import {Input} from "../../shared/components/Input.jsx";
import {useTranslation} from "react-i18next";
import {Alert} from "@/shared/components/Alert.jsx";
import {Spinner} from "@/shared/components/Spinner.jsx";
import http from "@/lib/http";
import {Link} from "react-router-dom";

export function Register() {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();
    const [apiProgress, setApiProgress] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState();
    const {t} = useTranslation();

    const passwordConfirmError = useMemo(() => {
        if (password && password !== passwordConfirm) {
            return t("passwordMismatch");
        } else {
            return "";
        }
    }, [password, passwordConfirm]);

    useEffect(() => {
        setErrors(function (lastErrors) {
            return {
                ...lastErrors,
                firstName: undefined
            }
        })
    }, [firstName])
    useEffect(() => {
        setErrors(function (lastErrors) {
            return {
                ...lastErrors,
                lastName: undefined
            }
        })
    }, [lastName])
    useEffect(() => {
        setErrors(function (lastErrors) {
            return {
                ...lastErrors,
                username: undefined
            }
        })
    }, [username])
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

    const buttonDisable = () => {
        if (!firstName || !lastName || !username || !email || !password || password !== passwordConfirm) {
            return true
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        setApiProgress(true);
        setSuccessMessage();
        setGeneralError();

        await http.post('/api/v1/users', {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: password
        }).then(() => {
            setApiProgress(false);
            setSuccessMessage(t("successMessage"))
        }).catch((error) => {
            console.log(error)
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

    return (
        <div className="container">
            <div className="col-xl-6 offset-xl-3">
                <form className="card" onSubmit={onSubmit}>
                    <div className="text-center card-header">
                        <h1>{t("register")}</h1>
                    </div>
                    <div className="card-body">
                        <Input id="firstName"
                               labelText={t("firstName")}
                               error={errors ? errors.firstName : null}
                               onChange={(event) => setFirstName(event.target.value)}/>
                        <Input id="lastName"
                               labelText={t("lastName")}
                               error={errors ? errors.lastName : null}
                               onChange={(event) => setLastName(event.target.value)}/>
                        <Input id="username"
                               labelText={t("username")}
                               error={errors ? errors.username : null}
                               onChange={(event) => setUsername(event.target.value)}/>
                        <Input id="email"
                               labelText={t("email")}
                               error={errors ? errors.email : null}
                               onChange={(event) => setEmail(event.target.value)}/>
                        <Input id="password"
                               labelText={t("password")}
                               error={errors ? errors.password : null}
                               onChange={(event) => setPassword(event.target.value)}
                               type="password"/>
                        <Input id="passwordConfirm"
                               labelText={t("passwordConfirm")}
                               error={passwordConfirmError}
                               onChange={(event) => setPasswordConfirm(event.target.value)}
                               type="password"/>
                        {successMessage && (
                            <Alert styleType="success" center>{successMessage}</Alert>
                        )}
                        {generalError && (
                            <Alert styleType="danger" center>{generalError}</Alert>
                        )}
                        <div className="text-center">
                            <div>
                                <button className="btn btn-primary"
                                        disabled={buttonDisable() || apiProgress}>
                                    {apiProgress && (<Spinner sm={true}/>)}
                                    {t("register")}
                                </button>
                            </div>
                            <div className="mt-3">
                                {t("alreadyMemberOfJavadock")} <Link className="text-decoration-none" to="/login">{t("login")}</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}