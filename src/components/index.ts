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
