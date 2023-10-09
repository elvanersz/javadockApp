import http from "@/lib/http.js";
import {useCallback, useEffect, useState} from "react";
import {Spinner} from "@/shared/components/Spinner.jsx";
import {UserLıstItem} from "@/shared/components/UserListItem.jsx";
import {useTranslation} from "react-i18next";

export function Users() {
    const [apiProgress, setApiProgress] = useState(false)
    const {t} = useTranslation();
    const [userPage, setUserPage] = useState({
        content: [],
        last: false,
        totalPages: 0,
        first: false,
        number: 0
    })

    function loadUsers(page = 0) {
        return http.get("/api/v1/users", {params: {page, size: 10}})
    }

    const getUsers = useCallback(async (page) => {
        setApiProgress(true)
        try {
            const response = await loadUsers(page)
            setUserPage(response.data)
        } catch {

        } finally {
            setApiProgress(false)
        }
    }, [])

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <div className="card">
                <div className="card-header text-center fs-4">{t("userList")}</div>
                <ul className="list-group list-group-flush">
                    {userPage.content.map(user => {
                        return <UserLıstItem key={user.username} user={user}/>
                    })}
                </ul>
                <div className="card-footer text-center">
                    {apiProgress && <Spinner/>}
                    {!apiProgress && !userPage.first &&
                        <button
                            className="btn btn-outline-secondary btn-sm float-start"
                            onClick={() => getUsers(userPage.number - 1)}>
                            {t("previous")}
                        </button>}
                    {!apiProgress && !userPage.last &&
                        <button
                            className="btn btn-outline-secondary btn-sm float-end"
                            onClick={() => getUsers(userPage.number + 1)}>
                            {t("next")}
                        </button>}
                </div>
            </div>
        </>
    )
}