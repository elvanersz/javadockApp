import http from "@/lib/http.js";
import {useCallback, useEffect, useState} from "react";

export function Users(){
    const [userPage, setUserPage] = useState({
        content: [],
        last: false,
        totalPages: 0,
        first: false,
        number: 0
    })

    function loadUsers(page = 0){
        return http.get("/api/v1/users", { params: { page, size: 2 } })
    }

    const getUsers = useCallback(async (page) => {
        const response = await loadUsers(page)
        setUserPage(response.data)
    }, [])

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            {userPage.content.map(user => {
                return <div>{user.username}</div>
            })}
            {!userPage.first && <button onClick={() => getUsers(userPage.number - 1)}>Previous</button>}
            {!userPage.last && <button onClick={() => getUsers(userPage.number + 1)}>Next</button>}
        </>
    )
}