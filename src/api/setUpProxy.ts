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
        logLevel: 'error',
        onProxyReq(proxyReq, req, res) {
          if (req.headers.cookie) {
            console.log(111111111111111,req.headers.cookie)
            proxyReq.setHeader('Cookie', req.headers.cookie);
          } else {
            console.log('No cookies found in the request');
          }
        }
      })
    );
  };
}
