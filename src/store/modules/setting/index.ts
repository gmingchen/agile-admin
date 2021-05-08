/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-06 13:58:51
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-08 16:19:29
 */
import { ActionContext } from 'vuex'
import { clear, exit, getLanguage, setLanguage } from '@/utils/storage'
import { LanguageType } from 'Type/index'

export interface Document {
  clientHeight: number
}
export interface Sidebar {
  width: number
  openWidth: number
  foldWidth: number
}
export interface Navbar {
  headHeight: number
  tabsHeight: number
  fixed: boolean
  tabsDisplay: boolean
}
export interface Set {
  language: string
  fullScreen: boolean
  refresh: boolean
}
export interface State {
  document: Document
  sidebar: Sidebar
  navbar: Navbar
  set: Set
}

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
      language: getLanguage() || LanguageType.Chinese, // 语言 默认中文
      fullScreen: false, // 是否全屏
      refresh: false // 用于组件刷新
    }
  },
  getters: {
    language: (state: State): string => {
      return state.set.language
    }
  },
  mutations: {
    SET_DOCUMENT_CLIENT_HEIGHT: (state: State, clientHeight: number): void => {
      state.document.clientHeight = clientHeight
    },
    SET_SIDEBAR_WIDTH: (state: State, width: number): void => {
      state.sidebar.width = width
    },
    SET_LANGUAGE: (state: State, language: string): void => {
      state.set.language = language
    },
    SET_FULL_SCREEN: (state: State, fullScreen: boolean): void => {
      state.set.fullScreen = fullScreen
    },
    SET_REFRESH: (state: State, refresh: boolean): void => {
      state.set.refresh = refresh
    }
  },
  actions: {
    setDocunentClientHeight({ commit }: ActionContext<State, null>, clientHeight: number): void {
      commit('SET_DOCUMENT_CLIENT_HEIGHT', clientHeight)
    },
    setSidebarWidth({ commit, state }: ActionContext<State, null>, isCollapse: boolean = false): void {
      if (isCollapse) {
        commit('SET_SIDEBAR_WIDTH', state.sidebar.foldWidth)
      } else {
        commit('SET_SIDEBAR_WIDTH', state.sidebar.openWidth)
      }
    },
    setLanguage({ commit }: ActionContext<State, null>, language: string): void {
      setLanguage(language)
      commit('SET_LANGUAGE', language)
    },
    setFullScreen({ commit }: ActionContext<State, null>, fullScreen: boolean = false): void {
      commit('SET_FULL_SCREEN', fullScreen)
    },
    setRefresh({ commit }: ActionContext<State, null>, refresh: boolean = false): void {
      commit('SET_REFRESH', refresh)
    },
    clearStore({ dispatch }: ActionContext<State, null>, type: boolean = false): void {
      dispatch('user/clear', { type: type }, { root: true })
      dispatch('menu/clear', {}, { root: true })
    },
    clear({ dispatch }: ActionContext<State, null>): void {
      clear()
      dispatch('clearStore', false)
      window.location.reload()
    },
    exit({ dispatch }: ActionContext<State, null>): void {
      exit()
      dispatch('clearStore', true)
    }
  }
}
