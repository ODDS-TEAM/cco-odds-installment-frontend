module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://103.74.254.244:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/', // rewrite path
        },
      }
    }
  }
};