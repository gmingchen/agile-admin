import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './stores'
import directive from './directive' // 自定义指令

import 'nprogress/nprogress.css'
import '@/assets/sass/index.scss'

const app = createApp(App)

app.use(pinia)
  .use(router)
  .use(directive)
  .mount('#app')
