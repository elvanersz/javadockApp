import http from "@/lib/http.js";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useMemo, useState,} from "react";
import {Alert} from "@/shared/Components/Alert.jsx";
import {Spinner} from "@/shared/Components/Spinner.jsx";
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
import {useAuthDispatch, useAuthState} from "@/shared/State/context.jsx";
import {MDBBtn} from "mdbreact";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faLock, faTrashCan, faPlus} from "@fortawesome/free-solid-svg-icons"
import { PostListItem } from "../../shared/Components/PostListItem";
import { AddNewPostModal } from "@/shared/Components/AddNewPostModal.jsx";
import { PasswordChangeModal } from "@/shared/Components/PasswordChangeModal.jsx";
import { EditProfileModal } from "@/shared/Components/EditProfileModal.jsx";
import { DeleteUserModal } from "@/shared/Components/DeleteUserModal.jsx";
import { ProfileImageChangeModal } from "@/shared/Components/ProfileImageChangeModal.jsx";

export function UserProfile() {
    const {id} = useParams();
    const {t} = useTranslation();
    const authState = useAuthState();
    const dispatch = useAuthDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [username, setUsername] = useState();
    const [job, setJob] = useState();
    const [university, setUniversity] = useState();
    const [currentPassword, setCurrentPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [newPasswordConfirm, setNewPasswordConfirm] = useState();
    const [newImage, setNewImage] = useState();
    const [tempImage, setTempImage] = useState();
    const [apiProgress, setApiProgress] = useState(false);
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState();
    const [generalError, setGeneralError] = useState();
    const [editProfileMode, setEditProfileMode] = useState();
    const [passwordChangeMode, setPasswordChangeMode] = useState();
    const [deleteUserMode, setDeleteUserMode] = useState();
    const [profileImageChangeMode, setProfileImageChangeMode] = useState();
    const [profileImageChangeSuccessMessage, setProfileImageChangeSuccessMessage] = useState();
    const [deleteUserSuccessMessage, setDeleteUserSuccessMessage] = useState();
    const [passwordChangeSuccessMessage, setPasswordChangeSuccessMessage] = useState();
    const [editProfileSuccessMessage, setEditProfileSuccessMessage] = useState();
    const [editProfileWarningMessage, setEditProfileWarningMessage] = useState();
    const [postHeader, setPostHeader] = useState('');
    const [postContent, setPostContent] = useState('');
    const [addNewPostMode, setAddNewPostMode] = useState(false);
    const [addNewPostSuccessMessage, setAddNewPostSuccessMessage] = useState(null);

    const passwordConfirmError = useMemo(() => {
        if (newPassword && newPassword !== newPasswordConfirm) {
            return t("passwordMismatch");
        } else {
            return "";
        }
    }, [newPassword, newPasswordConfirm]);

    function getUser(id) {
        return http.get(`/api/v1/users/${id}`)
    }

    function onClickDeleteUserModal() {
        setDeleteUserMode(!deleteUserMode);
        setDeleteUserSuccessMessage();
        setGeneralError();
    }

    function onClickDeleteUserButton() {
        http.delete(`/api/v1/users/${id}`)
            .then((response) => {
                setGeneralError()
                setDeleteUserSuccessMessage(response.data.message)
                dispatch({type: "logout-success"})

                setTimeout(() => {
                    navigate('/')
                }, 3000)

            }).catch((error) => {
                console.log(error)
                setGeneralError(t("generalErrorMessage"))
            }
        )
    }

    function onClickEditProfileModal() {
        setEditProfileMode(!editProfileMode);
        setEditProfileSuccessMessage();
        setEditProfileWarningMessage()
        setErrors();
        setGeneralError();

        setFirstName(authState.firstName)
        setLastName(authState.lastName)
        setUsername(authState.username)
        setJob(authState.job)
        setUniversity(authState.university)
    }

    function onClickEditProfileButton() {
        http.patch(`/api/v1/users/${id}`, {
            firstName: firstName,
            lastName: lastName,
            username: username,
            job: job,
            university: university
        }).then((response) => {
            dispatch({
                type: "edit-profile-success", data: {
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    job: job,
                    university: university
                }
            })
            setEditProfileWarningMessage()
            setGeneralError()
            setEditProfileSuccessMessage(response.data.message)
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }).catch((error) => {
            setEditProfileWarningMessage()
            if (error.response?.data) {
                if (error.response.data.statusCode === 400) {
                    setErrors(error.response.data.validationErrors)
                } else if (error.response.data.statusCode === 418) {
                    setEditProfileWarningMessage(error.response.data.message)
                } else {
                    setGeneralError(error.response.data.message)
                }
            } else {
                setGeneralError(t("generalErrorMessage"))
            }
        })
    }


    function onClickProfileImageChangeModal() {
        setProfileImageChangeMode(!profileImageChangeMode);
        setNewImage();
        setTempImage();
        setProfileImageChangeSuccessMessage();
        setErrors();
        setGeneralError();
    }

    const onClickProfileImage = (event) => {
        const valid_extensions = /(\.jpg|\.jpeg|\.png|\.PNG|\.JPEG|\.JPG)$/i;

        //Resim dosyası olup olmadığı kontrol edilir.
        if (valid_extensions.test(event.target.files[0].name)){
            if (event.target.files.length < 1) return;
            const file = event.target.files[0]
            const fileReader = new FileReader();

            fileReader.onloadend = () => {
                const data = fileReader.result
                setNewImage(data);
                setTempImage(data)
            }
            fileReader.readAsDataURL(file);
        } else {
            setGeneralError(t("pleaseSelectImageFile"))
        }
    }

    function onClickProfileImageChangeButton() {
        http.patch(`/api/v1/users/profile-image-change/${id}`, {
            image: newImage
        }).then((response) => {
            dispatch({
                type: "profile-image-success", data: {
                    image: newImage
                }
            })
            setGeneralError()
            setProfileImageChangeSuccessMessage(response.data.message)
            setTimeout(() => {
                window.location.reload();
            }, 1000);
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
        })
    }


    function onClickPasswordChangeModal() {
        setPasswordChangeMode(!passwordChangeMode);
        setPasswordChangeSuccessMessage();
        setErrors();
        setGeneralError();
    }

    function onClickPasswordChangeButton() {
        http.patch(`/api/v1/users/password-change/${id}`, {
            password: currentPassword,
            newPassword: newPassword
        }).then((response) => {
            setGeneralError()
            setPasswordChangeSuccessMessage(response.data.message)
            setTimeout(() => {
                window.location.reload();
            }, 1000);
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
        })
    }

    function onClickAddNewPostModal() {
        setAddNewPostMode(!addNewPostMode);
        setAddNewPostSuccessMessage(null);
        setGeneralError(null);
        setPostHeader('');
        setPostContent('');
        setErrors({});
    }

    function onClickAddNewPostButton() {
        http.post(`/api/v1/posts`, {
            userId: authState.id,
            header: postHeader,
            content: postContent
        }).then((response) => {
            setGeneralError(null);
            setAddNewPostSuccessMessage(response.data.message);
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }).catch((error) => {
            if (error.response?.data) {
                if (error.response.data.statusCode === 400) {
                    setErrors(error.response.data.validationErrors);
                } else {
                    setGeneralError(error.response.data.message);
                }
            } else {
                setGeneralError(t("generalErrorMessage"));
            }
        });
    }


    useEffect(() => {
        async function user() {
            setApiProgress(true)
            try {
                const userResponse = await getUser(id);
                setUser(userResponse.data)
            } catch (error) {
                setErrorMessage(error.userResponse.data.message)
            } finally {
                setApiProgress(false);
            }
        }

        user()
    }, [id])

    useEffect(() => {
        const fields = { firstName, lastName, username, job, university, currentPassword, newPassword, newImage };
        setErrors((lastErrors) => {
            const updatedErrors = { ...lastErrors };
            Object.keys(fields).forEach((key) => {
                if (fields[key] !== undefined) {
                    updatedErrors[key] = undefined;
                }
            });
            return updatedErrors;
        });
    }, [firstName, lastName, username, job, university, currentPassword, newPassword, newImage]);

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
                                        <Link>
                                            <MDBCardImage src={tempImage || user.image || defaultProfileImage}
                                                          onClick={authState.id === user.id ? onClickProfileImageChangeModal : null}
                                                          alt="Generic placeholder image"
                                                          className="mt-3 mb-2 img-thumbnail" fluid
                                                          style={{height: '180px', width: "150px"}}/>
                                        </Link>
                                    </div>
                                    <div className="ms-3" style={{marginTop: '130px'}}>
                                        <MDBTypography tag="h5"><b>{user.username}</b></MDBTypography>
                                        {user.job !== null && (<MDBCardText>{user.job}</MDBCardText>)}
                                    </div>
                                    <div className="position-absolute end-0 mx-3" style={{marginTop: '155px'}}>
                                        {authState.id === user.id &&
                                            <div>
                                                <button type="button"
                                                        onClick={onClickPasswordChangeModal}
                                                        className="btn btn-sm btn-outline-info rounded-circle">
                                                    <FontAwesomeIcon icon={faLock}/>
                                                </button>
                                                <button type="button"
                                                        onClick={onClickEditProfileModal}
                                                        className="btn btn-sm btn-outline-info rounded-circle mx-2">
                                                    <FontAwesomeIcon icon={faPen}/>
                                                </button>
                                                <button type="button"
                                                        onClick={onClickDeleteUserModal}
                                                        className="btn btn-sm btn-outline-danger rounded-circle">
                                                    <FontAwesomeIcon icon={faTrashCan}/>
                                                </button>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="p-4 text-black">
                                    <div className="d-flex justify-content-end text-center py-1">
                                        <div>
                                            <MDBCardText className="small text-muted mb-0">{t("post")}</MDBCardText>
                                            <MDBCardText className="mb-1 h5">{user.postList.length}</MDBCardText>
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
                                                className="mb-1">{t("name") + ": " + user.fullName}
                                            </MDBCardText>
                                            <MDBCardText
                                                className="mb-1">{t("email") + ": " + user.email}
                                            </MDBCardText>
                                            {user.university && user.university?.university !== null && (
                                                <MDBCardText className="mb-1">
                                                    {t("university") + ": " + user.university}
                                                </MDBCardText>
                                            )}
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                    <MDBCardText className="lead fw-normal mb-0">
                                        {user.postList.length > 0 ? t("posts") : t("noPostsYet")}
                                    </MDBCardText>
                                    {authState.id === user.id &&
                                        <MDBBtn outline color="black" style={{ width: "180px", height: "40px" }} onClick={onClickAddNewPostModal}>
                                            <FontAwesomeIcon icon={faPlus} style={{ marginRight: "10px" }} />
                                            {t("addNewPost")}
                                        </MDBBtn>
                                    }
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        {user.postList.map(post => {
                                            return <PostListItem key={post.id} post={post}/>
                                        })}
                                    </ul>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>

            </div>
        )}
        <PasswordChangeModal
            isOpen={passwordChangeMode}
            toggle={onClickPasswordChangeModal}
            currentPassword={currentPassword}
            setCurrentPassword={setCurrentPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            newPasswordConfirm={newPasswordConfirm}
            setNewPasswordConfirm={setNewPasswordConfirm}
            passwordChangeSuccessMessage={passwordChangeSuccessMessage}
            generalError={generalError}
            errors={errors}
            onSave={onClickPasswordChangeButton}
        />
        <ProfileImageChangeModal
            profileImageChangeMode={profileImageChangeMode}
            onClickProfileImageChangeModal={onClickProfileImageChangeModal}
            tempImage={tempImage}
            user={user}
            defaultProfileImage={defaultProfileImage}
            onClickProfileImage={onClickProfileImage}
            onClickProfileImageChangeButton={onClickProfileImageChangeButton}
            errors={errors}
            profileImageChangeSuccessMessage={profileImageChangeSuccessMessage}
            generalError={generalError}
        />
        <EditProfileModal
            isOpen={editProfileMode}
            toggle={onClickEditProfileModal}
            user={authState}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            username={username}
            setUsername={setUsername}
            job={job}
            setJob={setJob}
            university={university}
            setUniversity={setUniversity}
            editProfileSuccessMessage={editProfileSuccessMessage}
            editProfileWarningMessage={editProfileWarningMessage}
            generalError={generalError}
            errors={errors}
            onSave={onClickEditProfileButton}
        />
        <DeleteUserModal
            isOpen={deleteUserMode}
            toggle={onClickDeleteUserModal}
            user={authState}
            deleteUserSuccessMessage={deleteUserSuccessMessage}
            generalError={generalError}
            onDelete={onClickDeleteUserButton}
        />
        <AddNewPostModal 
            addNewPostMode={addNewPostMode}
            onClose={onClickAddNewPostModal}
            onSave={onClickAddNewPostButton}
            postContent={postContent}
            setPostContent={setPostContent}
            postHeader={postHeader}
            setPostHeader={setPostHeader}
            errors={errors}
            addNewPostSuccessMessage={addNewPostSuccessMessage}
            generalError={generalError}
        />
        {apiProgress && (
            <Alert styleType="secondary" center><Spinner/></Alert>
        )}
        {errorMessage && (
            <Alert styleType="danger" center>{errorMessage}</Alert>
        )}
    </>
}