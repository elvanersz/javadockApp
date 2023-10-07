import axios from "axios";
import i18n from "i18next";

const http = axios.create();

http.interceptors.request.use((config) => {
    config.headers["Accept-Language"] = i18n.language
    return config;
})

export default http;