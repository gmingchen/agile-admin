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
     * 2：大小100%，在导航固定的情况下生效
     * 3：
     */
    contanierMode: 1
  },
  getters: {
  },
  mutations: {
    SET_NAVIGATION_MODE: (state, navigationMode) => {
      state.navigationMode = navigationMode
    },
    SET_CONTANIER_MODE: (state, contanierMode) => {
      state.contanierMode = contanierMode
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
    }
  }
}
