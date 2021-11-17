/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-06 13:58:51
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-08 16:19:29
 */
import { clear, exit } from '@/utils/storage'

export default {
  state: {
    navbar: {
      headHeight: 50, // 导航头部高度
      tabsHeight: 50, // 标签栏高度
      fixed: true, // 是否固定
      tabsDisplay: true // 标签栏是否显示
    },
    set: {
      fullScreen: false, // 是否全屏
      refresh: false // 用于组件刷新
    }
  },
  getters: {
  },
  mutations: {
    SET_FIXED: (state, fixed) => {
      state.navbar.fixed = fixed
    },
    SET_TABS_DISPLAY: (state, tabsDisplay) => {
      state.navbar.tabsDisplay = tabsDisplay
    },
    SET_FULL_SCREEN: (state, fullScreen) => {
      state.set.fullScreen = fullScreen
    },
    SET_REFRESH: (state, refresh) => {
      state.set.refresh = refresh
    }
  },
  actions: {
    setFixed({ commit }, fixed) {
      commit('SET_FIXED', fixed)
    },
    setTabsDisplay({ commit }, tabsDisplay) {
      commit('SET_TABS_DISPLAY', tabsDisplay)
    },
    setFullScreen({ commit }, fullScreen) {
      commit('SET_FULL_SCREEN', fullScreen)
    },
    setRefresh({ commit }, refresh = false) {
      commit('SET_REFRESH', refresh)
    },
    clearStore({ dispatch }, type = false) {
      dispatch('user/clear', { type: type }, { root: true })
      dispatch('menu/clear', {}, { root: true })
    },
    clear({ dispatch }) {
      clear()
      dispatch('clearStore', false)
      window.location.reload()
    },
    exit({ dispatch }) {
      exit()
      dispatch('clearStore', true)
    }
  }
}
