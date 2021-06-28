/*
 * @Description: 组件全局注册
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-21 15:30:44
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-29 18:20:03
 */
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const path = require('path')

export default {
  install: function (app) {
    const globalComponents = require.context('./', true, /index\.(vue|js)$/iu)
    globalComponents.keys().forEach(filePath => {
      const component = globalComponents(filePath)
      let name = path.resolve(filePath, '..')
      name = upperFirst(
        camelCase(
          name
            .split('/')
            .pop()
            .replace(/\.\w+$/u, '')
        )
      )
      app.component(name, component.default || component)
    })
  }
}
