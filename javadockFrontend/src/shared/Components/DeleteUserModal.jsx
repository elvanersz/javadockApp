import { MDBContainer, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdbreact';
import {Input} from "@/shared/Components/Input.jsx";
import {Alert} from "@/shared/Components/Alert.jsx";
import {useTranslation} from "react-i18next";

export function DeleteUserModal({
    isOpen,
    toggle,
    user,
    deleteUserSuccessMessage,
    generalError,
    onDelete
}) {

    const {t} = useTranslation();


    return (
        <MDBContainer>
            <MDBModal isOpen={isOpen} toggle={toggle} side position="bottom-right">
                <MDBModalHeader toggle={toggle}>{t("deleteYourAccount")}</MDBModalHeader>
                <MDBModalBody>
                    <Input
                        id="username"
                        disabled={true}
                        defaultValue={user.username}
                        labelText={t("username")}
                    />
                    <Input
                        id="email"
                        disabled={true}
                        defaultValue={user.email}
                        labelText={t("email")}
                    />
                    {!deleteUserSuccessMessage ? (
                        <span className="text-danger">
                            {t("warning")}: {t("userDeleteWarning")}
                        </span>
                    ) : (
                        <Alert styleType="success" center>
                            {deleteUserSuccessMessage}
                        </Alert>
                    )}
                    {generalError && (
                        <Alert styleType="danger" center>
                            {generalError}
                        </Alert>
                    )}
                </MDBModalBody>
                {!deleteUserSuccessMessage && (
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={toggle}>{t("close")}</MDBBtn>
                        <MDBBtn color="danger" onClick={onDelete}>{t("delete")}</MDBBtn>
                    </MDBModalFooter>
                )}
            </MDBModal>
        </MDBContainer>
    );
}