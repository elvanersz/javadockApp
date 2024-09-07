import http from "@/lib/http.js";
import {useCallback, useEffect, useState} from "react";
import {Spinner} from "@/shared/Components/Spinner.jsx";
import {useTranslation} from "react-i18next";

export function Home(){
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
}