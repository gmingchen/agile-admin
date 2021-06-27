/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-29 17:23:32
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-30 17:07:55
 */
import { createApp } from 'vue'
import App from '@/App.vue'
import Router from '@/router'
import Store from '@/store'
import Element from '@/element'
import Components from '@/components/global/index'
import Directive from '@/directive'
import '@/assets/icon' // svg 图标引入
import '@/assets/sass/index.scss'

const app = createApp(App)

app.use(Store)
  .use(Router)
  .use(Element)
  .use(Components)
  .use(Directive)
  .mount('#app')
