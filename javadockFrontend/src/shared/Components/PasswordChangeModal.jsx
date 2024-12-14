import { useMemo } from 'react';
import { MDBContainer, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdbreact';
import {Input} from "@/shared/Components/Input.jsx";
import {Alert} from "@/shared/Components/Alert.jsx";
import {useTranslation} from "react-i18next";

export function PasswordChangeModal({
    isOpen,
    toggle,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    newPasswordConfirm,
    setNewPasswordConfirm,
    passwordChangeSuccessMessage,
    generalError,
    errors,
    onSave
}) {
    const {t} = useTranslation();

    const passwordConfirmError = useMemo(() => {
        if (newPassword && newPassword !== newPasswordConfirm) {
            return t("passwordMismatch")
        } else {
            return "";
        }
    }, [newPassword, newPasswordConfirm]);


    return (
        <MDBContainer>
            <MDBModal isOpen={isOpen} toggle={toggle} side position="bottom-right">
                <MDBModalHeader toggle={toggle}>Update Password</MDBModalHeader>
                <MDBModalBody>
                    <Input
                        id="currentPassword"
                        labelText="Current Password" // t("currentPassword")
                        error={errors ? errors.password : null}
                        onChange={(event) => setCurrentPassword(event.target.value)}
                        type="password"
                    />
                    <Input
                        id="newPassword"
                        labelText="New Password" // t("newPassword")
                        error={errors ? errors.newPassword : null}
                        onChange={(event) => setNewPassword(event.target.value)}
                        type="password"
                    />
                    <Input
                        id="newPasswordConfirm"
                        labelText="Confirm New Password" // t("newPasswordConfirm")
                        error={passwordConfirmError}
                        onChange={(event) => setNewPasswordConfirm(event.target.value)}
                        type="password"
                    />
                    {passwordChangeSuccessMessage && (
                        <Alert styleType="success" center>{passwordChangeSuccessMessage}</Alert>
                    )}
                    {generalError && (
                        <Alert styleType="danger" center>{generalError}</Alert>
                    )}
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={toggle}>Close</MDBBtn>
                    {!passwordChangeSuccessMessage && (
                        <MDBBtn color="primary" onClick={onSave}>Save</MDBBtn>
                    )}
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
}
