import http from "@/lib/http.js";
import {Spinner} from "@/shared/Components/Spinner.jsx";
import {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import { PostListItem } from "../../shared/Components/PostListItem";

export function PostList() {
    const [apiProgress, setApiProgress] = useState(false);
    const {t} = useTranslation();
    const [postPage, setPostPage] = useState({
        content: [],
        last: false,
        totalPages: 0,
        first: false,
        number: 0
    });
    
    function loadPostList(page = 0) {
        return http.get("/api/v1/posts", {params: {page, size: 10}})
    }

    const getPosts = useCallback(async (page) => {
        setApiProgress(true)
        try {
            const response = await loadPostList(page)
            setPostPage(response.data)
        } catch(error) {
            console.log(error)
        } finally {
            setApiProgress(false)
        }
    }, [])

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            <div className="card">
                <ul className="list-group list-group-flush">
                    {postPage.content.map(post => {
                        return <PostListItem key={post.id} post={post}/>
                    })}
                </ul>
                <div className="card-footer text-center">
                    {apiProgress && <Spinner/>}
                    {!apiProgress && !postPage.first &&
                        <button
                            className="btn btn-secondary btn-sm float-start mt-2"
                            onClick={() => getPosts(postPage.number - 1)}>
                            {t("previous")}
                        </button>}
                    {!apiProgress && !postPage.last &&
                        <button
                            className="btn btn-secondary btn-sm float-end mt-2"
                            onClick={() => getPosts(postPage.number + 1)}>
                            {t("next")}
                        </button>}
                </div>
            </div>
        </>
    )
}


