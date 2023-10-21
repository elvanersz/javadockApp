import {useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import http from "@/lib/http.js";
import {Input} from "@/shared/components/Input.jsx";
import {Alert} from "@/shared/components/Alert.jsx";
import {Spinner} from "@/shared/components/Spinner.jsx";
import * as React from "react";

export function PasswordReset() {
    const [apiProgress, setApiProgress] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState();
    const {t} = useTranslation();
    const [newPassword, setNewPassword] = useState();
    const [newPasswordConfirm, setNewPasswordConfirm] = useState();

    const passwordConfirmError = useMemo(() => {
        if (newPassword && newPassword !== newPasswordConfirm) {
            return t("passwordMismatch");
        } else {
            return "";
        }
    }, [newPassword, newPasswordConfirm]);

    const onSubmit = async (event) => {
        event.preventDefault();
        setApiProgress(true);

        await http.post(`/api/v1/password-reset`,
            {newPassword: newPassword}
        ).then(() => {
            setSuccessMessage(t("mailSentMessage"))
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