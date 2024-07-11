const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        ["/surveys/*"],
        createProxyMiddleware({
            target: "http://localhost:3000",
            changeOrigin: true
        })
    );
};