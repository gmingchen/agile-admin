/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-19 17:14:56
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-06 16:01:49
 */
import { getCurrentInstance } from 'vue'

export default function () {
  const { appContext } = getCurrentInstance()
  const { $message, $confirm, $loading } = appContext.config.globalProperties

  return {
    $message,
    $confirm,
    $loading
  }
}
