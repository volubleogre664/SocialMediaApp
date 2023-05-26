// eslint-disable-next-line import/no-anonymous-default-export
const baseUrl = "https://localhost:7285";

type ApiRoutes = {
    [key: string]: string;
};

const URLS: ApiRoutes = {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
};

// Apply proxy to add baseUrl to all endpoints
const API_ENDPOINTS = new Proxy(URLS, {
    get: function (target, property) {
        return baseUrl + target[property as keyof ApiRoutes];
    },
});

export default API_ENDPOINTS;
