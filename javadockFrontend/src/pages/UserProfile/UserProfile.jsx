import http from "@/lib/http.js";
import {useParams} from "react-router-dom";
import * as React from "react";
import {useEffect, useState} from "react";
import {Alert} from "@/shared/components/Alert.jsx";
import {Spinner} from "@/shared/components/Spinner.jsx";
import {useTranslation} from "react-i18next";
import defaultProfileImage from "@/assets/avatars/avatar1.png"
import { MDBCol, MDBContainer, MDBRow, MDBCard} from 'mdb-react-ui-kit';
import { MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';

export function UserProfile() {
    const {id} = useParams()
    const [user, setUser] = useState(null)
    const {t} = useTranslation();
    const [apiProgress, setApiProgress] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    function getUser(id) {
        return http.get(`/api/v1/users/${id}`)
    }

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
    }, [])

    return <>
        {user && (
            <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol lg="9" xl="7">
                            <MDBCard>
                                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                        <MDBCardImage src={defaultProfileImage}
                                                      alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                                    </div>
                                    <div className="ms-3" style={{ marginTop: '130px' }}>
                                        <MDBTypography tag="h5">{user.username}</MDBTypography>
                                        <MDBCardText>{user.jobName}</MDBCardText>
                                    </div>
                                    <div className="position-absolute end-0 mx-3" style={{ marginTop: '155px' }}>
                                        <button type="button" className="btn btn-sm btn-outline-info">{t("updateProfile")}</button>
                                    </div>
                                </div>
                                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                    <div className="d-flex justify-content-end text-center py-1">
                                        <div>
                                            <MDBCardText className="small text-muted mb-0">{t("post")}</MDBCardText>
                                            <MDBCardText className="mb-1 h5">null</MDBCardText>
                                        </div>
                                        <div className="px-3">
                                            <MDBCardText className="small text-muted mb-0">{t("friends")}</MDBCardText>
                                            <MDBCardText className="mb-1 h5">null</MDBCardText>
                                        </div>
                                        <div>
                                            <MDBCardText className="small text-muted mb-0">{t("membershipTime")}</MDBCardText>
                                            <MDBCardText className="mb-1 h5">{user.membershipTime}</MDBCardText>
                                        </div>
                                        <div className="px-3">
                                            <MDBCardText className="small text-muted mb-0">{t("role")}</MDBCardText>
                                            <MDBCardText className="mb-1 h5">{user.role}</MDBCardText>
                                        </div>
                                    </div>
                                </div>
                                <MDBCardBody className="text-black p-4">
                                    <div className="mb-5">
                                        <p className="lead fw-normal mb-1">{t("about")}</p>
                                        <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                                            <MDBCardText className="font-italic mb-1">{t("email") + ": " +user.email}</MDBCardText>
                                            <MDBCardText className="font-italic mb-1">{t("university") + ": " +user.universityName}</MDBCardText>
                                            <MDBCardText className="font-italic mb-0">{t("age") + ": " +user.age}</MDBCardText>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <MDBCardText className="lead fw-normal mb-0">{t("posts")}</MDBCardText>
                                    </div>
                                    <MDBRow>
                                        <MDBCol className="mb-2">
                                            <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                                                          alt="image 1" className="w-100 rounded-3" />
                                        </MDBCol>
                                        <MDBCol className="mb-2">
                                            <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                                                          alt="image 1" className="w-100 rounded-3" />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow className="g-2">
                                        <MDBCol className="mb-2">
                                            <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                                                          alt="image 1" className="w-100 rounded-3" />
                                        </MDBCol>
                                        <MDBCol className="mb-2">
                                            <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                                                          alt="image 1" className="w-100 rounded-3" />
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        )}


        {apiProgress && (
            <Alert styleType="secondary" center><Spinner/></Alert>
        )}
        {errorMessage && (
            <Alert styleType="danger" center>{errorMessage}</Alert>
        )}
    </>
}