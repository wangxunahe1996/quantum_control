const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars:{
            'border-radius-base': '0px'
          },
          javascriptEnabled: true
        }
      }
    }
  },
  publicPath: "/",
  lintOnSave: false,
  // outputDir:'wap',
  devServer: {
    proxy: {
      "/service": {
        target: "http://anning.zheos.org/service",
        changeOrigin: true,
        pathRewrite: {
          //重写路径
          "^/service": ""
        }
      },
      
      
    }
  },
  configureWebpack: config => {
    return {
      plugins: [
        new CompressionPlugin({
          test: /\.js$|\.html$|\.css/,
          threshold: 1024,
          deleteOriginalAssets: false
        })
      ]
    };
  }
};
