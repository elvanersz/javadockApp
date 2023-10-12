import {useEffect, useMemo, useState} from "react";
import {Input} from "../../shared/components/Input.jsx";
import {useTranslation} from "react-i18next";
import {Alert} from "@/shared/components/Alert.jsx";
import {Spinner} from "@/shared/components/Spinner.jsx";
import http from "@/lib/http";
import BasicDatePicker from "@/shared/components/BasicDatePicker.jsx";
import {JobSelector} from "@/shared/components/JobSelector.jsx";

export function SingUp() {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [username, setUsername] = useState();
    const [job, setJob] = useState();
    const [birthDate, setBirthDate] = useState(null);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();
    const [apiProgress, setApiProgress] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState();
    const {t} = useTranslation();

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
                birthDate: undefined
            }
        })
    }, [birthDate])
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
        if (!firstName || !lastName || !username || !birthDate || !email || !password || password !== passwordRepeat) {
            return true
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        setApiProgress(true);
        setSuccessMessage();

        await http.post('/api/v1/users', {
            firstName: firstName,
            lastName: lastName,
            username: username,
            birthDate: birthDate,
            email: email,
            password: password
        }).then((response) => {
            setSuccessMessage(t("successMessage"))
            console.log(response.data)
        }).catch((error) => {
            if (error.response?.data) {
                console.log(error.response)
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
                        <h1>{t("singUp")}</h1>
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
                        {/*<JobSelector id="job"
                                     labelText={t("job")}
                                     onChange={(event) => console.log(event.target.value)}/>
                        */}
                        <BasicDatePicker id="birthDate"
                                         labelText={t("birthDate")}
                                         value={birthDate}
                                         onChange={(date) => {
                                             setBirthDate(date)
                                         }}/>
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
                        {successMessage && (
                            <Alert styleType="success" center>{successMessage}</Alert>
                        )}
                        {generalError && (
                            <Alert styleType="danger" center>{generalError}</Alert>
                        )}
                        <div className="text-center">
                            <button className="btn btn-primary"
                                    disabled={buttonDisable() || apiProgress}>
                                {apiProgress && (<Spinner sm={true}/>)}
                                {t("singUp")}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}