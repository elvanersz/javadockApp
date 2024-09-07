import {useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import http from "@/lib/http.js";
import {Input} from "@/shared/Components/Input.jsx";
import {Alert} from "@/shared/Components/Alert.jsx";
import {Spinner} from "@/shared/Components/Spinner.jsx";
import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

export function PasswordReset() {
    const {passwordResetToken} = useParams();
    const [apiProgress, setApiProgress] = useState();
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [generalError, setGeneralError] = useState();
    const {t} = useTranslation();
    const [newPassword, setNewPassword] = useState();
    const [newPasswordConfirm, setNewPasswordConfirm] = useState();
    const navigate = useNavigate();

    const passwordConfirmError = useMemo(() => {
        if (newPassword && newPassword !== newPasswordConfirm) {
            return t("passwordMismatch");
        } else {
            return "";
        }
    }, [newPassword, newPasswordConfirm]);

    const buttonDisable = () => {
        if (newPassword !== newPasswordConfirm) {
            return true
        }
    }

    function passwordReset(passwordResetToken) {
        return http.patch(`/api/v1/users/password-reset/${passwordResetToken}`)
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setApiProgress(true);

        await axios.patch(`/api/v1/users/password-reset/${passwordResetToken}`, {
            password: newPassword
        })
            .then((response) => {
                setApiProgress(false)
                setSuccessMessage(response.data.message)

                setTimeout(() => {
                    navigate('/login')
                }, 3000)

            }).catch((error) => {
                if (error.response?.data) {
                    setApiProgress(false)
                    if (error.response.data.statusCode === 400) {
                        setErrors(error.response.data.validationErrors)
                    } else {
                        setGeneralError(error.response.data.message)
                    }
                } else {
                    setApiProgress(false)
                    setGeneralError(t("generalErrorMessage"))
                }
            })
    }

    useEffect(() => {
        setErrors(function (lastErrors) {
            return {
                ...lastErrors,
                password: undefined
            }
        })
    }, [newPassword])
    useEffect(() => {
        async function reset() {
            setApiProgress(true)
            try {
                await passwordReset(passwordResetToken);
            } catch (error) {
                setErrorMessage(error.response.data.message)
            } finally {
                setApiProgress(false);
            }
        }

        reset()
    }, [passwordResetToken])

    return (
        <>
            {!errorMessage && !generalError && <div className="container">
                <div className="col-xl-6 offset-xl-3">
                    <form className="card" onSubmit={onSubmit}>
                        <div className="text-center card-header">
                            <h1>{t("resetYourPassword")}</h1>
                        </div>
                        <div className="card-body">
                            <Input id="newPassword"
                                   labelText={t("newPassword")}
                                   error={errors ? errors.password : null}
                                   onChange={(event) => setNewPassword(event.target.value)}
                                   type="password"/>
                            <Input id="newPasswordConfirm"
                                   labelText={t("newPasswordConfirm")}
                                   error={passwordConfirmError}
                                   onChange={(event) => setNewPasswordConfirm(event.target.value)}
                                   type="password"/>
                            {successMessage && (
                                <Alert styleType="success" center>{successMessage}</Alert>
                            )}
                            <div className="text-center">
                                <button className="btn btn-primary"
                                        onChange={onSubmit}
                                        disabled={buttonDisable() || apiProgress}>
                                    {apiProgress && (<Spinner sm={true}/>)}
                                    {t("save")}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>}
            {errorMessage && (
                <Alert styleType="danger" center>{errorMessage}</Alert>
            )}
            {generalError && (
                <Alert styleType="danger" center>{generalError}</Alert>
            )}
        </>
    );
}