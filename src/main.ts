import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from './element'
import Components from './components/index'
import I18n from './i18n'
import '@/assets/icon' // svg 图标引入
import '@/assets/sass/index.scss'

const app = createApp(App)

app.use(store).use(router).use(Element).use(Components).use(I18n).mount('#app')
