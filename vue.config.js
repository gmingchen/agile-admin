/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-01-18 11:07:38
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-26 10:46:35
 */
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const port = process.env.VUE_APP_PORT || 95830 // dev port

const proxy = {
  '/proxy': {
    target: 'http://localhost:8080',
    secure: true,
    changeOrigin: true,
    pathRewrite: {
      '^/proxy': '/'
    }
  }
}

module.exports = {
  publicPath: './', // 部署应用时的基本URL.
  outputDir: 'dist', // build时构建文件的目录,构建时传入 --no-clean 可关闭该行为.
  assetsDir: 'static', // build时放置生成的静态资源(js、css、img、fonts)的(相对于 outputDir 的)目录.
  indexPath: 'index.html', // 指定生成的index.html的输出路径(相对于 outputDir),也可以是一个绝对路径.
  filenameHashing: true, // 默认在生成的静态资源文件名中包含hash以控制缓存.
  lintOnSave: process.env.NODE_ENV !== 'production', // 是否在开发环境下通过eslint-loader在每次保存时lint代码(在生产构建时禁用 eslint-loader).
  runtimeCompiler: false, // 是否使用包含运行时编译器的Vue构建版本.
  transpileDependencies: [], // Babel显式转译列表.
  productionSourceMap: process.env.NODE_ENV !== 'production', // 如果你不需要生产环境的source map,可以将其设置为 false 以加速生产环境构建.
  crossorigin: '', // 设置生成的HTML中<link rel="stylesheet">和<script>标签的crossorigin属性(注:仅影响构建时注入的标签).
  integrity: false, // 在生成的HTML中的<link rel="stylesheet">和<script>标签上启用Subresource Integrity(SRI).
  devServer: {
    // 所有webpack-dev-server的选项都支持.
    proxy: process.env.NODE_ENV.VUE_APP_PROXY === 'false' ? null : proxy,
    port: port // 端口
  },
  css: {
    // requireModuleExtension: false,                                                  // 当为true时,css文件名可省略module默认为false.
    extract: false, // 默认生产环境下是true,开发环境下是false.
    sourceMap: false // 是否为CSS开启source map.设置为true之后可能会影响构建的性能.
    // loaderOptions: {                                                                // 向CSS相关的loader传递选项(支持:css-loader postcss-loader sass-loader less-loader stylus-loader).
    //   sass: {
    //     prependData: `@import '~@/assets/@/assets/sass/index.scss';` // 引入全局scss全局样式
    //   }
    // }
  },
  // 如果这个值是一个对象,则会通过 webpack-merge 合并到最终的配置中.
  // 如果你需要基于环境有条件地配置行为,或者想要直接修改配置,那就换成一个函数(该函数会在环境变量被设置之后懒执行).该方法的第一个参数会收到已经解析好的配置.在函数内,你可以直接修改配置,或者返回一个将会被合并的对象.
  configureWebpack: config => {
    config.externals = {
      L2Dwidget: 'L2Dwidget'
    }
    if (process.env.NODE_ENV === 'production') {
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      // config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = [
      //   'console.log'
      // ]
    }
    config.performance = {
      // hints: 'warning',                                                              // 警告 webpack 的性能提示
      // maxEntrypointSize: 50000000,                                                   // 入口起点的最大体积
      // maxAssetSize: 30000000,                                                        // 生成文件的最大体积
    }
  },
  // 对内部的webpack配置(比如修改、增加Loader选项)(链式操作).
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      const analyzer = new BundleAnalyzerPlugin({
        analyzerPort: 9999
      })
      config.plugin('webpack-bundle-analyzer').use(analyzer)
    }
    config.resolve.alias
      .set('@', resolve('src'))
    config.module.rules.delete('svg')
    config.module
      .rule('svg-smart')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: '[name]'
      })
  }
}
