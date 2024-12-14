import {MDBContainer, MDBModal, MDBModalHeader, MDBModalBody, MDBCardImage, MDBModalFooter, MDBBtn} from 'mdbreact';
import {Input} from "@/shared/Components/Input.jsx";
import {Alert} from "@/shared/Components/Alert.jsx";
import {useTranslation} from "react-i18next";

export function ProfileImageChangeModal({
  profileImageChangeMode,
  onClickProfileImageChangeModal,
  tempImage,
  user,
  defaultProfileImage,
  onClickProfileImage,
  onClickProfileImageChangeButton,
  errors,
  profileImageChangeSuccessMessage,
  generalError
}) {

    const {t} = useTranslation();


    return (
        profileImageChangeMode && (
            <MDBContainer>
                <MDBModal isOpen={profileImageChangeMode} toggle={onClickProfileImageChangeModal} side position="bottom-right">
                    <MDBModalHeader toggle={onClickProfileImageChangeModal}>{t("editProfileImage")}</MDBModalHeader>
                    <MDBModalBody className="text-center">
                        <MDBCardImage
                            src={tempImage || user.image || defaultProfileImage}
                            alt="Generic placeholder image"
                            className="mb-2 img-thumbnail"
                            fluid
                            style={{ height: '300px', width: '250px' }}
                            />
                        <Input
                            id="newImage"
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={onClickProfileImage}
                            error={errors ? errors.image : null}
                        />
                        {profileImageChangeSuccessMessage && (
                            <Alert styleType="success" center>
                                {profileImageChangeSuccessMessage}
                            </Alert>
                        )}
                        {generalError && (
                            <Alert styleType="danger" center>
                                {generalError}
                            </Alert>
                        )}
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={onClickProfileImageChangeModal}>
                            {t("close")}
                        </MDBBtn>
                        {!profileImageChangeSuccessMessage && (
                            <MDBBtn color="primary" onClick={onClickProfileImageChangeButton}>
                                {t("save")}
                            </MDBBtn>
                        )}
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        )
    );
}
