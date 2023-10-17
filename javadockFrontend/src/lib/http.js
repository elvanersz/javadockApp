import axios from "axios";
import i18n from "i18next";
import {loadToken, storeToken} from "@/shared/state/storage.js";

const http = axios.create();

let authToken = loadToken();
export function setToken(token){
    authToken = token;
    storeToken(token);
}

http.interceptors.request.use((config) => {
    config.headers["Accept-Language"] = i18n.language
    if (authToken){
        config.headers["Authorization"] = `${authToken.prefix} ${authToken.token}`
    }
    return config;
})

export default http;