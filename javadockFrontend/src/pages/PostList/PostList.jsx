import { useAuthState } from "@/shared/State/context.jsx";
import { Spinner } from "@/shared/Components/Spinner.jsx";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { PostListItem } from "../../shared/Components/PostListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { MDBBtn } from "mdb-react-ui-kit";
import http from "@/lib/http.js";
import { AddNewPostModal } from "@/shared/Components/AddNewPostModal.jsx";

export function PostList() {
    const authState = useAuthState();
    const [apiProgress, setApiProgress] = useState(false);
    const { t } = useTranslation();
    const [addNewPostMode, setAddNewPostMode] = useState(false);
    const [addNewPostSuccessMessage, setAddNewPostSuccessMessage] = useState(null);
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState(null);
    const [postHeader, setPostHeader] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postPage, setPostPage] = useState({
        content: [],
        last: false,
        totalPages: 0,
        first: false,
        number: 0
    });

    function loadPostList(page = 0) {
        return http.get("/api/v1/posts", { params: { page, size: 10 } });
    }

    const getPosts = useCallback(async (page) => {
        setApiProgress(true);
        try {
            const response = await loadPostList(page);
            setPostPage(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setApiProgress(false);
        }
    }, []);

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
        getPosts();
    }, []);

    useEffect(() => {
        setErrors((lastErrors) => ({
            ...lastErrors,
            postHeader: undefined,
        }));
    }, [postHeader]);

    useEffect(() => {
        setErrors((lastErrors) => ({
            ...lastErrors,
            postContent: undefined,
        }));
    }, [postContent]);

    return (
        <>
            <MDBBtn outline color="info" style={{ marginBottom: "20px", width: "180px", height: "40px" }} onClick={onClickAddNewPostModal}>
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: "10px" }} />
                {t("addNewPost")}
            </MDBBtn>
            <ul className="list-group list-group-flush">
                {postPage.content.map((post) => (
                    <PostListItem key={post.id} post={post} />
                ))}
            </ul>
            <div className="text-center">
                {apiProgress && <Spinner />}
                {!apiProgress && !postPage.first && (
                    <button className="btn btn-secondary btn-sm float-start mt-2" onClick={() => getPosts(postPage.number - 1)}>
                        {t("previous")}
                    </button>
                )}
                {!apiProgress && !postPage.last && (
                    <button className="btn btn-secondary btn-sm float-end mt-2" onClick={() => getPosts(postPage.number + 1)}>
                        {t("next")}
                    </button>
                )}
            </div>

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
        </>
    );
}
