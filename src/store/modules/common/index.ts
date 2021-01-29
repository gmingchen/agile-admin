/*
 * @Description: 布局设置
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-16 14:50:54
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-01-29 22:03:09
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
    navbarHeight: 60,
    // 标签栏高度
    tabsHeight: 60,
    // 侧边栏是否打开
    sidebarOpend: true
  },
  getters: {
    documentClientHeight: (state: ICommon): number => state.documentClientHeight,
    sidebarWidth: (state: ICommon): number => state.sidebarWidth,
    navbarHeight: (state: ICommon): number => state.navbarHeight,
    tabsHeight: (state: ICommon): number => state.tabsHeight,
    sidebarOpend: (state: ICommon): boolean => state.sidebarOpend
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
    }
  },
  actions: {
    setDocunentClientHeight({ commit }, documentClientHeight: number): void {
      commit('SET_DOCUMENT_CLIENT_HEIGHT', documentClientHeight)
    },
    setSidebarOpend({ commit }, sidebarOpend: boolean): void {
      commit('SET_SIDEBAR_OPEND', sidebarOpend)
    }
  }
}
