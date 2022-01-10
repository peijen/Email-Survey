const createProxyMiddleware = require('http-proxy-middleware').createProxyMiddleware;
module.exports = function(app) {
    app.use(
        ["/api", "/auth/google"],
        createProxyMiddleware({
            target: "http://localhost:5000"
        })
    );
};