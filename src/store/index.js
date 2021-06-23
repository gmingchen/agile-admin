/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-29 17:23:32
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-30 17:47:52
 */
import { createStore } from 'vuex'

const path = require('path')
const requireModules = require.context('./modules', true, /index\.(ts|js)$/iu)

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
  modules: {
    ...modules
  }
})

export default store
