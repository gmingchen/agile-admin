import { createStore } from 'vuex'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
const requireModules = require.context('./modules', true, /index\.(ts|js)$/i)
const modules = {}
requireModules.keys().forEach(filePath => {
  const modular = requireModules(filePath)
  let name = path.resolve(filePath, '..')
  name = name.split('/').pop()
  console.log('modular', modular)
  modules[name] = {
    namespaced: true,
    ...modular.default
  }
})

const store = createStore({
  state: {
    test: 'test'
  },
  modules: {
    ...modules
  }
})

export default store
