export default {
  install: function (app) {
    const globalComponents = import.meta.globEager('./**/index.(js|vue)')
    for (const key in globalComponents) {
      if (key === './index.js') return
      const component = globalComponents[key]
      let name = key.replace(/\.\/|\/index.vue/g, '')
      name = name.slice(0, 1).toUpperCase() + name.slice(1)
      app.component(`${ name }`, component.default || component)
    }
  }
}
