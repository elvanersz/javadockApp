import {useEffect, useMemo, useState} from "react";
import {Input} from "../../shared/components/Input.jsx";
import {useTranslation} from "react-i18next";
import {Alert} from "@/shared/components/Alert.jsx";
import {Spinner} from "@/shared/components/Spinner.jsx";
import http from "@/lib/http";
import BasicDatePicker from "@/shared/components/BasicDatePicker.jsx";
import {JobSelector} from "@/shared/components/JobSelector.jsx";
import {UniversitySelector} from "@/shared/components/UniversitySelector.jsx";

export function Register() {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [username, setUsername] = useState();
    const [job, setJob] = useState();
    const [birthDate, setBirthDate] = useState(null);
    const [university, setUniversity] = useState();
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
                jobId: undefined
            }
        })
    }, [job])
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
                universityId: undefined
            }
        })
    }, [university])
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
        if (!firstName || !lastName || !username || !birthDate || !email || !password || password !== passwordConfirm) {
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
            jobId: job,
            birthDate: birthDate,
            universityId: university,
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
                        <JobSelector id="job"
                                     labelText={t("job")}
                                     error={errors.jobId ? true : false}
                                     onChange={(event) => setJob(event.target.value)}/>
                        <BasicDatePicker id="birthDate"
                                         labelText={t("birthDate")}
                                         value={birthDate}
                                         onChange={(date) => {
                                             setBirthDate(date)
                                         }}/>
                        <UniversitySelector id="university"
                                            labelText={t("university")}
                                            error={errors.universityId ? true : false}
                                            onChange={(event) => setUniversity(event.target.value)}/>
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
                            <button className="btn btn-primary"
                                    disabled={buttonDisable() || apiProgress}>
                                {apiProgress && (<Spinner sm={true}/>)}
                                {t("register")}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}