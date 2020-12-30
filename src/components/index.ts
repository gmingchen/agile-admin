/*
 * @Description: svg-icon 组件全局注册
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-21 15:30:44
 * @LastEditors: gumingchen
 * @LastEditTime: 2020-12-30 09:28:58
 */
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  install: function (app:any) {
    const globalComponents = require.context('./', true, /index\.(vue|js)$/i)
    globalComponents.keys().forEach(filePath => {
      const component = globalComponents(filePath)
      let name = path.resolve(filePath, '..')
      name = upperFirst(
        camelCase(
          name
            .split('/')
            .pop()
            .replace(/\.\w+$/, '')
        )
      )
      app.component(
        name,
        component.default || component
      )
    })
  }
}
