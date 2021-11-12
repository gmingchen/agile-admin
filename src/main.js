import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/sass/index.scss'
import * as ElIconModules from '@element-plus/icons'

const app = createApp(App)

// element 全局配置
app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 }
// 全局注册 element icon
for (const iconName in ElIconModules) {
  app.component(`${ iconName }`, ElIconModules[iconName])
}

app.use(router).use(store).mount('#app')
