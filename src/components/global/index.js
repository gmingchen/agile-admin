export default {
  install: function (app) {
    const globalComponents = import.meta.glob('./**/index.(js|vue)', { eager: true })
    for (const key in globalComponents) {
      if (key === './index.js') return
      const component = globalComponents[key]
      let name = key.replace(/\.\/|\/index.vue/g, '')
      name = name.slice(0, 1).toUpperCase() + name.slice(1)
      app.component(`${ name }`, component.default || component)
    }
  }
}
