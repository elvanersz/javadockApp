import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import {Input} from "./components/Input.jsx";
import {useTranslation} from "react-i18next";
import {LanguageSelector} from "../../shared/components/LanguageSelector.jsx";
import i18n from "i18next";

export function SingUp() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();
    const [apiProgress, setApiProgress] = useState(false);
    const [successMessage, setSuccessMessage] = useState();
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState();
    const { t } = useTranslation();

    const passwordRepeatError = useMemo(() => {
        if (password && password !== passwordRepeat) {
            return t("passwordMismatch");
        } else {
            return "";
        }
    }, [password, passwordRepeat]);

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
        if (!username || !email || !password || password !== passwordRepeat) {
            return true
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        setApiProgress(true);
        setSuccessMessage();

        await axios.post('/api/v1/users', {
                username: username,
                email: email,
                password: password
            },
            {
                headers: {
                    "Accept-Language" : i18n.language
                }
            }).then((response) => {
            setSuccessMessage(t("successMessage"))
            console.log(response.data)
        }).catch((error) => {
            if (error.response?.data) {
                setErrors(error.response.data.validationErrors)
                console.log(error.response)
            } else {
                setGeneralError(t("generalErrorMessage"))
            }
        }).finally(setApiProgress(false))
    }

    return (
        <div className="container">
            <div className="col-xl-6 offset-xl-3 mt-5">
                <form className="card" onSubmit={onSubmit}>
                    <div className="text-center card-header">
                        <h1>{t("singUp")}</h1>
                    </div>
                    <div className="card-body">
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
                        <Input id="passwordRepeat"
                               labelText={t("passwordRepeat")}
                               error={passwordRepeatError}
                               onChange={(event) => setPasswordRepeat(event.target.value)}
                               type="password"/>
                        {successMessage && <div className="alert alert-success">
                            {successMessage}
                        </div>}
                        {generalError && <div className="alert alert-danger">
                            {generalError}
                        </div>}
                        <div className="text-center">
                            <button className="btn btn-primary"
                                    disabled={buttonDisable() || apiProgress}>
                                {apiProgress &&
                                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>}
                                {t("singUp")}
                            </button>
                        </div>
                    </div>
                </form>
                <LanguageSelector />
            </div>
        </div>
    );
}