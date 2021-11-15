import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/sass/index.scss'
// import * as ElIconModules from '@element-plus/icons'
import Components from '@/components/global/index'
import '@/assets/icon' // svg 图标引入
import Directive from '@/directive'

const app = createApp(App)

// element 全局配置
app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 }
// 全局注册 element icon
// for (const iconName in ElIconModules) {
//   app.component(`${ iconName }`, ElIconModules[iconName])
// }

app.use(router).use(store).use(Components).use(Directive).mount('#app')
