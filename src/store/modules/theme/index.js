/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-02 18:59:43
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-18 09:16:20
 */
import { getTheme, setTheme, clearTheme, getThemeMode, setThemeMode, clearThemeMode } from '@/utils/storage'
import { ThemeMode } from '@/utils/dictionary'
import { lighten, darken } from '@/utils'

const defaultTheme = {
  color: {
    primary: '',
    success: '',
    warning: '',
    danger: '',
    error: '',
    info: ''
  },
  text: {
    primary: '',
    regular: '',
    secondary: '',
    placeholder: '',
    disabled: ''
  },
  menu: {
    backgroundColor: '',
    textColor: '',
    activeTextColor: ''
  }
}

/**
 * 主题颜色设置处理
 * @param {*} theme 主题
 */
const setThemeHandle = (theme) => {
  const el = document.documentElement
  for (const key in defaultTheme.color) {
    el.style.setProperty(`--el-color-${ key }`, theme.color[key])
    for (let i = 1; i <= 9; i++) {
      el.style.setProperty(`--el-color-${ key }-light-${ i }`, lighten(theme.color[key], i / 10))
      el.style.setProperty(`--el-color-${ key }-dark-${ i }`, darken(theme.color[key], i / 10))
    }
  }
  // for (const key in defaultTheme.text) {
  //   el.style.setProperty(`--el-text-color-${ key }`, theme.text[key])
  // }
  if (theme.menu.backgroundColor !== '#fff') {
    el.style.setProperty(`--gl-sidebar-background-color`, theme.menu.backgroundColor)
  }
}

export default {
  state: {
    reload: false,
    mode: ThemeMode.LIGHT,
    theme: defaultTheme
  },
  getters: {
  },
  mutations: {
    SET_RELOAD: (state, reload) => {
      state.reload = reload
    },
    SET_THEME: (state, theme) => {
      state.theme = theme
    },
    SET_MODE: (state, mode) => {
      state.mode = mode
    }
  },
  actions: {
    /**
     * 重新加载组件
     * @returns
     */
    setReload({ commit }, reload) {
      commit('SET_RELOAD', reload)
    },
    /**
     * 获取当前主题
     * @returns
     */
    getTheme({ commit, dispatch }) {
      const theme = getTheme()
      const result = {
        color: {},
        text: {},
        menu: {}
      }
      if (theme) {
        Object.assign(result, defaultTheme, theme)
        setThemeHandle(result)
      } else {
        const el = document.querySelector(':root')
        for (const key in defaultTheme.color) {
          result.color[key] = getComputedStyle(el).getPropertyValue(`--el-color-${ key }`)
        }
        result.menu.backgroundColor = getComputedStyle(el).getPropertyValue(`--gl-sidebar-background-color`)
      }
      commit('SET_THEME', result)
      dispatch('setMode', getThemeMode() || ThemeMode.LIGHT)
    },
    /**
     * 设置当前主题
     * @returns
     */
    setTheme({ commit, state }, theme) {
      commit('SET_THEME', theme)
      setTheme(state.theme)
      setThemeHandle(state.theme)
    },
    /**
     * 设置主题模式
     * @returns
     */
    setMode({ commit }, mode) {
      mode === ThemeMode.DARK ? document.documentElement.classList.add(ThemeMode.DARK) : document.documentElement.classList.remove(ThemeMode.DARK)
      commit('SET_MODE', mode)
      setThemeMode(mode)
    },
    /**
     * 清除主题 主题模式
     * @param {*}
     */
    clear({ commit }) {
      clearThemeMode()
      clearTheme()
    }
  }
}
