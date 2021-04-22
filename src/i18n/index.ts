/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-03-11 20:11:47
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-03-11 20:12:59
 */
import { createI18n } from 'vue-i18n'
import ElementLocale from 'element-plus/lib/locale'
import messages from './langs'
import store from '@/store'

const i18n = createI18n({
  locale: store.getters['common/language'], // 初始语言设置
  fallbackLocale: 'cn',
  messages
})

ElementLocale.i18n(i18n.global.t)

export default i18n
