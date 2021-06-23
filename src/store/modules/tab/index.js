/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-02 18:59:43
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-08 17:05:24
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
    active: 'home-home-{}-{}',
    tabs: JSON.parse(JSON.stringify(defaultTabs))
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
    ADD_TAB: (state, tab) => {
      state.tabs.push(tab)
    }
  },
  actions: {
    setActive({ commit }, active) {
      commit('SET_ACTIVE', active)
    },
    changeHandle({ commit, state }, route) {
      const meta = route.meta
      if (meta.isTab) {
        const queryStr = JSON.stringify(route.query)
        const paramsStr = JSON.stringify(route.params)
        let val = `${ route.name }-${ meta.id }`
        val += `-${ queryStr }-${ paramsStr }`

        const tab = {
          value: val,
          label_cn: meta.title_cn,
          label_en: meta.title_en,
          name: route.name,
          path: route.path,
          query: route.query,
          params: route.params,
          closable: true,
          menuId: meta.id
        }
        const exist = state.tabs.filter(item => {
          return item.value === val
        })
        if (exist.length === 0) {
          commit('ADD_TAB', tab)
        }
        commit('SET_ACTIVE', val)
      }
    },
    removeHandle({ commit, state }, values) {
      let tabs = state.tabs.filter(item => {
        return values.indexOf(item.value) === -1
      })
      const route = {
        name: 'home',
        query: {},
        params: {}
      }
      if (tabs.length !== 0) {
        const tab = tabs[tabs.length - 1]
        route.name = tab.name
        route.query = tab.query
        route.params = tab.params
      } else {
        tabs = JSON.parse(JSON.stringify(defaultTabs))
      }
      commit('SET_TABS', tabs)
      // 判断删除的是否是当前路由
      let check = false
      tabs.forEach(tab => {
        const queryStr = JSON.stringify(tab.query)
        const paramsStr = JSON.stringify(tab.params)
        let val = `${ tab.name }-${ tab.menuId }`
        val += `-${ queryStr }-${ paramsStr }`
        if (val === state.active) {
          check = true
        }
      })
      if (!check) {
        router.push(route)
      }
    }
  }
}
