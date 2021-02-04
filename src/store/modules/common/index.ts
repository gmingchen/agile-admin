/*
 * @Description: 布局设置
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-16 14:50:54
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-03 14:19:16
 */
import { ICommon } from './index.type'

export default {
  namespaced: true,
  state: {
    // 页面文档可视高度(随窗口改变大小)
    documentClientHeight: 0,
    // 侧边栏宽度
    sidebarWidth: 60,
    // 顶部导航高度
    navbarHeight: 50,
    // 标签栏高度
    tabsHeight: 40,
    // 侧边栏是否打开
    sidebarOpend: true,
    // 是否全屏
    isFillScreen: false
  },
  getters: {
    documentClientHeight: (state: ICommon): number => state.documentClientHeight,
    sidebarWidth: (state: ICommon): number => state.sidebarWidth,
    navbarHeight: (state: ICommon): number => state.navbarHeight,
    tabsHeight: (state: ICommon): number => state.tabsHeight,
    sidebarOpend: (state: ICommon): boolean => state.sidebarOpend,
    isFillScreen: (state: ICommon): boolean => state.isFillScreen
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
    SET_SIDEBAR_OPEND: (state: ICommon, sidebarOpend: boolean): void => {
      state.sidebarOpend = sidebarOpend
    },
    SET_IS_FULL_SCREEN: (state: ICommon, isFillScreen: boolean): void => {
      state.isFillScreen = isFillScreen
    }
  },
  actions: {
    setDocunentClientHeight({ commit }, documentClientHeight: number): void {
      commit('SET_DOCUMENT_CLIENT_HEIGHT', documentClientHeight)
    },
    setSidebarOpend({ commit }, sidebarOpend: boolean): void {
      commit('SET_SIDEBAR_OPEND', sidebarOpend)
    },
    setScreenFull({ commit }, isFillScreen: boolean): void {
      commit('SET_IS_FULL_SCREEN', isFillScreen)
    }
  }
}
