// it should be JS file only.
const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:2100',
            changeOrigin: true
        })
    );
}