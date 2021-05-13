/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-03-11 20:11:47
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-13 23:36:18
 */
import { createI18n } from 'vue-i18n'
import messages from './langs'
import { store } from '@/store'

const i18n = createI18n({
  locale: store.getters['setting/language'], // 初始语言设置
  fallbackLocale: 'cn',
  messages
})

export default i18n
