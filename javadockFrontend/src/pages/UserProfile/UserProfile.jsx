import http from "@/lib/http.js";
import {useParams} from "react-router-dom";
import * as React from "react";
import {useEffect, useMemo, useState,} from "react";
import {Alert} from "@/shared/components/Alert.jsx";
import {Spinner} from "@/shared/components/Spinner.jsx";
import {useTranslation} from "react-i18next";
import defaultProfileImage from "@/assets/avatars/avatar1.png"
import {
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBTypography,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard
} from 'mdb-react-ui-kit';
import {useAuthState} from "@/shared/state/context.jsx";
import {MDBBtn, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from "mdbreact";
import {Input} from "@/shared/components/Input.jsx";
import {JobSelector} from "@/shared/components/JobSelector.jsx";
import {UniversitySelector} from "@/shared/components/UniversitySelector.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faLock, faTrashCan} from "@fortawesome/free-solid-svg-icons"

export function UserProfile() {
    const {id} = useParams();
    const [user, setUser] = useState(null);
    const {t} = useTranslation();
    const [apiProgress, setApiProgress] = useState(false);
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState();
    const authState = useAuthState();
    const [editProfileMode, setEditProfileMode] = useState();
    const [updatePasswordMode, setUpdatePasswordMode] = useState();
    const [deleteUserMode, setDeleteUserMode] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [username, setUsername] = useState();
    const [job, setJob] = useState();
    const [university, setUniversity] = useState();
    const [currentPassword, setCurrentPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [newPasswordConfirm, setNewPasswordConfirm] = useState();

    function getUser(id) {
        return http.get(`/api/v1/user/${id}`)
    }

    function onClickEditProfile() {
        setEditProfileMode(!editProfileMode);
    }
    function onClickUpdatePassword() {
        setUpdatePasswordMode(!updatePasswordMode);
    }
    function onClickDeleteUser() {
        setDeleteUserMode(!deleteUserMode);
    }

    const passwordConfirmError = useMemo(() => {
        if (newPassword && newPassword !== newPasswordConfirm) {
            return t("passwordMismatch");
        } else {
            return "";
        }
    }, [newPassword, newPasswordConfirm]);

    useEffect(() => {
        async function user() {
            setApiProgress(true)
            try {
                const response = await getUser(id);
                setUser(response.data)
            } catch (error) {
                setErrorMessage(error.response.data.message)
            } finally {
                setApiProgress(false);
            }
        }

        user()
    }, [id])
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
                universityId: undefined
            }
        })
    }, [university])
    useEffect(() => {
        setErrors(function (lastErrors) {
            return {
                ...lastErrors,
                password: undefined
            }
        })
    }, [currentPassword])

    return <>
        {user && (
            <div>
                <MDBContainer className="h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol lg="9" xl="7">
                            <MDBCard style={{backgroundColor: "#F8F6F4"}}>
                                <div className="rounded-top text-white d-flex flex-row"
                                     style={{backgroundColor: '#000', height: '200px'}}>
                                    <div className="ms-4 mt-5 d-flex flex-column" style={{width: '150px'}}>
                                        <MDBCardImage src={defaultProfileImage}
                                                      alt="Generic placeholder image"
                                                      className="mt-4 mb-2 img-thumbnail" fluid
                                                      style={{width: '150px', zIndex: '1'}}/>
                                    </div>
                                    <div className="ms-3" style={{marginTop: '130px'}}>
                                        <MDBTypography tag="h5">{user.username}</MDBTypography>
                                        <MDBCardText>{user.job.jobName}</MDBCardText>
                                    </div>
                                    <div className="position-absolute end-0 mx-3" style={{marginTop: '155px'}}>
                                        {authState.id === user.id &&
                                            <div>
                                                <button type="button"
                                                        onClick={onClickUpdatePassword}
                                                        className="btn btn-sm btn-outline-info rounded-circle mx-2">
                                                    <FontAwesomeIcon icon={faLock} />
                                                </button>
                                                <button type="button"
                                                        onClick={onClickEditProfile}
                                                        className="btn btn-sm btn-outline-info rounded-circle">
                                                    <FontAwesomeIcon icon={faPen} />
                                                </button>
                                                <button type="button"
                                                        onClick={onClickDeleteUser}
                                                        className="btn btn-sm btn-outline-danger rounded-circle mx-2">
                                                    <FontAwesomeIcon icon={faTrashCan} />
                                                </button>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="p-4 text-black">
                                    <div className="d-flex justify-content-end text-center py-1">
                                        <div className="px-3">
                                            <MDBCardText className="small text-muted mb-0">{t("post")}</MDBCardText>
                                            <MDBCardText className="mb-1 h5">null</MDBCardText>
                                        </div>
                                        <div>
                                            <MDBCardText className="small text-muted mb-0">{t("age")}</MDBCardText>
                                            <MDBCardText className="mb-1 h5">{user.age}</MDBCardText>
                                        </div>
                                        <div className="px-3">
                                            <MDBCardText
                                                className="small text-muted mb-0">{t("membershipTime")}</MDBCardText>
                                            <MDBCardText className="mb-1 h5">{user.membershipTime}</MDBCardText>
                                        </div>
                                        <div>
                                            <MDBCardText className="small text-muted mb-0">{t("role")}</MDBCardText>
                                            <MDBCardText className="mb-1 h5">{user.role}</MDBCardText>
                                        </div>
                                    </div>
                                </div>
                                <MDBCardBody className="text-black p-4">
                                    <div className="mb-5">
                                        <p className="lead fw-normal mb-1">{t("about")}</p>
                                        <div className="p-4">
                                            <MDBCardText
                                                className="font-italic mb-1">{t("name") + ": " + user.fullName}</MDBCardText>
                                            <MDBCardText
                                                className="font-italic mb-1">{t("email") + ": " + user.email}</MDBCardText>
                                            <MDBCardText className="font-italic mb-1">
                                                {user.university.universityName !== null && t("university") + ": " + user.university.universityName}
                                            </MDBCardText>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <MDBCardText className="lead fw-normal mb-0">{t("posts")}</MDBCardText>
                                    </div>
                                    <MDBRow className="g-2">
                                        <MDBCol className="mb-2">
                                            <MDBCardImage
                                                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                                                alt="image 1" className="w-100 rounded-3"/>
                                        </MDBCol>
                                        <MDBCol className="mb-2">
                                            <MDBCardImage
                                                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                                                alt="image 1" className="w-100 rounded-3"/>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>

            </div>
        )}
        {editProfileMode && (
            <MDBContainer>
                <MDBModal isOpen={editProfileMode} toggle={onClickEditProfile} side position="bottom-right">
                    <MDBModalHeader toggle={onClickEditProfile}>{t("editProfile")}</MDBModalHeader>
                    <MDBModalBody>
                        <Input id="firstName"
                               defaultValue={user.firstName}
                               labelText={t("firstName")}
                               error={errors ? errors.firstName : null}
                               onChange={(event) => setFirstName(event.target.value)}/>
                        <Input id="lastName"
                               defaultValue={user.lastName}
                               labelText={t("lastName")}
                               error={errors ? errors.lastName : null}
                               onChange={(event) => setLastName(event.target.value)}/>
                        <Input id="username"
                               defaultValue={user.username}
                               labelText={t("username")}
                               error={errors ? errors.username : null}
                               onChange={(event) => setUsername(event.target.value)}/>
                        <JobSelector id="job"
                                     defaultValue={user.job.jobId}
                                     labelText={t("job")}
                                     error={errors.jobId ? true : false}
                                     onChange={(event) => setJob(event.target.value)}/>
                        <UniversitySelector id="university"
                                            defaultValue={"" || user.university.universityId}
                                            labelText={t("university")}
                                            error={errors.universityId ? true : false}
                                            onChange={(event) => setUniversity(event.target.value)}/>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={onClickEditProfile}>{t("close")}</MDBBtn>
                        <MDBBtn color="primary">{t("saveChanges")}</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        )}
        {updatePasswordMode && (
            <MDBContainer>
                <MDBModal isOpen={updatePasswordMode} toggle={onClickUpdatePassword} side position="bottom-right">
                    <MDBModalHeader toggle={onClickUpdatePassword}>{t("updatePassword")}</MDBModalHeader>
                    <MDBModalBody>
                        <Input id="currentPassword"
                               labelText={t("currentPassword")}
                               error={errors ? errors.password : null}
                               onChange={(event) => setCurrentPassword(event.target.value)}
                               type="password"/>
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
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={onClickUpdatePassword}>{t("close")}</MDBBtn>
                        <MDBBtn color="primary">{t("save")}</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        )}
        {deleteUserMode && (
            <MDBContainer>
                <MDBModal isOpen={deleteUserMode} toggle={onClickDeleteUser} side position="bottom-right">
                    <MDBModalHeader toggle={onClickDeleteUser}>{t("userDelete")}</MDBModalHeader>
                    <MDBModalBody>
                        <Input id="username"
                               disabled={true}
                               defaultValue={user.username}
                               labelText={t("username")}
                               error={errors ? errors.username : null}
                               onChange={(event) => setUsername(event.target.value)}/>
                        <Input id="email"
                               disabled={true}
                               labelText={t("email")}
                               defaultValue={user.email}
                               error={errors ? errors.email : null}
                               onChange={(event) => setEmail(event.target.value)}/>
                        <span className="text-danger">{t("warning")}: {t("userDeleteWarning")}</span>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={onClickDeleteUser}>{t("close")}</MDBBtn>
                        <MDBBtn color="danger">{t("delete")}</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        )}
        {apiProgress && (
            <Alert styleType="secondary" center><Spinner/></Alert>
        )}
        {errorMessage && (
            <Alert styleType="danger" center>{errorMessage}</Alert>
        )}
    </>
}