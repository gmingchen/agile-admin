import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router', 'pinia'],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    process.env.NODE_ENV === 'production' && visualizer({
      open: true,
      filename: 'dist/stats.html'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: './',
  server: {
    port: 9585,
    open: true,
    proxy: {
      '^/slipper/websocket': {
        target: 'https://admin.gumingchen.icu',
        // target: 'http://localhost:8806',
        changeOrigin: true,
        ws: true
      },
      '^/slipper': {
        target: 'https://admin.gumingchen.icu',
        // target: 'http://localhost:8806',
        changeOrigin: true,
      },
    },
  },
  build: {
    minify: 'terser',
    target: ['es2015', 'edge88', 'firefox78', 'chrome87'],
    modulePreload: {
      polyfill: true
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      }
    },
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          element: ["element-plus", "@element-plus/icons-vue"],
          echarts: ['echarts'] // 单独打包大型库
        }
      }
    }
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', 'echarts']
  }
})
