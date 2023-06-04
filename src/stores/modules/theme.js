import { ThemeMode } from '@/utils/enum'
import { lighten, darken } from '@/utils'
import { getTheme, setTheme, clearTheme } from '@/utils/storage'

// 默认布局
const defaultLayout = {
  /**
   * 侧边菜单栏模式 1：传统模式 2：分栏模式
   */
  sidebarMode: 1,
  /**
  * 导航模式 1：固定导航 2：不固定导航
  */
  navigationMode: 1,
  /**
   * 主内容容器布局 1：大小随内容变化 2：大小100%, 在容器组件默认插槽内滚动 // todo: 只有导航模式固定的情况下生效
   */
  contanierMode: 2,
  /**
   * 面板模式 1: 头部 主要内容 脚部 左侧 分离 2: 左右面板分离 3: 整个容器为面板
   */
  panelMode: 1,
  /**
   * 是否显示标签页
   */
  showTabs: true
}

// 默认颜色
const defaultColor = {
  /**
   * 主要颜色
   */
  main: {
    primary: '',
    success: '',
    warning: '',
    danger: '',
    error: '',
    info: ''
  },
  /**
   * 字体颜色
   */
  text: {
    primary: '',
    regular: '',
    secondary: '',
    placeholder: '',
    disabled: ''
  },
  /**
   * 菜单颜色
   */
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
const setColorHandle = (color) => {
  const el = document.documentElement
  for (const key in defaultColor.main) {
    el.style.setProperty(`--el-color-${ key }`, color.main[key])
    for (let i = 1; i <= 9; i++) {
      el.style.setProperty(`--el-color-${ key }-light-${ i }`, lighten(color.main[key], i / 10))
      el.style.setProperty(`--el-color-${ key }-dark-${ i }`, darken(color.main[key], i / 10))
    }
  }
  // for (const key in defaultTheme.text) {
  //   el.style.setProperty(`--el-text-color-${ key }`, theme.text[key])
  // }
  if (color.menu.backgroundColor !== '#fff') {
    el.style.setProperty(`--gl-sidebar-background-color`, color.menu.backgroundColor)
  }
}
/**
 * 主题模式处理
 * @param {*} mode
 */
const modeHandle = (mode) => {
  mode === ThemeMode.DARK ? document.documentElement.classList.add(ThemeMode.DARK) : document.documentElement.classList.remove(ThemeMode.DARK)
}

export const useThemeStore = defineStore('theme', {
  state: () => ({
    // 用于主内容部分刷新
    refresh: false,
    // 用户主题刷新
    reload: false,
    mode: ThemeMode.LIGHT,
    layout: defaultLayout,
    color: defaultColor
  }),
  actions: {
    /**
     * 获取当前主题
     */
    getTheme() {
      const theme = getTheme()
      if (theme) {
        const { mode, layout, color } = theme
        setColorHandle(color)
        this.mode = mode
        this.layout = layout
        this.color = color
      } else {
        const el = document.querySelector(':root')
        const color = {}
        Object.assign(color, defaultColor)
        for (const key in defaultColor.main) {
          color.main[key] = getComputedStyle(el).getPropertyValue(`--el-color-${ key }`)
        }
        // todo: 如果指定了颜色 主题模式切换颜色将不会改变
        // color.menu.backgroundColor = getComputedStyle(el).getPropertyValue(`--gl-sidebar-background-color`)
        // color.menu.textColor = getComputedStyle(el).getPropertyValue(`--el-menu-text-color`)
        color.menu.activeTextColor = getComputedStyle(el).getPropertyValue(`--el-menu-active-color`)
        this.color = color
      }
      modeHandle(this.mode)
    },
    /**
     * 设置主题
     */
    setTheme(theme) {
      if (!theme) {
        const { mode, layout, color } = this
        theme = { mode, layout, color }
      }
      modeHandle(theme.mode)
      setColorHandle(theme.color)
      setTheme(theme)
    },
    /**
     * 清除数据
     */
    clear() {
      clearTheme()
      this.mode = ThemeMode.LIGHT
      this.layout = defaultLayout
      this.color = defaultColor
    }
  }
})
