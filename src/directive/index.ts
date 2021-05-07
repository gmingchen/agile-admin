/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-27 09:26:25
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-07 23:38:57
 */
import { createApp } from 'vue'
import { isAuth } from '@/utils'
import { ElSwitch } from 'element-plus'

export default {
  install: function (app: ReturnType<typeof createApp>): void {
    app.directive('permission', {
      mounted: (el, binding, vnode) => {
        const permission = binding.value
        const result = isAuth(permission)
        const tagName = el.localName
        if (!result) {
          switch (tagName) {
            case 'button':
              el.remove()
              break
            case 'div':
              el.className += ' is-disabled'
              // eslint-disable-next-line no-case-declarations
              const span = el.getElementsByTagName('span')[0]
              // eslint-disable-next-line no-case-declarations
              const spanChild = span.firstChild
              // eslint-disable-next-line no-case-declarations
              const a = el.cloneNode(true)
              a.getElementsByTagName('span')[0].style = span.style
              a.getElementsByTagName('span')[0].firstChild.style = spanChild.style
              console.log(span.style)
              console.log(spanChild.style)
              // eslint-disable-next-line no-case-declarations
              const parent = el.parentNode
              el.remove()
              console.log(a)
              parent.append(a)
              break
          }
        }
      }
    })
  }
}
