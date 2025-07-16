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
          '^/api': '',
        },
      })
    );
  };
}
