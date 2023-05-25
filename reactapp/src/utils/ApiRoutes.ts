// eslint-disable-next-line import/no-anonymous-default-export
type ApiRoutes = {
    [key: string]: string;
};

export default {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
} as ApiRoutes;
