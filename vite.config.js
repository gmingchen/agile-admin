import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

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
        changeOrigin: true,
        ws: true
      },
      '^/slipper': {
        target: 'https://admin.gumingchen.icu',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: ['es2015', 'edge88', 'firefox78', 'chrome87'],
    modulePreload: {
      polyfill: true
    }
  }
})
