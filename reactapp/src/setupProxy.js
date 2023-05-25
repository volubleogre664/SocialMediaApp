const { createProxyMiddleware } = require("http-proxy-middleware");

const context = [
    "/api/auth/register",
    "/api/auth/login",
    "/api/auth/logout",
    "/api/chats",
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: "https://localhost:7285",
        secure: false,
    });

    app.use(appProxy);
};
