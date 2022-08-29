import { defineStore } from 'pinia'

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

export const useThemeStore = defineStore('theme', {
  state: () => ({
    reload: false,
    mode: ThemeMode.LIGHT,
    theme: defaultTheme
  }),
  getters: {},
  actions: {
    /**
     * 获取当前主题
     */
    getTheme() {
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
      this.theme = result
      this.setMode(getThemeMode() || ThemeMode.LIGHT)
    },
    /**
     * 设置当前主题
     * @param {*} theme
     */
    setTheme(theme) {
      this.theme = theme
      setTheme(this.theme)
      setThemeHandle(this.theme)
    },
    /**
     * 设置主题模式
     * @param {*} mode
     */
    setMode(mode) {
      mode === ThemeMode.DARK ? document.documentElement.classList.add(ThemeMode.DARK) : document.documentElement.classList.remove(ThemeMode.DARK)
      this.mode = mode
      setThemeMode(mode)
    },
    /**
     * 清除主题 主题模式
     */
    clear() {
      clearThemeMode()
      clearTheme()
    }
  }
})
