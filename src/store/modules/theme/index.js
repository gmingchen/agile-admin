/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-02 18:59:43
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-18 09:16:20
 */
import { getTheme, setTheme, getThemeMode, setThemeMode } from '@/utils/storage'
import { ThemeMode } from '@/utils/dictionary'

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
      } else {
        const el = document.querySelector(':root')
        for (const key in defaultTheme.color) {
          result.color[key] = getComputedStyle(el).getPropertyValue(`--el-color-${ key }`)
        }
        for (const key in defaultTheme.text) {
          result.text[key] = getComputedStyle(el).getPropertyValue(`--el-text-color-${ key }`)
        }
        result.menu.backgroundColor = getComputedStyle(el).getPropertyValue(`--gl-sidebar-background-color`)
        // result.menu.textColor = getComputedStyle(el).getPropertyValue(`--el-text-color-primary`)
        result.menu.activeTextColor = getComputedStyle(el).getPropertyValue(`--el-color-primary`)
      }
      commit('SET_THEME', result)
      const mode = getThemeMode() || ThemeMode.LIGHT
      dispatch('setMode', mode)
    },
    /**
     * 设置当前主题
     * @returns
     */
    setTheme({ state }, theme) {
      const el = document.documentElement
      for (const key in defaultTheme.color) {
        el.style.setProperty(`--el-color-${ key }`, theme.color[key])
      }
      for (const key in defaultTheme.text) {
        el.style.setProperty(`--el-text-color-${ key }`, theme.text[key])
      }
      el.style.setProperty(`--gl-sidebar-background-color`, theme.menu.backgroundColor)
      setTheme(state.theme)
    },
    /**
     * 设置主题模式
     * @returns
     */
    setMode({ commit }, mode) {
      mode === ThemeMode.DARK ? document.documentElement.classList.add(ThemeMode.DARK) : document.documentElement.classList.remove(ThemeMode.DARK)
      commit('SET_MODE', mode)
      setThemeMode(mode)
    }
  }
}
