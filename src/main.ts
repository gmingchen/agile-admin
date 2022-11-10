import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@/assets/sass/index.scss' // 全局样式

const app = createApp(App)

app.use(createPinia())
  .use(router)
  .mount('#app')
