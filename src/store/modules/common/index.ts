/*
 * @Description: 布局设置
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-16 14:50:54
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-03-02 17:01:40
 */
import { ICommon } from './index.type'

export default {
  namespaced: true,
  state: {
    // 页面文档可视高度(随窗口改变大小)
    documentClientHeight: 0,
    // 侧边栏宽度
    sidebarWidth: 200,
    // 侧边栏展开宽度
    sidebarOpenWidth: 200,
    // 侧边栏折叠宽度
    sidebarFoldWidth: 64,
    // 顶部导航高度
    navbarHeight: 50,
    // 标签栏高度
    tabsHeight: 40,
    // 标签栏是否显示
    tabsDisplay: true,
    // 侧边栏是否打开
    sidebarOpend: true,
    // 页头是否固定
    headerFixed: true,
    // 是否全屏
    isFillScreen: false,
    // 是否需要刷新
    contentRefresh: false,
  },
  getters: {
    documentClientHeight: (state: ICommon): number => state.documentClientHeight,
    sidebarWidth: (state: ICommon): number => state.sidebarWidth,
    navbarHeight: (state: ICommon): number => state.navbarHeight,
    tabsHeight: (state: ICommon): number => state.tabsHeight,
    tabsDisplay: (state: ICommon): boolean => state.tabsDisplay,
    sidebarOpend: (state: ICommon): boolean => state.sidebarOpend,
    headerFixed: (state: ICommon): boolean => state.headerFixed,
    isFillScreen: (state: ICommon): boolean => state.isFillScreen,
    contentRefresh: (state: ICommon): boolean => state.contentRefresh,
  },
  mutations: {
    SET_DOCUMENT_CLIENT_HEIGHT: (state: ICommon, documentClientHeight: number): void => {
      state.documentClientHeight = documentClientHeight
    },
    SET_SIDEBAR_WIDTH: (state: ICommon, sidebarWidth: number): void => {
      state.sidebarWidth = sidebarWidth
    },
    SET_NAVBAR_HEIGHT: (state: ICommon, navbarHeight: number): void => {
      state.navbarHeight = navbarHeight
    },
    SET_TABS_HEIGHT: (state: ICommon, tabsHeight: number): void => {
      state.tabsHeight = tabsHeight
    },
    SET_TAVS_DISPLAY: (state: ICommon, tabsDisplay: boolean): void => {
      state.tabsDisplay = tabsDisplay
    },
    SET_SIDEBAR_OPEND: (state: ICommon, sidebarOpend: boolean): void => {
      state.sidebarOpend = sidebarOpend
    },
    SET_HEADER_FIXED: (state: ICommon, headerFixed: boolean): void => {
      state.headerFixed = headerFixed
    },
    SET_IS_FULL_SCREEN: (state: ICommon, isFillScreen: boolean): void => {
      state.isFillScreen = isFillScreen
    },
    SET_CONTENT_REFRESH: (state: ICommon, contentRefresh: boolean): void => {
      state.contentRefresh = contentRefresh
    }
  },
  actions: {
    setDocunentClientHeight({ commit }, documentClientHeight: number): void {
      commit('SET_DOCUMENT_CLIENT_HEIGHT', documentClientHeight)
    },
    setSidebarWidth({ commit }, sidebarWidth: number): void {
      commit('SET_SIDEBAR_WIDTH', sidebarWidth)
    },
    setTabsDisplay({ commit }, tabsDisplay: boolean): void {
      commit('SET_TAVS_DISPLAY', tabsDisplay)
    },
    setSidebarOpend({ commit, state }, sidebarOpend: boolean): void {
      commit('SET_SIDEBAR_OPEND', sidebarOpend)
      let width: number
      if (sidebarOpend) {
        width = state.sidebarOpenWidth
      } else {
        width = state.sidebarFoldWidth
      }
      commit('SET_SIDEBAR_WIDTH', width)
    },
    setHeaderFixed({ commit }, headerFixed: boolean): void {
      commit('SET_HEADER_FIXED', headerFixed)
    },
    setScreenFull({ commit }, isFillScreen: boolean): void {
      commit('SET_IS_FULL_SCREEN', isFillScreen)
    },
    setContentRefresh({ commit }, contentRefresh: boolean): void {
      commit('SET_CONTENT_REFRESH', contentRefresh)
    }
  }
}
