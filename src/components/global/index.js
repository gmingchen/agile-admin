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
      app.component(`G${ name }`, component.default || component)
    })
  }
}
