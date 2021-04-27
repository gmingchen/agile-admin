/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-06 13:58:51
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-27 09:34:50
 */
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import Element from '@/element'
import I18n from '@/i18n'
import Components from '@/components/index'
import Directive from '@/directive'
import '@/assets/icon' // svg 图标引入
import '@/assets/sass/index.scss'

const app = createApp(App)

app.use(store)
  .use(router)
  .use(Element)
  .use(I18n)
  .use(Components)
  .use(Directive)
  .mount('#app')
