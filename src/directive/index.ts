/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-27 09:26:25
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-07 13:20:27
 */
import { isAuth } from '@/utils'
import { createApp } from 'vue'

export default {
  install: function (app: ReturnType<typeof createApp>): void {
    app.directive('permission', {
      mounted: (el, binding): void => {
        console.log(el, binding)
        const permission = binding.value
        const result = isAuth(permission)
        if (!result) {
          el.remove()
        }
      }
    })
  }
}
