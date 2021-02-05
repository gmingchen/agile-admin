/*
 * @Description: 用户信息
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-05 16:48:05
 */
import router from '@/router'
import { ITab, ITabDelParam, ITabs } from './index.type'
export default {
  namespaced: true,
  state: {
    tabsList: [
      {
        label: '首页', // 名称
        value: '0', // 主键
        name: 'home', // 路由名称
        path: '/home', // 路由地址
        query: {}, // 路由参数
        params: {}, // 路由参数
        closable: true // true：不可以关闭
      },
      {
        label: '例子', // 名称
        value: '1', // 主键
        name: 'example', // 路由名称
        path: '/example', // 路由地址
        query: {}, // 路由参数
        params: {} // 路由参数
      }
    ],
    tabsActive: '0'
  },
  getters: {
    tabsList: (state: ITabs): Array<ITab> => state.tabsList,
    tabsActive: (state: ITabs): string => state.tabsActive
  },
  mutations: {
    SET_TABS_LIST: (state: ITabs, tabsList: Array<ITab>): void => {
      state.tabsList = tabsList
    },
    SET_TABS_ACTIVE: (state: ITabs, tabsActive: string): void => {
      state.tabsActive = tabsActive
    },
    ADD_TAB: (state: ITabs, tab: ITab): void => {
      state.tabsList.push(tab)
    },
    DEL_TAB_BY_INDEX: (state: ITabs, index: number, number: number = 1): void => {
      state.tabsList.splice(index, number)
    }
  },
  actions: {
    setTabsActive({ commit }, tabsActive: string): void {
      commit('SET_TABS_ACTIVE', tabsActive)
    },
    clickTab({ state }): void {
      for (let i = 0; i < state.tabsList.length; i++) {
        const tab = state.tabsList[i]
        if (tab.value === state.tabsActive) {
          router.push({
            name: tab.name,
            query: tab.query,
            params: tab.params
          })
          break
        }
      }
    },
    addTab({ commit, state }, tab: ITab) {
      if (tab.multiple) {
        commit('ADD_TAB', tab)
      } else {
        const isExit: boolean =
          state.tabsList.filters((item: ITab) => {
            return item.value === tab.value
          }).length !== 0
        if (!isExit) {
          commit('ADD_TAB', tab)
        }
      }
      commit('SET_TABS_ACTIVE', tab.value)
      router.push({
        name: tab.name,
        query: tab.query,
        params: tab.params
      })
    },
    delTab({ commit, dispatch, state }, arg: ITabDelParam) {
      let index = 0
      for (let i = 0; i < state.tabsList.length; i++) {
        const tab = state.tabsList[i]
        if (tab.value === arg.value) {
          index = i
          break
        }
      }
      const tab: ITab = state.tabsList[index - 1]
      switch (arg.type) {
        case 'current':
          commit('DEL_TAB_BY_INDEX', index, 1)
          dispatch('setTabsActive', tab.value)
          router.push({
            name: tab.name,
            query: tab.query,
            params: tab.params
          })
          break
        case 'left':
          commit('DEL_TAB_BY_INDEX', 0, index)
          break
        case 'right':
          commit('DEL_TAB_BY_INDEX', index, state.tabsList.length - 1 - index)
          break
        case 'other':
          commit('SET_TABS_LIST', [state.tabsList[index]])
          break
      }
    }
  }
}
