import { defineStore } from 'pinia'

import { getLayout, setLayout, clearLayout } from '@/utils/storage'

/**
 * 存储layout处理
 * @param {*} store
 */
const setLayoutHandle = (store) => {
  setLayout({
    navigationMode: store.navigationMode,
    contanierMode: store.contanierMode,
    panelMode: store.panelMode,
    showTabs: store.showTabs
  })
}

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    /**
     * 导航模式
     * 1：固定导航
     * 2：不固定导航
     */
    navigationMode: 1,
    /**
      * 主内容容器布局
      * 1：大小随内容变化
      * 2：大小100%, 在容器组件默认插槽内滚动 // todo: 只有导航模式固定的情况下生效
      */
    contanierMode: 2,
    /**
      * 面板模式
      * 1: 头部 主要内容 脚部 左侧 分离
      * 2: 左右面板分离
      * 3: 整个容器为面板
      */
    panelMode: 1,
    /**
      * 是否显示标签页
      */
    showTabs: true,
    /**
      * 是否全屏
      */
    fullScreen: false,
    /**
      * 用于主内容部分刷新
      */
    refresh: false
  }),
  getters: {},
  actions: {
    /**
     * 获取布局
     */
    getLayout() {
      const layout = getLayout()
      if (layout) {
        const { navigationMode, contanierMode, panelMode, showTabs } = layout
        this.navigationMode = navigationMode || 1
        this.contanierMode = contanierMode || 2
        this.panelMode = panelMode || 1
        // eslint-disable-next-line no-undefined
        this.showTabs = showTabs !== undefined ? showTabs : true
      }
    },
    /**
     * 设置导航模式
     * @param {*} navigationMode
     */
    setNavigationMode(navigationMode) {
      this.navigationMode = navigationMode
      setLayoutHandle(this)
    },
    /**
     * 设置主内容容器布局
     * @param {*} contanierMode
     */
    setContanierMode(contanierMode) {
      this.contanierMode = contanierMode
      setLayoutHandle(this)
    },
    /**
     * 设置面板模式
     * @param {*} panelMode
     */
    setPanelMode(panelMode) {
      this.panelMode = panelMode
      setLayoutHandle(this)
    },
    /**
     * 是否显示标签页
     * @param {*} show
     */
    setShowTabs(show) {
      this.showTabs = show
      setLayoutHandle(this)
    },
    /**
     * 清除布局模式
     */
    clear() {
      clearLayout()
    }
  }
})
