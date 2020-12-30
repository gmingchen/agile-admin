/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-15 08:45:46
 * @LastEditors: gumingchen
 * @LastEditTime: 2020-12-30 10:03:13
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from './element'
import Components from './components/index'
import '@/assets/icon' // svg 图标引入
import '@/assets/sass/index.scss'

const app = createApp(App)

app.use(store)
  .use(router)
  .use(Element)
  .use(Components)
  .mount('#app')

