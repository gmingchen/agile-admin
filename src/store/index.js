import { createStore } from 'vuex'
import { ElLoading } from 'element-plus'

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
  },
  actions: {
    /**
     * 清除数据 用户信息 菜单 权限
     * @param {*}
     */
    clearData({ dispatch }) {
      dispatch('administrator/clearAdministrator')
      dispatch('menu/clear')
    },
    /**
     * 清除缓存
     * @returns
     */
    clear({ dispatch }) {
      ElLoading.service({
        lock: true,
        text: '清理缓存...',
        background: 'rgba(0, 0, 0, 0.3)'
      })
      dispatch('clearData')
      window.location.reload()
    },
    /**
     * 退出登录清除 用户信息 菜单 权限 登录凭证
     * @param {*} param0
     */
    logout({ dispatch }) {
      dispatch('clearData')
      dispatch('administrator/clearToken')
    }
  }
})

export default store
