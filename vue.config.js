const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

const port = process.env.VUE_APP_PORT || 95830 // dev port

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: '',
  indexPath: 'index.html',
  filenameHashing: true,
  lintOnSave: process.env.NODE_ENV !== 'production',
  runtimeCompiler: false,
  transpileDependencies: [],
  productionSourceMap: true,
  crossorigin: '',
  integrity: false,
  devServer: {
    proxy: process.env.NODE_ENV.VUE_APP_PROXY === 'false' ? null : {
      '/proxy': {
        target: 'http://localhost:8080',
        secure: true,
        changeOrigin: true,
        pathRewrite: {
          '^/proxy': '/'
        }
      }
    },
    port: port
  },
  configureWebpack: config => {
    config.externals = {
      'L2Dwidget': 'L2Dwidget'
    }
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@API', resolve('src/api'))
      .set('@AST', resolve('src/assets'))
      .set('@U', resolve('src/utils'))
    config.module.rules.delete('svg')
    config.module
      .rule('svg-smart')
      .test(/\.svg$/)
      .include
      .add(resolve('src/assets/icon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
  // css: {
  //   requireModuleExtension: false,
  //   extract: false,
  //   sourceMap: false,
  //   loaderOptions: {
  //     sass: {
  //       prependData: `@import 'src/assets/sass/index.scss';`
  //     }
  //   }
  // }
}
