export default {
  install: function (app) {
    const directives = import.meta.glob('./**/index.js', { eager: true })
    for (const key in directives) {
      if (key === './index.js') return
      const directive = directives[key]
      const name = key.replace(/\.\/|\/index.js/g, '')
      app.directive(name, directive.default || directive)
    }
  }
}
