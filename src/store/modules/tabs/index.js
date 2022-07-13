/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-02 18:59:43
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-18 09:16:20
 */
import router from '@/router'

// todo: ITab value 格式：{a}-{b}-{c}-{d}
// todo: a: 路由name b: 菜单ID c: 路由query字符串 d: 路由params字符串
// todo: c、d 支持多开的时候需要
const defaultTabs = [{
  value: 'home-home-{}-{}',
  label_cn: '首页',
  label_en: 'Home',
  name: 'home',
  path: '/home',
  query: {}, // 路由参数
  params: {}, // 路由参数
  closable: false, // true：可以关闭
  menuId: 'home'
}]

export default {
  state: {
    active: '',
    tabs: []
  },
  getters: {
  },
  mutations: {
    SET_ACTIVE: (state, active) => {
      state.active = active
    },
    SET_TABS: (state, tabs) => {
      state.tabs = tabs
    },
    ADD_TABS: (state, tab) => {
      state.tabs.push(tab)
    }
  },
  actions: {
    /**
     * 设置当前选中
     * @param {*} param0
     * @param {*} active
     * @returns
     */
    setActive({ commit }, active) {
      commit('SET_ACTIVE', active)
    },
    /**
     * 路由变化事件 设置当前选中、添加标签
     * @param {*} param0
     * @param {*} route
     */
    changeHandle({ commit, state }, route) {
      const meta = route.meta
      let val = `${ route.name }-${ meta.id }`
      if (meta.tab) {
        if (meta.multiple) {
          const queryStr = JSON.stringify(route.query)
          const paramsStr = JSON.stringify(route.params)
          val += `-${ queryStr }-${ paramsStr }`
        } else {
          val += `-{}-{}`
        }
        // 如果不存在则添加
        if (state.tabs.every(item => item.value !== val)) {
          const tab = {
            value: val,
            menuId: meta.id,
            title_cn: meta.title_cn,
            title_en: meta.title_en,
            name: route.name,
            path: route.path,
            query: route.query,
            params: route.params
          }
          commit('ADD_TABS', tab)
        }
      }
      commit('SET_ACTIVE', val)
    },
    /**
     * 删除tabs
     * @param {*} param0
     * @param {*} values
     */
    removeHandle({ commit, state }, values) {
      // 过滤出不用删除的标签页
      let tabs = state.tabs.filter(item => {
        return values.indexOf(item.value) === -1
      })
      // 至少保留一个标签页
      if (tabs.length === 0) {
        tabs = [state.tabs[0]]
      }
      // 若删除的包含当前页则跳转其他页
      if (tabs.every(item => item.value !== state.active)) {
        const tab = tabs[tabs.length - 1]
        router.push({
          name: tab.name,
          query: tab.query,
          params: tab.params
        })
      }
      // 设置当前未删除的标签页
      commit('SET_TABS', JSON.parse(JSON.stringify(tabs)))
    },
    /**
     * 清除标签页
     * @param {*}
     */
    clear({ commit }) {
      commit('SET_ACTIVE', '')
      commit('SET_TABS', [])
    }
  }
}
