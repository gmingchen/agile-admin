import { createStore, ModuleTree } from 'vuex'

const path = require('path')
const requireModules = require.context('./modules', true, /index\.(ts|js)$/iu)
const modules: ModuleTree<{test: string}> = {}
requireModules.keys().forEach((filePath: string): void => {
  const modular = requireModules(filePath)
  let name = path.resolve(filePath, '..')
  name = name.split('/').pop()
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
