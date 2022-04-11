import { createStore } from 'vuex'

const requireModules = require.context('./modules/', true, /index\.(ts|js)$/iu)

const modules = {}

requireModules.keys().forEach(filePath => {
  const modular = requireModules(filePath)
  const name = filePath.replace(/\.\/|\/index.(js|ts)/g, '')
  modules[name] = {
    namespaced: true,
    ...modular.default
  }
})

const store = createStore({
  modules: {
    ...modules
  }
})

export default store
