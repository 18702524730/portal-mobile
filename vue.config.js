const path = require('path')
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

function resolve(dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  /*
    Vue-cli3:
    Crashed when using Webpack `import()` #2463
    https://github.com/vuejs/vue-cli/issues/2463
   */
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,


  // 打包app时放开该配置
  // publicPath:'./',
  configureWebpack: config => {
    // 生产环境取消 console.log
    if (process.env.NODE_ENV === 'production') {

      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      const plugins = [
        // 配置compression-webpack-plugin压缩
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          // deleteOriginalAssets:true,
          minRatio: 0.8
        })
      ]

      config.plugins = [...config.plugins, ...plugins]
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))
      .set('@mobile', resolve('src/modules/mobile'))
      .set('@config', resolve('src/config'))
      .set('@utils', resolve('src/utils'))
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */

          /*
          'primary-color': '#F5222D',
          'link-color': '#F5222D',
          'border-radius-base': '4px',
          */
        },
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    port: 3001,
    hot: true,
    proxy: {
      '/jeecg-boot': {
        // target: 'http://119.3.27.145:8082',
        target: 'http://122.112.165.166:8079',
        ws: false,
        changeOrigin: true
      },
      '/xipop': {
				target: 'https://testxipop.ipsebe.com',
				// target: 'http://xm.xmipop.com',
				// target      : 'http://119.3.27.145:8084',
				// target      : 'http://112.48.134.160:8092',
				changeOrigin: true,
				pathRewrite: {
					// '^/xipop': '',
					'^/xipop': '/xipop'
				}
			}
    }
  },

  lintOnSave: undefined
}