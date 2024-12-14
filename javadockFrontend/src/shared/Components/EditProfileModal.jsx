import { MDBContainer, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdbreact';
import {Input} from "@/shared/Components/Input.jsx";
import {Alert} from "@/shared/Components/Alert.jsx";
import {useTranslation} from "react-i18next";

export function EditProfileModal({
    isOpen,
    toggle,
    user,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    username,
    setUsername,
    job,
    setJob,
    university,
    setUniversity,
    editProfileSuccessMessage,
    editProfileWarningMessage,
    generalError,
    errors,
    onSave,
}) {
    
    const {t} = useTranslation();


    return (
        <MDBContainer>
            <MDBModal isOpen={isOpen} toggle={toggle} side position="bottom-right">
                <MDBModalHeader toggle={toggle}>{t("editProfile")}</MDBModalHeader>
                <MDBModalBody>
                    <Input
                        id="firstName"
                        defaultValue={user.firstName}
                        labelText={t("firstName")}
                        error={errors ? errors.firstName : null}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                    <Input
                        id="lastName"
                        defaultValue={user.lastName}
                        labelText={t("lastName")}
                        error={errors ? errors.lastName : null}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                    <Input
                        id="username"
                        defaultValue={user.username}
                        labelText={t("username")}
                        error={errors ? errors.username : null}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <Input
                        id="job"
                        defaultValue={user.job ? user.job : null}
                        labelText={t("job")}
                        onChange={(event) => setJob(event.target.value)}
                    />
                    <Input
                        id="university"
                        defaultValue={user.university ? user.university : null}
                        labelText={t("university")}
                        onChange={(event) => setUniversity(event.target.value)}
                    />
                    {editProfileSuccessMessage && (
                        <Alert styleType="success" center>{editProfileSuccessMessage}</Alert>
                    )}
                    {editProfileWarningMessage && (
                        <Alert styleType="warning" center>{editProfileWarningMessage}</Alert>
                    )}
                    {generalError && (
                        <Alert styleType="danger" center>{generalError}</Alert>
                    )}
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={toggle}>{t("close")}</MDBBtn>
                    {!editProfileSuccessMessage && (
                        <MDBBtn color="primary" onClick={onSave}>{t("save")}</MDBBtn>
                    )}
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
}
