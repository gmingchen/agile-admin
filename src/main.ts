/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-29 17:23:32
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-30 10:55:21
 */
import { createApp } from 'vue'
import App from '@/App.vue'
import Router from '@/router'
import Store from '@/store'
import Element from '@/element'
import I18n from '@/i18n'
import Components from '@/components/index'
import Directive from '@/directive'
import '@/assets/icon' // svg 图标引入
import '@/assets/sass/index.scss'

const app = createApp(App)

app.use(Store)
  .use(Router)
  .use(Element)
  .use(I18n)
  .use(Components)
  .use(Directive)
  .mount('#app')
