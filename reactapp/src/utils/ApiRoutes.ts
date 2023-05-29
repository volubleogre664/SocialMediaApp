// eslint-disable-next-line import/no-anonymous-default-export
const baseUrl = "https://localhost:7285";

type ApiRoutes = {
    [key: string]: string;
};

const URLS: ApiRoutes = {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    FINALIZE_REGISTER: "/api/user/post",
};

// Apply proxy to add baseUrl to all endpoints
const API_ENDPOINTS = new Proxy(URLS, {
    get: function (target, property: string) {
        return baseUrl + target[property];
    },
});

export default API_ENDPOINTS;
