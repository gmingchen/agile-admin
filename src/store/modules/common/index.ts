import { ICommon } from './index.type'

export default {
  state: {
    // 页面文档可视高度(随窗口改变大小)
    documentClientHeight: 0,
    // 顶部导航高度
    navigationHeight: 60,
    // 标签栏高度
    tabBarHeight: 60
  },
  getters: {
    documentClientHeight: (state: ICommon) => state.documentClientHeight,
    navigationHeight: (state: ICommon) => state.navigationHeight,
    tabBarHeight: (state: ICommon) => state.tabBarHeight
  },
  mutations: {
  },
  actions: {
  }
}
