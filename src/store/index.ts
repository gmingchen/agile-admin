/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-15 08:45:46
 * @LastEditors: gumingchen
 * @LastEditTime: 2020-12-29 17:30:32
 */
import { createStore } from 'vuex'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
const requireModules = require.context('./modules', true, /index\.(ts|js)$/i)
const modules = {}
requireModules.keys().forEach(filePath => {
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
