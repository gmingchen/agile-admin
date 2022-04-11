export default {
  install: function (app) {
    const globalComponents = require.context('./', true, /index\.(vue|js)$/iu)
    globalComponents.keys().forEach(filePath => {
      if (filePath === './index.js') return
      const component = globalComponents(filePath)
      let name = filePath.replace(/\.\/|\/index.vue/g, '')
      name = name.slice(0, 1).toUpperCase() + name.slice(1)
      app.component(`G${ name }`, component.default || component)
    })
  }
}
