import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const aliasPath = (path) => {
  return fileURLToPath(new URL(path, import.meta.url))
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    plugins: [
      vue(),
      vueJsx(),
      VueDevTools(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: ['vue', 'vue-router', 'pinia'],
        dirs: ['src/stores/*'],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true
        }
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    // 项目根目录（index.html 文件所在的位置）。可以是一个绝对路径，或者一个相对于该配置文件本身的相对路径。
    root: process.cwd(),
    // 公共基础路径。
    base: './',
    // 作为静态资源服务的文件夹。
    publicDir: 'public',
    // 存储缓存文件的目录。
    cacheDir: 'node_modules/.vite',
    resolve: {
      // 路径别名
      alias: {
        '@': aliasPath('./src'),
        '@utils': aliasPath('./src/common/utils'),
        '@enums': aliasPath('./src/common/enums'),
        '@constants': aliasPath('./src/common/constants'),
        '@stores': aliasPath('./src/stores/modules'),
      }
    },
    css: {
      // 在开发过程中是否启用 sourcemap。
      devSourcemap: true
    },
    // 控制台输出的级别。
    logLevel: 'info',
    // 避免 Vite 清屏而错过在终端中打印某些关键信息。
    clearScreen: true,
    // 以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中。
    envPrefix: 'VITE_',
    // 开发服务器选项
    server: {
      // 指定服务器应该监听哪个 IP 地址。
      host: true,
      // 服务器端口。
      port: env.VITE_PORT,
      // 若端口已被占用则会直接退出
      strictPort: true,
      // 自动打开浏览器。
      open: false,
      // 代理。
      proxy: {
        '^/slipper/websocket': {
          target: 'https://api.admin.gumingchen.icu',
          changeOrigin: true,
          ws: true
        },
        '^/slipper': {
          target: 'https://api.admin.gumingchen.icu',
          changeOrigin: true,
        },
      },
      // 为开发服务器配置 CORS。
      cors: true
    },
    // 构建选项
    build: {
      // 设置最终构建的浏览器兼容目标。
      target: 'modules',
      // 决定是否自动注入 module preload 的 polyfill。
      polyfillModulePreload: true,
      // 指定输出路径（相对于 项目根目录).
      outDir: 'dist',
      // 指定生成静态资源的存放路径（相对于 build.outDir）。
      assetsDir: 'assets',
      // 小于此阈值的导入或引用资源将内联为 base64 编码
      assetsInlineLimit: 'assets',
      // 启用/禁用 CSS 代码拆分。
      cssCodeSplit: true,
      // 构建后是否生成 source map 文件。 boolean | 'inline' | 'hidden'
      sourcemap: false,
      // chunk 大小警告的限制（以 kbs 为单位）。
      chunkSizeWarningLimit: 500
    }
  }
})
