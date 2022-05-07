/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-02 18:59:43
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-18 09:16:20
 */
export default {
  state: {
    /**
     * 导航模式
     * 1：固定导航
     * 2：不固定导航
     */
    navigationMode: 1,
    /**
     * 主内容容器布局
     * 1：大小随内容变化
     * 2：大小100%, 在容器组件默认插槽内滚动
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
     * 是否全屏
     */
    fullScreen: false,
    /**
     * 用于主内容部分刷新
     */
    refresh: false
  },
  getters: {
  },
  mutations: {
    SET_NAVIGATION_MODE: (state, navigationMode) => {
      state.navigationMode = navigationMode
    },
    SET_CONTANIER_MODE: (state, contanierMode) => {
      state.contanierMode = contanierMode
    },
    SET_FULL_SCREEN: (state, fullScreen) => {
      state.fullScreen = fullScreen
    },
    SET_REFRESH: (state, refresh) => {
      state.refresh = refresh
    }
  },
  actions: {
    /**
     * 设置导航模式
     * @returns
     */
    setNavigationMode({ commit }, navigationMode) {
      commit('SET_NAVIGATION_MODE', navigationMode)
    },
    /**
     * 设置主内容容器布局
     * @returns
     */
    setContanierMode({ commit }, contanierMode) {
      commit('SET_CONTANIER_MODE', contanierMode)
    },
    /**
     * 设置是否全屏
     * @returns
     */
    setFullScreen({ commit }, fullScreen) {
      commit('SET_FULL_SCREEN', fullScreen)
    },
    /**
     * 设置刷新
     * @returns
     */
    setRefresh({ commit }, refresh) {
      commit('SET_REFRESH', refresh)
    }
  }
}
