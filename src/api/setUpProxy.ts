import { createProxyMiddleware } from 'http-proxy-middleware';

export {};

export default function setupProxy() {
  return function(app: any) {
    app.use(
      '/api',
      createProxyMiddleware({
        target: process.env.REACT_APP_SERVER_API,
        changeOrigin: true,
        pathRewrite: {
          '^/api/': '/'
        },
        logLevel: 'debug',
        onProxyRes(proxyRes, req, res) {
          console.log("Proxy Response Headers:", proxyRes.headers);
        },
        onProxyReq(proxyReq, req, res) {
          console.log("Proxy Request:", req.headers);
          console.log(111, res.getHeader("access_token"))
          console.log(112, res.getHeader("refresh_token"))

          if (req.headers.cookie) {
            console.log('Cookies found:', req.headers.cookie);
            proxyReq.setHeader('Cookie', req.headers.cookie);
          } else {
            console.log('No cookies found in the request');
          }
        }
      })
    );
  };
}
