/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-27 09:26:25
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-27 09:34:06
 */
import { $isAuth } from '@/utils'
import { IApp } from '@/utils/index.type'

export default {
  install: function (app: IApp): void {
    app.directive('permission', (el, binding): void => {
      const permission = binding.value
      const result = $isAuth(permission)
      if (!result) {
        el.remove()
      }
    })
  }
}
