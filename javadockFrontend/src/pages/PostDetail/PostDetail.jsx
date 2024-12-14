import http from "@/lib/http.js";
import {useEffect, useState} from "react";
import {useAuthState} from "@/shared/State/context.jsx";
import {Alert} from "@/shared/Components/Alert.jsx";
import {useParams, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrashCan, faArrowUp, faXmark} from "@fortawesome/free-solid-svg-icons";
import {MDBBtn, MDBModal, MDBModalBody, MDBModalFooter} from "mdbreact";
import {
  MDBCard,
  MDBContainer,
  MDBCardBody,
  MDBCardTitle,
  MDBTextArea,
  MDBCardText,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';

export function PostDetail(props) {
    const {id} = useParams();
    const {t} = useTranslation();
    const authState = useAuthState();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [header, setHeader] = useState('');
    const [content, setContent] = useState('');
    const [postEditMode, setPostEditMode] = useState(false);
    const [errors, setErrors] = useState({});
    const [apiProgress, setApiProgress] = useState(false);
    const [deletePostMode, setDeletePostMode] = useState(false);
    const [deletePostSuccessMessage, setDeletePostSuccessMessage] = useState();
    const [generalError, setGeneralError] = useState();
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedContent, setEditedContent] = useState('');

    function getPost(id) {
        return http.get(`/api/v1/posts/${id}`)
    }

    function onClickDeletePostModal() {
        setDeletePostMode(!deletePostMode);
        setDeletePostSuccessMessage();
        setGeneralError();
    }

    function onClickDeletePostButton() {
        http.delete(`/api/v1/posts/${id}`)
            .then((response) => {
                setGeneralError();
                setDeletePostSuccessMessage(response.data.message);
                navigate(`/users/${post.userId}`);
            }).catch((error) => {
                console.log(error);
                setGeneralError(t("generalErrorMessage"));
            });
    }

    function onClickPostEditCloseButton() {
        setPostEditMode(!postEditMode);
        setHeader(post.header);
        setContent(post.content);
        setGeneralError();
        setErrors({});
    }

    function onClickPostSaveButton() {
        setApiProgress(true);
        http.patch(`/api/v1/posts/${id}`, { header, content })
            .then((response) => {
                setPost(response.data);
                setPostEditMode(false);
                window.location.reload();
            })
            .catch((error) => {
                if (error.response?.data) {
                    if (error.response.data.statusCode === 400) {
                        setErrors(error.response.data.validationErrors);
                    } else {
                        setGeneralError(error.response.data.message);
                    }
                } else {
                    setGeneralError(t("generalErrorMessage"));
                }
            })
            .finally(() => {
                setApiProgress(false);
            });
    }

    function onClickAddNewCommentButton() {
        if(newComment){
            setApiProgress(true)
            http.post(`/api/v1/comments`, {
            userId: authState.id,
            postId: post.id,
            content: newComment
            }).then((response) => {
                setGeneralError(null);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
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
    }

    function onClickDeleteCommentButton(commentId) {
        http.delete(`/api/v1/comments/${commentId}`)
            .then((response) => {
                setGeneralError();
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }).catch((error) => {
                console.log(error);
                setGeneralError(t("generalErrorMessage"));
            });
    }

    function onClickCommentSaveButton(commentId) {
        setApiProgress(true);
        http.patch(`/api/v1/comments/${commentId}`, { content: editedContent })
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => {
                if (error.response?.data) {
                    if (error.response.data.statusCode === 400) {
                        setErrors(error.response.data.validationErrors);
                    } else {
                        setGeneralError(error.response.data.message);
                    }
                } else {
                    setGeneralError(t("generalErrorMessage"));
                }
            })
            .finally(() => {
                setApiProgress(false);
            });
    }

    const handleContentInputChange = (event) => {
        setContent(event.target.value);
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
    };

    const handleEditButtonClick = (commentId, content) => {
        console.log(commentId)
        setEditingCommentId(commentId);
        setEditedContent(content);
    };

    useEffect(() => {
        async function post() {
            setApiProgress(true);
            try {
                const response = await getPost(id);
                setPost(response.data);
                setHeader(response.data.header);
                setContent(response.data.content);
            } catch (error) {
                setErrors(error.response.data.message);
            } finally {
                setApiProgress(false);
            }
        }

        post();
    }, [id]);

    return <>
        {post && (
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {postEditMode ? (
                            <input
                                type="text"
                                value={header}
                                onChange={(e) => setHeader(e.target.value)}
                                className={errors && errors.header ? "form-control is-invalid" : "form-control"}
                            />
                        ) : (
                            post.header
                        )}
                        {authState.id === post.userId && !postEditMode && editingCommentId === null &&
                            <div>
                                <button type="button"
                                    className="btn btn-sm btn-outline-primary rounded-circle"
                                    style={{ marginRight: '10px' }}
                                    onClick={() => setPostEditMode(!postEditMode)}>
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                                <button type="button"
                                    onClick={onClickDeletePostModal}
                                    className="btn btn-sm btn-outline-danger rounded-circle">
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                            </div>
                        }
                    </MDBCardTitle>
                    <MDBCardText>
                        {postEditMode ? (
                            <div>
                                <MDBTextArea
                                    id="content"
                                    onChange={(e) => setContent(e.target.value)}
                                    className={errors && errors.content ? "form-control is-invalid" : "form-control"}
                                    value={content}
                                    onInput={handleContentInputChange}
                                    rows={content.split("\n").length}
                                    style={{ overflow: 'hidden' }}
                                />
                            </div>
                        ) : (
                            <div style={{ whiteSpace: 'pre-wrap' }}>
                                {post.content}
                            </div>
                        )}
                    </MDBCardText>
                    {postEditMode && (
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            <MDBBtn color="secondary" onClick={onClickPostEditCloseButton}>
                                {t("close")}
                            </MDBBtn>
                            <MDBBtn color="primary" onClick={onClickPostSaveButton} disabled={apiProgress}>
                                {apiProgress ? t("saving") : t("save")}
                            </MDBBtn>
                        </div>
                    )}
                </MDBCardBody>
                {!postEditMode && editingCommentId === null && ( 
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
                        <input
                            type="text"
                            placeholder={t("writeSomething")}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="form-control"
                            style={{
                                flex: 1,
                                backgroundColor: '#f6f6f6',
                                border: '1px solid #000000',
                                borderTopLeftRadius: '4px',
                                borderBottomLeftRadius: '4px',
                                borderTopRightRadius: '0px',
                                borderBottomRightRadius: '0px',
                            }}
                        />
                        <MDBBtn 
                            color="primary" 
                            onClick={onClickAddNewCommentButton} 
                            disabled={apiProgress}
                            style={{
                                borderTopRightRadius: '4px',
                                borderBottomRightRadius: '4px',
                                borderTopLeftRadius: '0px',
                                borderBottomLeftRadius: '0px',
                            }}>
                            <FontAwesomeIcon icon={faArrowUp} />
                        </MDBBtn>
                    </div>
                )}
                {!postEditMode && ( 
                    <MDBListGroup flush>
                        {(post.commentList || []).map(comment => (
                            <MDBListGroupItem key={comment.id} 
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                backgroundColor: '#f6f6f6',
                                                ...(editingCommentId !== comment.id && { justifyContent: 'space-between' })
                                            }}>
                                {editingCommentId === comment.id ? (
                                    <div style={{ flex: 1 }}>
                                        {editingCommentId === comment.id ? (
                                            <div>
                                                <input
                                                    type="text"
                                                    defaultValue={comment.content}
                                                    onChange={(e) => setEditedContent(e.target.value)}
                                                    className={"form-control"}
                                                    style={{
                                                        borderTopRightRadius: '0px',
                                                        borderBottomRightRadius: '0px',
                                                        borderTopLeftRadius: '4px',
                                                        borderBottomLeftRadius: '4px',
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <div style={{ whiteSpace: 'pre-wrap' }}>
                                                {comment.content}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div style={{ whiteSpace: 'pre-wrap' }}>
                                        {comment.content}
                                    </div>
                                )}
                                {authState.id === comment.userId && (
                                    <div>
                                        {editingCommentId === comment.id ? (
                                            <div>
                                                <MDBBtn 
                                                    color="primary" 
                                                    onClick={() => onClickCommentSaveButton(comment.id)}
                                                    disabled={apiProgress}
                                                    style={{
                                                        borderTopRightRadius: '0px',
                                                        borderBottomRightRadius: '0px',
                                                        borderTopLeftRadius: '0px',
                                                        borderBottomLeftRadius: '0px',
                                                    }}>
                                                    <FontAwesomeIcon icon={faArrowUp} />
                                                </MDBBtn>
                                                <MDBBtn 
                                                    color="danger" 
                                                    onClick={() => setEditingCommentId(null)}
                                                    disabled={apiProgress}
                                                    style={{
                                                        borderTopRightRadius: '4px',
                                                        borderBottomRightRadius: '4px',
                                                        borderTopLeftRadius: '0px',
                                                        borderBottomLeftRadius: '0px',
                                                    }}>
                                                    <FontAwesomeIcon icon={faXmark} />
                                                </MDBBtn>
                                            </div>
                                        ) : "" }
                                        {editingCommentId === null && (
                                            <div>
                                                <button type="button" className="btn btn-sm btn-outline-primary rounded-circle" style={{ marginRight: '10px' }} onClick={() => handleEditButtonClick(comment.id, comment.content)}>
                                                    <FontAwesomeIcon icon={faPen} />
                                                </button>
                                                <button type="button" onClick={() => onClickDeleteCommentButton(comment.id)} className="btn btn-sm btn-outline-danger rounded-circle">
                                                    <FontAwesomeIcon icon={faTrashCan} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {authState.id !== comment.userId && authState.id === post.userId && editingCommentId === null && (
                                    <div>
                                        <button type="button" onClick={() => onClickDeleteCommentButton(comment.id)} className="btn btn-sm btn-outline-danger rounded-circle">
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </button>
                                    </div>
                                )}
                            </MDBListGroupItem>
                        ))}
                    </MDBListGroup>
                )}
            </MDBCard>)}
            {deletePostMode && (
                <MDBContainer>
                    <MDBModal isOpen={deletePostMode} toggle={onClickDeletePostModal} side position="bottom-right">
                        <MDBModalBody>
                            {!deletePostSuccessMessage ? 
                                <span className="text-danger">{t("warning")}: {t("postDeleteWarning")} </span> : ""
                            }
                            {generalError &&
                                <Alert styleType="danger" center>{generalError}</Alert>
                            }
                        </MDBModalBody>
                        {!deletePostSuccessMessage &&
                            <MDBModalFooter>
                                <MDBBtn color="secondary" onClick={onClickDeletePostModal}>{t("close")}</MDBBtn>
                                <MDBBtn color="danger" onClick={onClickDeletePostButton}>{t("delete")}</MDBBtn>
                            </MDBModalFooter>
                        }
                    </MDBModal>
                </MDBContainer>
            )}
        </>;
}
