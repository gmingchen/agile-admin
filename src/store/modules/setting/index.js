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
    document: {
      clientHeight: 0 // 页面文档可视高度(随窗口改变大小)
    },
    sidebar: {
      width: 200, // 侧边栏宽度 // todo: 需要与sidebar 组件css 样式保持一致
      openWidth: 200, // 侧边栏展开宽度 // todo: 需要与sidebar 组件css 样式保持一致
      foldWidth: 64 // 侧边栏折叠宽度 // todo: 这个为 element menu 组件 默认折叠宽度
    },
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
    SET_DOCUMENT_CLIENT_HEIGHT: (state, clientHeight) => {
      state.document.clientHeight = clientHeight
    },
    SET_SIDEBAR_WIDTH: (state, width) => {
      state.sidebar.width = width
    },
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
    setDocunentClientHeight({ commit }, clientHeight) {
      commit('SET_DOCUMENT_CLIENT_HEIGHT', clientHeight)
    },
    setSidebarWidth({ commit, state }, isCollapse) {
      if (isCollapse) {
        commit('SET_SIDEBAR_WIDTH', state.sidebar.foldWidth)
      } else {
        commit('SET_SIDEBAR_WIDTH', state.sidebar.openWidth)
      }
    },
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
