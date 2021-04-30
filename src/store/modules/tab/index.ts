/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-02 18:59:43
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-18 17:42:39
 */

import { ActionContext } from 'vuex'
import router from '@/router'
import { IObject } from 'Type/index'
import { RouteLocationNormalizedLoaded } from 'vue-router'

// todo: ITab value 格式：{a}-{b}-{c}-{d}
// todo: a: 路由name b: 菜单ID c: 路由query字符串 d: 路由params字符串
// todo: c、d 支持多开的时候需要

const defaultTabs = [{
  value: 'home-home',
  label_cn: '首页',
  label_en: 'Home',
  name: 'home',
  path: '/home',
  query: {}, // 路由参数
  params: {}, // 路由参数
  closable: false // true：可以关闭
}]

export interface Tab {
  value: string
  label_cn: string
  label_en: string
  name: string
  path: string
  query: IObject
  params: IObject
  closable: boolean
}

interface State {
  active: string
  tabs: Tab[]
}

export default {
  state: {
    active: 'home',
    tabs: JSON.parse(JSON.stringify(defaultTabs))
  },
  getters: {
  },
  mutations: {
    SET_ACTIVE: (state: State, active: string): void => {
      state.active = active
    },
    SET_TABS: (state: State, tabs: Tab[]): void => {
      state.tabs = tabs
    },
    ADD_TAB: (state: State, tab: Tab): void => {
      state.tabs.push(tab)
    }
  },
  actions: {
    setActive({ commit }: ActionContext<State, null>, active: string): void {
      commit('SET_ACTIVE', active)
    },
    changeHandle({ commit, state }: ActionContext<State, null>, route: RouteLocationNormalizedLoaded): void {
      const meta = route.meta
      if (meta.isTab) {
        const queryStr = JSON.stringify(route.query)
        const paramsStr = JSON.stringify(route.params)
        let val = `${ route.name as string }-${ meta.id }`
        if (meta.multiple) {
          val += `-${ queryStr }-${ paramsStr }`
        }
        const tab: Tab = {
          value: val,
          label_cn: meta.title_cn,
          label_en: meta.title_en,
          name: route.name as string,
          path: route.path,
          query: route.query,
          params: route.params,
          closable: true
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
    removeHandle({ commit, state }: ActionContext<State, null>, values: string[]): void {
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
      router.push(route)
    }
  }
}
