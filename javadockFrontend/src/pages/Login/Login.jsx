import {useEffect, useState} from "react";
import {Input} from "../../shared/components/Input.jsx";
import {useTranslation} from "react-i18next";
import {Alert} from "@/shared/components/Alert.jsx";
import {Spinner} from "@/shared/components/Spinner.jsx";
import http from "@/lib/http";

export function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [apiProgress, setApiProgress] = useState();
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState();
    const {t} = useTranslation();

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

    const onSubmit = async (event) => {
        event.preventDefault();
        setApiProgress(true);
        setSuccessMessage();

        await http.post('/api/v1/users', {
            email: email,
            password: password
        }).then((response) => {
            setSuccessMessage(t("successMessage"))
        }).catch((error) => {
            if (error.response?.data) {
                if (error.response.data.statusCode === 400) {
                    setErrors(error.response.data.validationErrors)
                } else {
                    setGeneralError(error.response.data.message)
                }
            } else {
                setGeneralError(t("generalErrorMessage"))
            }
        }).finally(setApiProgress(false))
    }

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
                        <div className="text-center">
                            <button className="btn btn-primary"
                                    disabled={apiProgress}>
                                {apiProgress && (<Spinner sm={true}/>)}
                                {t("login")}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}